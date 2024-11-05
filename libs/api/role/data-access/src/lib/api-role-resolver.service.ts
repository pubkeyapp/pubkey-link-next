import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Cron, CronExpression } from '@nestjs/schedule'
import {
  Community,
  CommunityMember,
  IdentityProvider,
  NetworkAsset,
  NetworkCluster,
  NetworkToken,
  NetworkTokenType,
  Prisma,
  UserStatus,
} from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetService } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { RoleCondition } from './entity/role-condition.entity'
import { Role, RoleMap } from './entity/role.entity'

@Injectable()
export class ApiRoleResolverService {
  private readonly logger = new Logger(ApiRoleResolverService.name)
  constructor(
    readonly core: ApiCoreService,
    readonly network: ApiNetworkService,
    readonly networkAsset: ApiNetworkAssetService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  @OnEvent('communities.provisioned', { async: true })
  async syncAllCommunityRoles() {
    if (!this.core.config.syncCommunityRoles) {
      this.logger.warn(`[GLOBAL] Role validation is disabled (SYNC_COMMUNITY_ROLES!=true)`)
      return
    }
    const communities = await this.core.data.community.findMany({
      where: { enableSync: true },
    })
    if (!communities.filter((c) => c.enableSync).length) {
      this.logger.warn(`syncAllCommunityRoles: No communities found with enableSync=true`)
      return
    }
    this.logger.verbose(`Validating roles of ${communities.length} communities`)
    for (const community of communities) {
      await this.syncCommunityRoles(community.id)
    }
  }

  async syncCommunityRoles(communityId: string) {
    const community = await this.core.data.community.findUnique({ where: { id: communityId } })
    if (!community) {
      throw new Error(`Community not found`)
    }
    const startedAt = Date.now()

    const conditions = await this.getRoleConditions({ community })
    await this.syncCommunityMembers({ community, conditions })

    const [roleMap, users] = await Promise.all([
      this.getRoleMap({ community }),
      this.getRoleValidationUsers({ community }),
    ])

    const result = {
      duration: Date.now() - startedAt,
      userCounts: users?.length,
      totalRevoked: 0,
      totalGranted: 0,
    }

    if (!conditions?.length || !users?.length) {
      this.logger.debug(`syncCommunityRoles: No conditions or users found for community ${communityId}`)
      return result
    }
    this.logger.verbose(`Validating ${conditions.length} conditions for ${users.length} users`)

    const voteAccounts = await this.getVoteAccounts({ cluster: community.cluster, conditions })

    for (const user of users) {
      // We are now in the context of a user
      const resolved = await this.resolveNetworkAssetsForContext({ conditions, context: user })

      // Now we want to loop over each condition and check the assets
      for (const condition of conditions) {
        if (condition.token?.type === NetworkTokenType.Validator && voteAccounts.length) {
          if (voteAccounts.find((va) => resolved.solanaIds.includes(va))) {
            resolved.conditions.push(condition)
          }
        } else {
          const result = this.validateRoleCondition(condition, resolved.assetMap[condition.type] ?? [])
          if (result) {
            resolved.conditions.push(condition)
          }
        }
      }

      const roles: Role[] = (resolved.conditions.map((c) => c.role) ?? []) as Role[]
      const ensureRoles = await this.ensureCommunityMemberRoles({
        communityId,
        userId: resolved.userId,
        roles: roles ?? [],
        roleMap,
      })
      if (ensureRoles.granted || ensureRoles.revoked) {
        await this.core.logInfo(`Roles set: ${ensureRoles.granted} granted, ${ensureRoles.revoked} revoked`, {
          userId: resolved.userId,
          communityId,
          data: JSON.stringify({ roles, ensureRoles }, null, 2),
        })
      }
      result.totalGranted += ensureRoles.granted
      result.totalRevoked += ensureRoles.revoked
    }

    if (result.totalGranted || result.totalRevoked) {
      await this.core.logVerbose(
        `Validated ${conditions?.length} roles in ${result.duration}ms, ${result.totalGranted} granted, ${result.totalRevoked} revoked`,
        {
          communityId,
          data: result as unknown as Prisma.InputJsonValue,
        },
      )
    }
    return Promise.resolve(result)
  }

  async getVoteAccounts({ cluster, conditions }: { cluster: NetworkCluster; conditions: RoleCondition[] }) {
    const hasValidatorCondition: RoleCondition | undefined = conditions.find(
      (c) => c.type === NetworkTokenType.Validator,
    )
    if (!hasValidatorCondition) {
      this.logger.debug(`[${cluster}] getVoteAccounts: No validator condition found for cluster.`)
      return []
    }
    try {
      const accounts = await this.network.cluster.getVoteAccounts(cluster)
      this.logger.debug(`[${cluster}] getVoteAccounts: Found ${accounts.length} accounts for cluster.`)
      return accounts
    } catch (e) {
      this.logger.error(`[${cluster}] getVoteAccounts: Error getting vote accounts for cluster.: ${e}`)
      return []
    }
  }

  async syncCommunityMembers({ community, conditions }: { community: Community; conditions: RoleCondition[] }) {
    const communityId = community.id
    const voteAccounts = await this.getVoteAccounts({ cluster: community.cluster, conditions })
    // We're looking for any tokens that are linked to the community
    const tokens = await this.core.data.networkToken
      .findMany({
        where: { conditions: { some: { role: { communityId } } } },
        select: { account: true },
      })
      .then((res) => res.map((r) => r.account))

    if (!tokens.length || !voteAccounts.length) {
      this.logger.warn(`[${communityId}] No tokens or vote accounts found for community`)
      return
    }

    // We're looking for any owners of the assets
    const owners = await this.core.data.networkAsset
      .findMany({
        where: { group: { in: tokens } },
        select: { owner: true },
        distinct: ['owner'],
        orderBy: { owner: 'asc' },
      })
      .then((res) => res.map((r) => r.owner))

    const solanaIds = [...new Set([...owners, ...voteAccounts])]

    // We need to get the users ids for the owners of the identified tokens
    const userIds = await this.core.data.user
      .findMany({
        where: {
          OR: [
            { identities: { some: { provider: IdentityProvider.Solana, providerId: { in: solanaIds } } } },
            { identityGrants: { some: { provider: IdentityProvider.Solana, providerId: { in: solanaIds } } } },
          ],
        },
        select: { id: true },
      })
      .then((res) => res.map((r) => r.id))

    const existing = await this.core.data.communityMember.findMany({ where: { communityId } })
    const existingIds = existing.map((e) => e.userId)

    const newMembers: Prisma.CommunityMemberCreateManyInput[] = userIds
      .filter((id) => !existingIds.includes(id))
      .map((userId) => ({
        communityId,
        userId,
        admin: false,
      }))

    if (newMembers.length) {
      for (const newMember of newMembers) {
        await this.core.data.communityMember.create({ data: newMember })
        await this.core.logInfo(`[${communityId}] Member added`, { userId: newMember.userId, communityId })
      }

      this.logger.verbose(`[${communityId}] Synced ${newMembers.length} members to community`)
    }

    // Now delete any members that are no longer owners of the tokens
    const deleteMembers = existing.filter((e) => !userIds.includes(e.userId)).filter((e) => !e.admin)

    if (deleteMembers.length) {
      for (const deleteMember of deleteMembers) {
        await this.core.data.communityMember.delete({ where: { id: deleteMember.id } })
        await this.core.logInfo(`[${communityId}] Member removed`, { userId: deleteMember.userId, communityId })
      }
      this.logger.verbose(`[${communityId}] Deleted ${deleteMembers.length} members from community`)
    }

    if (!newMembers.length && !deleteMembers.length) {
      this.logger.verbose(`[${communityId}] Members in community are in sync`)
    }

    return
  }

  private async ensureCommunityMemberRoles({
    communityId,
    userId,
    roles,
    roleMap,
  }: {
    communityId: string
    userId: string
    roles: Role[]
    roleMap: RoleMap
  }): Promise<{
    granted: number
    revoked: number
  }> {
    const result = {
      granted: 0,
      revoked: 0,
    }
    const existing = await this.core.data.communityMemberRole.findMany({
      where: { member: { communityId, userId } },
    })
    const toGrant = roles.filter((r) => !existing.find((e) => e.roleId === r.id))
    const toRevoke = existing.filter((e) => !roles.find((r) => e.roleId === r.id))

    if (!toGrant?.length && !toRevoke?.length) {
      return result
    }

    for (const role of toRevoke) {
      const roleName = roleMap[role.roleId]?.name ?? 'Unknown Role (to be revoked)'
      const deleted = await this.core.data.communityMemberRole.delete({
        where: { id: role.id },
      })
      await this.core.logInfo(`Role revoked: ${roleName}`, {
        userId,
        communityId,
        roleId: role.roleId,
        relatedId: role.id,
        relatedType: 'Role',
      })
      result.revoked += deleted ? 1 : 0
    }
    for (const role of toGrant) {
      const roleName = roleMap[role.id]?.name ?? 'Unknown Role (to be granted)'
      const created = await this.core.data.communityMemberRole.create({
        data: {
          role: { connect: { id: role.id } },
          member: { connect: { communityId_userId: { communityId, userId } } },
        },
      })
      await this.core.logInfo(`Role granted: ${roleName}`, {
        userId,
        communityId,
        roleId: role.id,
        relatedId: role.id,
        relatedType: 'Role',
      })
      result.granted += created ? 1 : 0
    }
    return result
  }

  private validateRoleCondition(condition: RoleCondition, assets: NetworkAsset[]) {
    const found: NetworkAsset[] = this.getRoleConditionAssets(condition, assets)
    if (!found?.length) {
      return false
    }
    const amountMin = parseInt(condition.amount ?? '0')
    const amountMax = parseInt(condition.amountMax ?? '0')

    const assetAmount = this.getAssetAmount(condition, found)

    if (amountMin && assetAmount < amountMin) {
      return false
    }
    if (amountMax && assetAmount > amountMax) {
      return false
    }
    return true
  }

  private getRoleConditionAssets(condition: RoleCondition, assets: NetworkAsset[]) {
    const foundGroups: NetworkAsset[] = assets.filter((asset) => asset.group === condition.token?.account) ?? []
    const foundMints: NetworkAsset[] =
      assets.filter((asset) => condition?.token?.mintList?.includes(asset.account)) ?? []

    if (!foundGroups?.length && !foundMints?.length) {
      return []
    }
    return [...new Set([...foundGroups, ...foundMints])]
  }

  private getAssetAmount(condition: RoleCondition, assets: NetworkAsset[]) {
    const filtered =
      condition.type === NetworkTokenType.NonFungible && Object.keys(condition.filters ?? {})
        ? assets
            .filter((assets) => !!Object.keys(assets.attributes ?? {})?.length)
            .filter((assets) =>
              validateAttributeFilter({
                attributes: assets.attributes as [string, string][],
                filters: (condition.filters ?? {}) as Record<string, string>,
              }),
            )
        : assets

    const nonFungibleAmount = filtered?.length ?? 0
    const fungibleAmount = filtered?.reduce((acc, asset) => acc + parseInt(asset.balance ?? '0'), 0) ?? 0

    switch (condition.type) {
      case NetworkTokenType.NonFungible:
        return nonFungibleAmount
      case NetworkTokenType.Fungible:
        return fungibleAmount
      default:
        return 0
    }
  }

  private async resolveNetworkAssetsForContext({
    conditions,
    context,
  }: {
    conditions: RoleCondition[]
    context: RoleValidationUser
  }): Promise<RoleValidationUser> {
    // Get all the solanaIds
    const solanaIds = context.solanaIds ?? []

    if (!solanaIds?.length) {
      this.logger.warn(`No solanaIds found in RoleValidationContext`)
      return context
    }

    // Create a map of solanaIds to assets
    const solanaIdAssets: ContextAssetMap = createContextAssetMap()

    const groups = groupConditionsByType(conditions)

    if (groups[NetworkTokenType.Fungible]?.length) {
      // Get the unique tokens
      const tokens = deduplicateTokens(groups[NetworkTokenType.Fungible])

      if (tokens.length) {
        for (const token of tokens) {
          // We want to look up the tokens with the solanaIds
          await this.networkAsset
            .getFungibleAssetsForOwners({
              cluster: token.cluster,
              mint: token.account,
              owners: solanaIds ?? [],
              program: token.program,
            })
            .then((assets) => {
              if (!assets.length) {
                return
              }
              solanaIdAssets[NetworkTokenType.Fungible].push(...assets)
            })
        }
      } else {
        this.logger.warn(`No unique tokens found in ${conditions.length} conditions`)
      }
    }

    if (groups[NetworkTokenType.NonFungible]?.length) {
      // Get the unique tokens
      const tokens = deduplicateTokens(groups[NetworkTokenType.NonFungible])

      if (tokens.length) {
        const cluster = tokens[0].cluster
        const accounts = tokens.map((t) => t.account)
        const mints = tokens.flatMap((t) => t.mintList).filter(Boolean)
        // We want to look up the tokens with the solanaIds
        await this.networkAsset
          .getNonFungibleAssetsForOwners({
            cluster: cluster,
            groups: accounts,
            mints,
            owners: solanaIds ?? [],
          })
          .then((assets) => {
            if (!assets.length) {
              return
            }
            solanaIdAssets[NetworkTokenType.NonFungible].push(...assets)
          })
      } else {
        this.logger.warn(`No unique tokens found in ${conditions.length} conditions`)
      }
    }

    // Find the assets for this context
    for (const type of Object.keys(solanaIdAssets) as NetworkTokenType[]) {
      const assets = solanaIdAssets[type] ?? []
      if (!assets.length) {
        continue
      }
      context.assetMap[type] = context.assetMap[type].concat(assets)
    }

    return context
  }

  private async getRoleConditions({ community }: { community: Community }): Promise<RoleCondition[]> {
    return this.core.data.roleCondition
      .findMany({
        where: { role: { communityId: community.id } },
        select: {
          amount: true,
          amountMax: true,
          config: true,
          filters: true,
          id: true,
          type: true,
          role: true,
          token: {
            select: { id: true, account: true, cluster: true, type: true, mintList: true, name: true, program: true },
          },
        },
      })
      .then((conditions) =>
        conditions.map((condition) => ({
          ...condition,
          amount: condition.amount ?? undefined,
          config: condition.config ?? undefined,
          filters: condition.filters ?? undefined,
          token: condition.token ?? undefined,
        })),
      )
  }

  private async getRoleMap({ community }: { community: Community }): Promise<RoleMap> {
    const roles = await this.core.data.role.findMany({ where: { communityId: community.id }, orderBy: { name: 'asc' } })

    return roles.reduce((acc, role) => ({ ...acc, [role.id]: role }), {} as RoleMap)
  }

  private async getRoleValidationUsers({ community }: { community: Community }): Promise<RoleValidationUser[]> {
    return this.getCommunityUsers({ community })
      .then((users) =>
        users.map((user) => {
          const discordId = user.identities.find((i) => i.provider === IdentityProvider.Discord)?.providerId
          const solanaIdentities = user.identities
            .filter((i) => i.provider === IdentityProvider.Solana)
            .map((i) => i.providerId)

          const solanaIdentityGrants = user.identityGrants
            .filter((i) => i.provider === IdentityProvider.Solana)
            .map((i) => i.providerId)

          const combinedSolanaIdentities = [...solanaIdentities, ...solanaIdentityGrants].filter(Boolean)
          const solanaIds = [...new Set(combinedSolanaIdentities)]
          return {
            userId: user.id,
            username: user.username,
            discordId,
            solanaIds,
            assetMap: createContextAssetMap(),
            conditions: [],
          }
        }),
      )
      .then((contexts) => {
        return contexts.filter((c) => c.solanaIds?.length > 0) as RoleValidationUser[]
      })
  }

  private async getCommunityUsers({ community }: { community: Community }): Promise<CommunityUser[]> {
    return this.core.data.user.findMany({
      where: {
        status: UserStatus.Active,
        communities: { some: { communityId: community.id } },
      },
      select: {
        id: true,
        username: true,
        identities: {
          where: { provider: { in: [IdentityProvider.Discord, IdentityProvider.Solana] } },
          select: { provider: true, providerId: true },
        },
        identityGrants: {
          where: { provider: { in: [IdentityProvider.Solana] } },
          select: { provider: true, providerId: true },
        },
        communities: {
          where: { communityId: community.id },
        },
      },
      orderBy: { username: 'asc' },
    })
  }

  async getRoleSnapshot(roleId: string) {
    const role = await this.core.data.role.findUnique({
      where: { id: roleId },
      include: { community: true, conditions: { include: { token: true } } },
    })

    if (!role?.conditions?.length) {
      return []
    }
    const conditions = role.conditions
    const users = await this.getRoleValidationUsers({ community: role.community })

    const result: {
      items: number
      balance: string
      assets: NetworkAsset[]
      owner: { username: string; discordId: string }
    }[] = []

    for (const user of users) {
      const assets: NetworkAsset[] = []
      // We are now in the context of a user
      const resolved = await this.resolveNetworkAssetsForContext({ conditions, context: user })

      // Now we want to loop over each condition and check the assets
      for (const condition of conditions) {
        const res = this.getRoleConditionAssets(condition, resolved.assetMap[condition.type] ?? [])
        if (!res?.length) {
          continue
        }
        assets.push(...res)
      }

      if (assets.length) {
        result.push({
          items: assets.length,
          balance: assets.reduce((acc, asset) => acc + parseInt(asset.balance ?? '0'), 0).toString(),
          owner: { username: user.username, discordId: user.discordId },
          assets,
        })
      }
    }

    return result
  }
}

type ContextAssetMap = Record<NetworkTokenType, NetworkAsset[]>
function createContextAssetMap(): ContextAssetMap {
  return Object.values(NetworkTokenType).reduce((acc, type) => {
    acc[type] = []
    return acc
  }, {} as Record<NetworkTokenType, NetworkAsset[]>)
}

export interface CommunityUser {
  id: string
  username: string
  identities: { provider: IdentityProvider; providerId: string }[]
  identityGrants: { provider: IdentityProvider; providerId: string }[]
  communities: CommunityMember[]
}

export interface RoleValidationUser {
  userId: string
  username: string
  discordId: string
  solanaIds: string[]
  assetMap: ContextAssetMap
  conditions: RoleCondition[]
}

function validateAttributeFilter({
  attributes,
  filters,
}: {
  attributes: [string, string][]
  filters: Record<string, string>
}): boolean {
  return Object.entries(filters).every(([key, value]) => {
    const found = attributes.find(([k, v]) => k === key && v === value)
    return !!found
  })
}

function groupConditionsByType(conditions: RoleCondition[]): Record<NetworkTokenType, RoleCondition[]> {
  return conditions.reduce((acc, condition) => {
    const type = condition.type
    acc[type] = acc[type] ?? []
    acc[type].push(condition)
    return acc
  }, {} as Record<NetworkTokenType, RoleCondition[]>)
}

function deduplicateTokens(conditions: RoleCondition[]) {
  return (
    ((conditions.filter((c) => !!c.token).map((c) => c.token) ?? []) as NetworkToken[])
      // A unique token is where the account and cluster are the same
      .filter((t) => !!t.account && !!t.cluster)
      .filter(
        (t, i, a) => a.findIndex((u) => u.account === t.account && u.cluster === t.cluster) === i,
      ) as NetworkToken[]
  )
}
