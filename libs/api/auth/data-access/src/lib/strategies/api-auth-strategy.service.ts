import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, LogLevel, Prisma, UserRole, UserStatus } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiUserService } from '@pubkey-link/api-user-data-access'

import type { ApiAuthRequest } from '../interfaces/api-auth.request'

@Injectable()
export class ApiAuthStrategyService {
  private readonly logger = new Logger(ApiAuthStrategyService.name)
  constructor(readonly core: ApiCoreService, readonly user: ApiUserService) {}

  async validateRequest({
    req,
    providerId,
    provider,
    profile,
    accessToken,
    refreshToken,
  }: {
    providerId: string
    provider: IdentityProvider
    accessToken: string
    refreshToken: string
    profile: Prisma.InputJsonValue & { username?: string; name?: string; avatarUrl?: string }
    req: ApiAuthRequest
  }) {
    const canLink = this.core.config.appConfig.authLinkProviders.includes(provider)
    const canLogin = this.core.config.appConfig.authLoginProviders.includes(provider)

    // This provider is completely disabled
    if (!canLink && !canLogin) {
      throw new Error(`This ${provider} account cannot be used to login or link.`)
    }

    // This provider is only for linking
    if (!canLogin && !req.user?.id) {
      throw new Error(`This ${provider} account cannot be used to login.`)
    }

    // Here we figure out if we have a user with this identity
    const found = await this.core.findUserByIdentity({
      provider,
      providerId,
    })

    // If we have a user with this identity...
    if (found) {
      // ...and it's not the one making the request, we can't link
      if (found && req.user?.id && found.ownerId !== req.user?.id) {
        throw new Error(`This ${provider} account is already linked to another user.`)
      }

      // ...that's making the request, we update the profile and tokens on login
      if (found && canLogin) {
        await this.core.data.identity.update({
          where: { id: found.id },
          data: {
            accessToken,
            refreshToken,
            verified: true,
            profile,
            name: profile.username,
            syncEnded: new Date(),
            owner: {
              update: {
                lastLogin: new Date(),
                avatarUrl: profile.avatarUrl,
                name: profile.name,
              },
            },
          },
        })
        // We sync the profile username with the username in the users table
        if (profile.username && found.owner.username !== profile.username) {
          // Because this can theoretically be a duplicate username, we need to find a new one
          const newUsername = await this.core.findUsername(profile.username)
          // Update the username in the users table
          await this.core.data.user.update({
            where: { id: found.ownerId },
            data: { username: newUsername, lastLogin: new Date() },
          })
          await this.core.logInfo(`Updated username for ${found.owner.username} to ${newUsername}`, {
            identityProvider: provider,
            identityProviderId: providerId,
            userId: found.ownerId,
          })
        }
        return found.owner
      }
    }

    // Create a new identity
    const identity: Prisma.IdentityCreateWithoutOwnerInput = {
      name: profile?.username ?? providerId,
      provider,
      providerId,
      accessToken,
      refreshToken,
      verified: true,
      profile,
    }

    if (req.user?.id) {
      // Link the identity to the user making the request
      return await this.updateUserWithIdentity(req.user.id, identity)
    }

    // Create a new user with this identity
    return await this.createUserWithIdentity(identity)
  }

  async createUserWithIdentity(identity: Prisma.IdentityCreateWithoutOwnerInput) {
    const username = await this.core.findUsername(
      (identity.profile as { username: string }).username ?? identity.providerId,
    )
    const admin = this.core.config.isAdminId(identity.provider, identity.providerId)
    this.logger.verbose(
      `Creating user ${username} with identity ${identity.providerId} (${identity.provider}) (admin: ${admin})`,
    )

    const user = await this.user.data.create({
      avatarUrl: (identity.profile as { avatarUrl?: string })?.avatarUrl,
      developer: admin,
      role: admin ? UserRole.Admin : UserRole.User,
      status: UserStatus.Active,
      username,
      name: (identity.profile as { name?: string })?.name,
      identities: {
        create: {
          ...identity,
        },
      },
      lastLogin: new Date(),
      logs: {
        create: [
          {
            message: `Created user ${username} with ${identity.provider} identity`,
            level: LogLevel.Info,
            identityProvider: identity.provider,
            identityProviderId: identity.providerId,
          },
        ],
      },
    })
    this.logger.verbose(
      `Created user ${username} (${user.id}) with identity ${identity.providerId} (${identity.provider})`,
    )

    return user
  }

  async updateUserWithIdentity(userId: string, identity: Prisma.IdentityCreateWithoutOwnerInput) {
    const updated = await this.core.data.user.update({
      where: { id: userId },
      data: { identities: { create: { ...identity } } },
    })
    this.logger.verbose(
      `Updated user ${updated.username} (${updated.id}), added identity ${identity.providerId} (${identity.provider})`,
    )

    return updated
  }
}
