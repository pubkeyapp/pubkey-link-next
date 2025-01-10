import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Identity, IdentityProvider, UserStatus } from '@prisma/client'
import { DiscordBot } from '@pubkey-link/api-bot-util'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Queue } from 'bullmq'
import { ApiBotInstancesService } from './api-bot-instances.service'
import { CommunityMemberSummary } from './entity/community-member-summary'
import { CommunityRoleMap, DiscordServerMember } from './entity/discord-server.entity'
import { API_BOT_ADD_ROLE_QUEUE, API_BOT_REMOVE_ROLE_QUEUE } from './helpers/api-bot.constants'
import { compareCommunityDiscordRoles } from './helpers/compare-community-discord-roles'
import { ApiBotAddRolePayload } from './processors/api-bot-add-role-payload'
import { ApiBotRemoveRolePayload } from './processors/api-bot-remove-role-payload'

@Injectable()
export class ApiBotSyncService {
  private readonly logger = new Logger(ApiBotSyncService.name)

  constructor(
    @InjectQueue(API_BOT_ADD_ROLE_QUEUE) private readonly addRoleQueue: Queue,
    @InjectQueue(API_BOT_REMOVE_ROLE_QUEUE) private readonly removeRoleQueue: Queue,
    private readonly core: ApiCoreService,
    private readonly instances: ApiBotInstancesService,
  ) {}

  private async ensureCommunityInfo({
    botId,
    botInstance,
    serverId,
  }: {
    botId: string
    botInstance: DiscordBot
    serverId: string
  }): Promise<{
    communityRoleMap: CommunityRoleMap
    communityMemberRoles: CommunityMemberSummary[]
    discordMemberRoles: DiscordServerMember[]
  }> {
    const [communityMemberRoles, communityRoleMap, discordMemberRoles] = await Promise.all([
      this.getCommunityMemberSummary({ botId }),
      this.getCommunityRoleMap({ botId, serverId }),
      botInstance.getDiscordServerMembers(serverId),
    ])

    return { communityMemberRoles, communityRoleMap, discordMemberRoles }
  }

  async syncBotServer({ botId, serverId }: { botId: string; serverId: string }) {
    // Make sure we have a bot, the bot instance, the bot server, and the guild
    const { bot, botInstance, botServer } = await this.instances.ensureBotInstanceGuild({ botId, serverId })

    // Get the community members, roles, and bot members
    const { communityMemberRoles, communityRoleMap, discordMemberRoles } = await this.ensureCommunityInfo({
      botId,
      botInstance,
      serverId,
    })

    // Get the roles and role map from the bot instance for this server
    const { discordRoles, discordRoleMap } = await this.instances.getDiscordRolesFromBotInstance({
      botInstance,
      serverId,
      communityRoleIds: Object.values(communityRoleMap).flat(),
    })

    // If we don't have any roles, we can't do anything and we should return
    if (!discordRoles.length) {
      this.logger.warn(`No roles found for bot ${botId} in server ${serverId}`)
      return false
    }

    const result = compareCommunityDiscordRoles({
      communityRoleMap,
      communityMemberRoles,
      discordMemberRoles,
    })

    for (const [memberId, roleIds] of Object.entries(result.addRolesToMember)) {
      const discordMember = discordMemberRoles.find((i) => i.discordId === memberId)
      if (!discordMember) {
        continue
      }
      await this.addMember({ botServer, communityId: bot.communityId, discordMember, discordRoleMap, roleIds })
    }

    for (const [memberId, roleIds] of Object.entries(result.removeRolesFromMember)) {
      const discordMember = discordMemberRoles.find((i) => i.discordId === memberId)
      if (!discordMember) {
        continue
      }
      await this.removeMember({ botServer, communityId: bot.communityId, discordMember, discordRoleMap, roleIds })
    }

    return true
  }

  @Cron(CronExpression.EVERY_MINUTE)
  private async syncAllBotServers(): Promise<void> {
    if (!this.core.config.syncBotServers) {
      this.logger.warn(`[GLOBAL] Bot server sync is disabled (SYNC_BOT_SERVERS!=true)`)
      return
    }

    for (const bot of await this.instances.getActiveBots()) {
      const servers = await this.instances.getBotServers(bot.id)
      for (const server of servers.filter((e) => e)) {
        const botServer = await this.instances.ensureBotServer({ botId: bot.id, serverId: server.id })
        if (botServer.enableSync) {
          await this.syncBotServer({ botId: bot.id, serverId: server.id })
        } else {
          this.logger.debug(`[${bot.name}] Sync is disabled for server ${server.name}`)
        }
      }
    }
  }

  // Get the role permissions for a bot in a server
  private async getCommunityRoleMap({
    botId,
    serverId,
  }: {
    botId: string
    serverId: string
  }): Promise<CommunityRoleMap> {
    return this.core.data.rolePermission
      .findMany({
        where: {
          role: { community: { bots: { some: { id: botId } } } },
        },
        select: {
          roleId: true,
          botRole: {
            where: { serverId },
            select: { serverRoleId: true },
          },
        },
      })
      .then((permissions) =>
        permissions
          .filter((i) => i.botRole?.serverRoleId)
          .reduce((acc, permission) => {
            if (!acc[permission.roleId]) {
              acc[permission.roleId] = []
            }
            acc[permission.roleId].push(permission.botRole?.serverRoleId as string)
            return acc
          }, {} as CommunityRoleMap),
      )
  }

  private async getCommunityMemberSummary({ botId }: { botId: string }): Promise<CommunityMemberSummary[]> {
    return this.core.data.communityMember
      .findMany({
        where: {
          community: { bots: { some: { id: botId } } },
          user: {
            status: UserStatus.Active,
            identities: { some: { provider: IdentityProvider.Discord } },
          },
        },
        select: {
          communityId: true,
          user: {
            select: {
              // Basic user info
              id: true,
              username: true,
              identities: {
                // Discord identity
                where: { provider: IdentityProvider.Discord },
                select: { provider: true, providerId: true },
              },
              communities: {
                where: {
                  // The community related to this bot
                  community: { bots: { some: { id: botId } } },
                },
                include: {
                  // Get the roles for this member in the community
                  roles: { select: { roleId: true } },
                },
              },
            },
          },
        },
      })
      .then((members) =>
        members
          .filter((member) => member.user.communities.length)
          .filter((member) => member.user.identities.some((i) => i.provider === IdentityProvider.Discord))
          .map(({ user }) => {
            const community = user.communities[0]
            const discord = user.identities.find((i) => i.provider === IdentityProvider.Discord) as Identity

            return {
              userId: user.id,
              username: user.username,
              discordId: discord.providerId,
              communityId: community.communityId,
              roleIds: community.roles.map((role) => role.roleId),
            }
          }),
      )
  }

  private async addMember(payload: ApiBotAddRolePayload) {
    const roleNames = payload.roleIds.map((r) => payload.discordRoleMap[r])
    this.logger.verbose(
      `addRoleQueue.add: Member ${payload.discordMember.username} (${
        payload.discordMember.discordId
      }) add roles: ${roleNames.join(', ')}`,
    )
    await this.addRoleQueue.add('add-role', payload)
  }

  private async removeMember(payload: ApiBotRemoveRolePayload) {
    const roleNames = payload.roleIds.map((r) => payload.discordRoleMap[r])
    this.logger.verbose(
      `removeRoleQueue.add: Member ${payload.discordMember.username} (${
        payload.discordMember.discordId
      }) remove roles: ${roleNames.join(', ')}`,
    )
    await this.removeRoleQueue.add('remove-role', payload)
  }
}
