import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, UserRole, UserStatus } from '@prisma/client'
import { ApiAuthService } from '@pubkey-link/api-auth-data-access'
import { ApiCoreService, BaseContext, ellipsify, getRequestDetails, slugifyId } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { ApiIdentitySolanaService } from './api-identity-solana.service'
import { RequestIdentityChallengeInput } from './dto/request-identity-challenge.input'
import { VerifyIdentityChallengeInput } from './dto/verify-identity-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiIdentityDataAnonService {
  private readonly logger = new Logger(ApiIdentityDataAnonService.name)
  constructor(
    private readonly auth: ApiAuthService,
    private readonly core: ApiCoreService,
    private readonly network: ApiNetworkService,
    private readonly solana: ApiIdentitySolanaService,
  ) {}

  async requestIdentityChallenge(ctx: BaseContext, { provider, providerId }: RequestIdentityChallengeInput) {
    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)

    // Check if we already have an identity for this provider
    const found = await this.solana.findIdentity(provider, providerId)

    // Get the IP and user agent from the request
    const { userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${userAgent}-${provider}-${providerId}-${Math.random()}`)

    const blockhash = await this.network.ensureBlockhash()

    // We found the identity so we are logging in
    if (found) {
      if (!this.core.config.authSolanaLoginEnabled) {
        throw new Error(`Solana login disabled`)
      }
      return this.core.data.identityChallenge.create({
        data: {
          blockhash,
          identity: { connect: { provider_providerId: { provider, providerId } } },
          userAgent,
          challenge: `Approve this message sign in as ${found.owner.username}. #REF-${challenge}`,
        },
      })
    }

    // We did not find the identity so we are registering
    if (!this.core.config.authSolanaRegisterEnabled) {
      throw new Error(`Solana register disabled`)
    }

    const admin = this.core.config.isAdminId(IdentityProvider.Solana, providerId)

    return this.core.data.identityChallenge
      .create({
        data: {
          blockhash,
          identity: {
            connectOrCreate: {
              where: { provider_providerId: { provider, providerId } },
              create: {
                name: providerId,
                provider,
                providerId,
                verified: false,
                owner: {
                  create: {
                    username: slugifyId(`${ellipsify(providerId)}-${provider}`),
                    private: this.core.config.featurePrivateProfiles,
                    role: admin ? UserRole.Admin : UserRole.User,
                    status: UserStatus.Active,
                    developer: admin,
                  },
                },
              },
            },
          },
          userAgent,
          challenge: `Approve this message sign up for a new account. #REF-${challenge}`,
        },
        include: { identity: { select: { ownerId: true } } },
      })
      .then(async (res) => {
        await this.core.logInfo(`Registered new user with ${provider} ${providerId}`, {
          userId: res.identity.ownerId,
          identityProvider: provider,
          identityProviderId: providerId,
        })
        return res
      })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    { provider, providerId, challenge, message, signature }: VerifyIdentityChallengeInput,
  ) {
    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)

    // Ensure the signature is valid
    const { found, verified } = await this.solana.ensureValidSignature({
      challenge,
      ctx,
      message,
      provider,
      providerId,
      signature,
    })

    if (!found.identity.verified) {
      // Update the identity
      await this.core.data.identity.update({ where: { id: found.identity.id }, data: { verified: true } })
      this.logger.log(`Identity ${found.identity.id} verified`)
      await this.core.logInfo(`${found.identity.provider} Identity ${found.identity.providerId} verified`, {
        userId: found.identity.ownerId,
        identityProvider: found.identity.provider,
        identityProviderId: found.identity.providerId,
      })
    }

    // Update the identity
    const updated = await this.core.data.identityChallenge.update({
      where: {
        id: found.id,
      },
      data: {
        verified,
        signature,
      },
      include: { identity: { include: { owner: true } } },
    })

    if (updated.identity.owner.status === UserStatus.Created) {
      await this.core.data.user.update({
        where: { id: updated.identity.owner.id },
        data: { status: UserStatus.Active },
      })
      this.logger.log(`User ${updated.identity.owner.id} activated`)
      await this.core.logInfo(`User ${updated.identity.owner.username} activated`, {
        userId: updated.identity.owner.id,
        identityProvider: found.identity.provider,
        identityProviderId: found.identity.providerId,
      })
    }

    if (updated.verified) {
      this.logger.verbose(
        `Identity challenge ${updated.id} verified, signing in user ${updated.identity.owner.username} (${updated.identity.owner.id})`,
      )
      this.auth.signAndSetCookie(ctx, { username: updated.identity.owner.username, id: updated.identity.owner.id })
    }
    return updated
  }
}
