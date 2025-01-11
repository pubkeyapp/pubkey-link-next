import { Injectable, Logger } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider, UserRole } from '@prisma/client'
import { ApiCoreService, AppFeature, BaseContext, getRequestDetails } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { User } from '@pubkey-link/api-user-data-access'
import { createChallengeCli, verifySignature, verifySignatureCli } from '@pubkey-link/verify-wallet'
import { ApiIdentitySolanaService } from './api-identity-solana.service'
import { LinkIdentityInput } from './dto/link-identity-input'
import { RequestIdentityChallengeInput } from './dto/request-identity-challenge.input'
import { UserAddIdentityGrantInput } from './dto/user-add-identity-grant-input'
import { UserFindManyIdentityInput } from './dto/user-find-many-identity-input'
import { UserRemoveIdentityGrantInput } from './dto/user-remove-identity-grant-input'
import { UserUpdateIdentityInput } from './dto/user-update-identity.input'
import { VerifyIdentityChallengeInput } from './dto/verify-identity-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiIdentityDataUserService {
  private readonly logger = new Logger(ApiIdentityDataUserService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly solana: ApiIdentitySolanaService,
    private readonly network: ApiNetworkService,
    private readonly networkAsset: ApiNetworkAssetService,
  ) {}

  async deleteIdentity(userId: string, identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findFirst({
      where: { id: identityId, ownerId: userId },
      include: { owner: { include: { identities: true } } },
    })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (found.provider === IdentityProvider.Discord) {
      throw new Error(`Cannot delete Discord identity`)
    }
    if (found.owner.identities.length === 1) {
      throw new Error(`Cannot delete last identity`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async refreshIdentity(userId: string, identityId: string) {
    const identity = await this.core.data.identity.findFirst({
      where: { id: identityId, ownerId: userId },
    })
    if (!identity) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (identity.provider !== IdentityProvider.Solana) {
      throw new Error(`Identity ${identityId} not supported`)
    }
    return this.networkAsset.sync.sync({ cluster: this.network.cluster.getDefaultCluster(), identity })
  }

  async findManyIdentity(actor: User, input: UserFindManyIdentityInput): Promise<PrismaIdentity[]> {
    if (actor.role !== UserRole.Admin && actor.username !== input.username) {
      const user = await this.core.data.user.findUnique({ where: { username: input.username } })
      if (!user) {
        throw new Error(`User ${input.username} not found`)
      }
      if (user.private) {
        return []
      }
    }

    const items = await this.core.data.identity.findMany({
      where: { owner: { username: input.username }, provider: input.provider ?? undefined },
      orderBy: [{ provider: 'asc' }, { name: 'asc' }],
      include: { grants: { include: { grantee: true } } },
    })

    return items ?? []
  }

  async requestIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId }: RequestIdentityChallengeInput,
  ) {
    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)

    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }

    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Get the IP and user agent from the request
    const { userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${userAgent}-${userId}-${provider}-${providerId}-${Math.random()}`)

    const blockhash = await this.network.ensureBlockhash()

    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        blockhash,
        identity: { connect: { provider_providerId: { provider, providerId } } },
        userAgent,
        challenge: `Approve this message to verify your wallet. #REF-${challenge}`,
      },
    })
  }

  async requestIdentityChallengeCli(userId: string, { provider, providerId }: RequestIdentityChallengeInput) {
    // Make sure this feature is enabled
    this.core.config.ensureFeature(AppFeature.IdentityCliVerification)

    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)

    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }

    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)

    // Generate a random challenge
    const challenge = createChallengeCli({
      message: `Approve this message to sign in ${Date.now()}`,
      publicKey: providerId,
    })

    console.log('challenge', challenge)
    const blockhash = await this.network.ensureBlockhash()

    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        blockhash,
        identity: {
          connectOrCreate: {
            where: { provider_providerId: { provider, providerId } },
            create: { name: providerId, provider, providerId, verified: false, ownerId: userId },
          },
        },
        userAgent: 'offline',
        challenge,
      },
    })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId, challenge, message, signature }: VerifyIdentityChallengeInput,
  ) {
    const found = await this.ensureValidIdentityChallenge({ challenge, provider, providerId, userId })

    const { userAgent } = getRequestDetails(ctx)

    if (found.userAgent !== userAgent) {
      throw new Error(`Identity challenge not found.`)
    }

    const verified = verifySignature({
      message,
      publicKey: found.identity.providerId,
      signature,
    })

    if (!verified) {
      throw new Error(`Identity challenge verification failed.`)
    }

    if (!found.identity.verified) {
      // Update the identity
      await this.verifyIdentity({ id: found.identity.id })
    }

    // Update the identity
    const updated = await this.updateIdentityChallenge({ id: found.id, verified, signature })
    await this.networkAsset.sync.sync({ cluster: this.network.cluster.getDefaultCluster(), identity: found.identity })
    return updated
  }

  async verifyIdentityChallengeCli(
    userId: string,
    { provider, providerId, challenge, signature }: VerifyIdentityChallengeInput,
  ) {
    const found = await this.ensureValidIdentityChallenge({ challenge, provider, providerId, userId })

    console.log({
      challenge,
      publicKey: found.identity.providerId,
      signature,
    })

    const verified = verifySignatureCli({
      challenge,
      publicKey: found.identity.providerId,
      signature,
    })

    if (!verified) {
      throw new Error(`Identity challenge verification failed.`)
    }

    if (!found.identity.verified) {
      // Update the identity
      await this.verifyIdentity({ id: found.identity.id })
    }

    // Update the identity
    const updated = await this.updateIdentityChallenge({ id: found.id, verified, signature })
    await this.networkAsset.sync.sync({ cluster: this.network.cluster.getDefaultCluster(), identity: found.identity })
    return updated
  }

  async linkIdentity(userId: string, { name, provider, providerId }: LinkIdentityInput) {
    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }

    // Make sure the identity does not exist
    const found = await this.findOneIdentity(provider, providerId)
    if (found) {
      throw new Error(`Identity ${provider} ${providerId} already linked`)
    }

    console.log('provider', provider)

    // Handle provider-specific validation
    switch (provider) {
      case IdentityProvider.Solana:
        this.solana.ensureAllowedProvider(provider)
        this.solana.ensureValidProviderId(provider, providerId)
        break
      case IdentityProvider.Discord: {
        const existing = await this.core.data.identity.findFirst({ where: { provider, ownerId: userId } })
        if (existing) {
          throw new Error(`Discord identity already linked`)
        }
        break
      }
      case IdentityProvider.Telegram:{
        const existing = await this.core.data.identity.findFirst({ where: { provider, ownerId: userId } })
        if (existing) {
          throw new Error(`Telegram identity already linked`)
        }
        break
      }
      default:
        throw new Error(`Provider ${provider} not supported`)
    }

    console.log('--------------------------------Data--------------------------------')
    console.log('name', name)
    console.log('providerId', providerId)
    console.log('userId', userId)
    console.log('provider', provider)
    console.log('providerId', providerId)

    // Create the identity
    return this.core.data.identity.create({
      data: {
        name: name ?? providerId,
        ownerId: userId,
        provider,
        providerId,
      },
    })
  }

  findOneIdentity(provider: IdentityProvider, providerId: string) {
    return this.core.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async updateIdentity(userId: string, identityId: string, input: UserUpdateIdentityInput) {
    const found = await this.core.data.identity.findFirst({ where: { id: identityId, ownerId: userId } })

    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }

    return this.core.data.identity.update({
      where: { id: identityId },
      data: { name: input.name?.length ? input.name : (found.profile as { name?: string })?.name ?? found.providerId },
    })
  }

  async addIdentityGrant(ownerId: string, { provider, providerId, granteeId }: UserAddIdentityGrantInput) {
    this.core.config.ensureFeature(AppFeature.IdentityGrants)
    if (ownerId === granteeId) {
      throw new Error('Grantee cannot be the owner')
    }
    await this.core.ensureUserById(granteeId)
    const identity = await this.ensureIdentityOwner({ ownerId, provider, providerId })
    const found = identity.grants.find((m) => m.granteeId === granteeId)

    if (found) {
      throw new Error('User is already a grantee of this identity')
    }

    const added = await this.core.data.identityGrant.create({
      data: {
        provider,
        providerId,
        granteeId,
      },
    })

    return !!added
  }

  async removeIdentityGrant(ownerId: string, { provider, providerId, granteeId }: UserRemoveIdentityGrantInput) {
    this.core.config.ensureFeature(AppFeature.IdentityGrants)
    if (ownerId === granteeId) {
      throw new Error('Grantee cannot be the owner')
    }
    await this.core.ensureUserById(granteeId)
    const identity = await this.ensureIdentityOwner({ ownerId, provider, providerId })
    const found = identity.grants.find((m) => m.granteeId === granteeId)
    if (!found) {
      throw new Error('User is not a grantee of this identity')
    }
    const removed = await this.core.data.identityGrant.delete({
      where: { provider_providerId_granteeId: { provider, providerId, granteeId } },
    })
    return !!removed
  }

  private async ensureIdentityOwner({
    ownerId,
    provider,
    providerId,
  }: {
    ownerId: string
    provider: IdentityProvider
    providerId: string
  }) {
    const identity = await this.core.data.identity.findFirst({
      where: { provider, providerId, ownerId },
      include: { grants: true },
    })
    if (!identity) {
      throw new Error(`Identity ${provider} ${providerId} not found`)
    }
    return identity
  }

  private async ensureValidIdentityChallenge({
    challenge,
    provider,
    providerId,
    userId,
  }: {
    challenge: string
    provider: IdentityProvider
    providerId: string
    userId: string
  }) {
    // Make sure the provider is allowed
    this.solana.ensureAllowedProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the provider is enabled
    if (!this.core.config.appConfig.authLinkProviders.includes(provider)) {
      throw new Error(`Provider ${provider} not enabled for linking`)
    }
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Make sure we find the challenge
    return this.solana.ensureIdentityChallenge(provider, providerId, challenge)
  }

  private async updateIdentityChallenge({
    id,
    verified,
    signature,
  }: {
    id: string
    verified: boolean
    signature: string
  }) {
    return this.core.data.identityChallenge.update({ where: { id }, data: { verified, signature } })
  }

  private async verifyIdentity({ id }: { id: string }) {
    await this.core.data.identity.update({ where: { id }, data: { verified: true } })
    this.logger.log(`Identity ${id} verified`)
  }
}
