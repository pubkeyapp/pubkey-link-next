import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { IdentityProvider, LogLevel, LogRelatedType, NetworkCluster, Prisma, User, UserRole } from '@prisma/client'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { ApiCoreConfigService } from './config/api-core-config.service'
import { StatRecord } from './entity/stat-record'
import { StatRecordGroup } from './entity/stat-record-group'
import { getRandomString } from './helpers/get-random-string'
import { slugifyId, slugifyUsername } from './helpers/slugify-id'
import { ApiCoreProtocolService } from './protocol/api-core-protocol.service'

@Injectable()
export class ApiCoreService implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreService.name)
  readonly data: ApiCorePrismaClient = prismaClient
  constructor(
    readonly eventEmitter: EventEmitter2,
    readonly config: ApiCoreConfigService,
    readonly protocol: ApiCoreProtocolService,
  ) {}

  async onModuleInit() {
    await this.databaseCleanupDeprecated()
  }

  async createCommunity({ input, userId }: { input: Prisma.CommunityCreateInput; userId?: string }) {
    const id = slugifyId(input.name).toLowerCase()
    const found = await this.getCommunityById(id)
    if (found) {
      throw new Error(`Community ${input.name} already exists`)
    }
    return this.data.community.create({
      data: {
        ...input,
        enableSync: true,
        id,
        members: input.members
          ? input.members
          : userId
          ? {
              create: {
                userId,
                admin: true,
              },
            }
          : undefined,
      },
    })
  }

  async ensureCommunityMember({
    communityId,
    userId,
  }: {
    communityId: string
    userId: string
  }): Promise<{ admin: boolean }> {
    const user = await this.findUserById(userId)
    if (!user) {
      throw new Error(`User ${userId} not found`)
    }
    // Admins have Admin role in all communities
    if (user.role === UserRole.Admin) {
      return { admin: true }
    }
    const found = await this.data.communityMember.findUnique({
      where: { communityId_userId: { communityId, userId } },
    })
    if (!found) {
      throw new Error(`User ${userId} is not a member of community ${communityId}`)
    }
    return { admin: found.admin }
  }

  async ensureCommunityAdmin({ communityId, userId }: { communityId: string; userId: string }): Promise<boolean> {
    const { admin } = await this.ensureCommunityMember({ communityId, userId })
    if (!admin) {
      throw new Error(`User ${userId} is not an admin of community ${communityId}`)
    }
    return admin
  }

  async ensureNetworkCluster(cluster: NetworkCluster) {
    const found = await this.data.network.findFirst({
      where: { cluster },
    })
    if (!found) {
      throw new Error(`Network cluster ${cluster} not found`)
    }
    return cluster
  }

  async ensureUserAdmin(userId: string): Promise<boolean> {
    const user = await this.findUserById(userId)
    if (user?.role !== UserRole.Admin) {
      throw new Error(`User ${userId} is not an admin`)
    }
    return user.role === UserRole.Admin
  }

  async ensureUserById(userId: string) {
    const found = await this.findUserById(userId)
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async getCommunityById(communityId: string) {
    return this.data.community.findUnique({
      where: { id: communityId },
      include: { members: true },
    })
  }

  async getSolanaIdentities({ username }: { username: string }): Promise<string[]> {
    return this.data.identity
      .findMany({
        where: { provider: IdentityProvider.Solana, owner: { username } },
        select: { providerId: true },
      })
      .then((identities) => identities.map((identity) => identity.providerId))
  }

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async findUserById(userId: string) {
    return this.data.user.findUnique({ where: { id: userId } })
  }

  async findUsername(username: string): Promise<string> {
    username = slugifyUsername(username)
    const exists = await this.data.user.findUnique({ where: { username } })
    if (!exists) {
      return username
    }
    const newUsername = `${username}-${getRandomString(4).toLowerCase()}`
    return this.findUsername(newUsername)
  }

  private async log(message: string, input: CoreLogInput) {
    return this.data.log.create({ data: { ...input, message } })
  }
  async logError(message: string, input?: Omit<CoreLogInput, 'level'>) {
    if (this.config.isDevelopment) {
      this.logger.error({ message, input }, 'ApiCoreService.logError')
    }
    return this.log(message, { ...input, level: LogLevel.Error })
  }

  async logInfo(message: string, input?: Omit<CoreLogInput, 'level'>) {
    if (this.config.isDevelopment) {
      this.logger.log({ message, input }, 'ApiCoreService.logInfo')
    }
    return this.log(message, { ...input, level: LogLevel.Info })
  }

  async logVerbose(message: string, input?: Omit<CoreLogInput, 'level'>) {
    if (this.config.isDevelopment) {
      this.logger.verbose({ message, input }, 'ApiCoreService.logVerbose')
    }
    return this.log(message, { ...input, level: LogLevel.Verbose })
  }

  async logWarning(message: string, input?: Omit<CoreLogInput, 'level'>) {
    if (this.config.isDevelopment) {
      this.logger.warn({ message, input }, 'ApiCoreService.logWarning')
    }
    return this.log(message, { ...input, level: LogLevel.Warning })
  }

  uptime() {
    return process.uptime()
  }

  async isPrivateUser(actor: User, username: string) {
    if (actor.role !== UserRole.Admin && actor.username !== username) {
      const user = await this.data.user.findUnique({ where: { username: username } })
      if (!user) {
        throw new Error(`User ${username} not found`)
      }
      return user.private
    }
    return false
  }

  async tableStats(): Promise<StatRecordGroup[]> {
    return [
      {
        name: 'Identities by Provider',
        records: await this.getIdentityCount(),
      },
      {
        name: 'Row Counts',
        records: await this.getTableRowCount(),
      },
    ]
  }

  private async getIdentityCount(): Promise<StatRecord[]> {
    return this.data.identity.groupBy({ by: ['provider'], _count: { provider: true } }).then((identities) =>
      identities
        // order by count descending
        .sort((a, b) => Number(b._count.provider) - Number(a._count.provider))
        // map to StatRecord
        .map((identity) => ({ name: identity.provider, value: identity._count.provider.toString() })),
    )
  }

  private async getTableRowCount(): Promise<StatRecord[]> {
    // Get all the table counts from the database
    const tables: { name: string; value: bigint }[] = await this.data.$queryRaw(Prisma.sql`
        SELECT
          relname AS name, n_live_tup AS value
        FROM
          pg_stat_user_tables
        ORDER BY
          relname;
    `)

    return (
      tables
        // sort by value (bigint) descending
        ?.sort((a, b) => Number(b.value) - Number(a.value))
        // map to StatRecord
        ?.map(({ name, value }) => ({ name, value: value.toString() })) ?? []
    )
  }

  // This is a method that will clean up some deprecated fields in the database
  private async databaseCleanupDeprecated() {
    // We deprecated the 'role: CommunityRole' in favor of the 'admin: boolean' field.
    const communityRoles = await this.data.communityMember.findMany({
      where: {
        role: { not: null },
      },
    })
    // We deprecated the 'mentionUsers' and 'mentionRoles' fields as they were no longer used
    const botServers = await this.data.botServer.findMany({
      where: { mentionUsers: { not: null }, mentionRoles: { not: null } },
    })

    if (!botServers.length && !communityRoles.length) {
      this.logger.log('No deprecated fields found in the database')
      return
    }

    this.logger.log('Starting database cleanup for deprecated fields')

    for (const item of communityRoles) {
      const admin = item.role === 'Admin'
      const updated = await this.data.communityMember.update({
        where: { id: item.id },
        // Set the role to null and the admin boolean based on the old role
        data: { role: null, admin },
        include: { community: true, user: true },
      })
      this.logger.log(
        `cleanupDeprecated: Updated communityMember ${updated.user?.username}, deleted role, set admin=${admin}`,
      )
    }

    for (const item of botServers) {
      const updated = await this.data.botServer.update({
        where: { id: item.id },
        // Set the mentionUsers and mentionRoles to null
        data: { mentionUsers: null, mentionRoles: null },
      })
      this.logger.log(`cleanupDeprecated: Updated botServer ${updated.id}, deleted mentionUsers and mentionRoles`)
    }
    this.logger.log('Finished database cleanup for deprecated fields')
  }
}

export interface CoreLogInput {
  botId?: string | null
  communityId?: string | null
  data?: Prisma.InputJsonValue
  identityProvider?: IdentityProvider | null
  identityProviderId?: string | null
  level: LogLevel
  relatedId?: string | null
  relatedType?: LogRelatedType | null
  roleId?: string | null
  userId?: string | null
}
