import { Injectable } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider, UserStatus } from '@prisma/client'
import { ApiBotService } from '@pubkey-link/api-bot-data-access'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { AdminCreateIdentityInput } from './dto/admin-create-identity.input'
import { AdminFindManyIdentityInput } from './dto/admin-find-many-identity.input'

@Injectable()
export class ApiIdentityDataAdminService {
  constructor(
    private readonly bot: ApiBotService,
    private readonly core: ApiCoreService,
    private readonly networkAsset: ApiNetworkAssetService,
  ) {}

  async createIdentity(input: AdminCreateIdentityInput): Promise<PrismaIdentity> {
    const found = await this.core.data.identity.findUnique({
      where: { provider_providerId: { providerId: input.providerId, provider: input.provider } },
    })
    if (found) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} already exists`)
    }
    if (input.provider === IdentityProvider.Discord) {
      throw new Error(`Cannot create Discord identity`)
    }
    const created = await this.core.data.identity.create({
      data: {
        name: input.providerId,
        ownerId: input.ownerId,
        providerId: input.providerId,
        provider: input.provider,
      },
    })
    if (!created) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} not created`)
    }
    return created
  }

  async deleteIdentity(identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findUnique({ where: { id: identityId } })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(input: AdminFindManyIdentityInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: {
        ownerId: input.ownerId ? input.ownerId : undefined,
        provider: input.provider ? input.provider : undefined,
      },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
      include: {
        challenges: { orderBy: { createdAt: 'desc' } },
        owner: !input.ownerId,
      },
    })
    return items ?? []
  }
  findUserByIdentity(provider: IdentityProvider, providerId: string) {
    return this.core.data.user.findFirst({
      where: {
        identities: {
          some: {
            provider,
            providerId,
          },
        },
        status: UserStatus.Active,
      },
      select: {
        avatarUrl: true,
        developer: true,
        id: true,
        name: true,
        role: true,
        username: true,
        status: true,
        identities: {
          orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
          select: { id: true, name: true, profile: true, provider: true, providerId: true },
        },
      },
    })
  }

  async syncIdentity(identityId: string) {
    console.log('syncIdentity', identityId)
    const identity = await this.core.data.identity.findUnique({ where: { id: identityId } })
    if (!identity) {
      throw new Error(`Identity ${identityId} not found`)
    }

    switch (identity.provider) {
      case IdentityProvider.Discord:
        return this.bot
          .syncDiscordIdentity({ providerId: identity.providerId })
          .then((res) => !!res)
          .catch((err) => {
            console.log('Error syncing identity', err)
            return false
          })
      case IdentityProvider.Solana:
        return this.networkAsset.sync
          .syncIdentity({ owner: identity.providerId })
          .then((res) => !!res)
          .catch((err) => {
            console.log('Error syncing identity', err)
            return false
          })
      default:
        throw new Error(`Identity provider ${identity.provider} not supported`)
    }
  }
}
