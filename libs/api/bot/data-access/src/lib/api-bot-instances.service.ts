import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Bot, BotServer, IdentityProvider } from '@prisma/client'
import { createDiscordRestClient, DiscordBot } from '@pubkey-link/api-bot-util'
import { ApiCoreService, EVENT_APP_STARTED } from '@pubkey-link/api-core-data-access'
import { ChannelType, EmbedAuthorData, Guild, MessageCreateOptions, PermissionsString, User } from 'discord.js'
import { ApiBotCommandsService } from './api-bot-commands.service'
import { BotStatus } from './entity/bot-status.enum'
import { DiscordChannel, DiscordRole, DiscordRoleMap, DiscordServer } from './entity/discord-server.entity'

export interface MessageContent {
  author?: EmbedAuthorData
  description: string
  footer?: string
  title?: string
}

function messageContent({
  author,
  color,
  description,
  footer,
  title,
}: MessageContent & { color: number }): MessageCreateOptions {
  return {
    embeds: [
      {
        author,
        description,
        color,
        title,
        timestamp: new Date().toISOString(),
        footer: { text: footer ? footer : '' },
      },
    ],
  }
}
function messageContentError(content: MessageContent) {
  return messageContent({ color: 0xff0000, ...content })
}
function messageContentSuccess(content: MessageContent) {
  return messageContent({ color: 0x00ff00, ...content })
}
function messageContentInfo(content: MessageContent) {
  return messageContent({ color: 0x00ffff, ...content })
}

@Injectable()
export class ApiBotInstancesService {
  private readonly logger = new Logger(ApiBotInstancesService.name)
  private readonly bots = new Map<string, DiscordBot>()
  constructor(private readonly core: ApiCoreService, private readonly command: ApiBotCommandsService) {}

  @OnEvent(EVENT_APP_STARTED)
  async onApplicationStarted() {
    if (!this.core.config.botAutoStart) {
      this.logger.verbose(`Bot auto start is disabled`)
      return
    }
    for (const bot of await this.getActiveBots()) {
      await this.startBot(bot)
    }
  }
  async getGuildMember(guild: Guild, memberId: string) {
    try {
      return await guild.members.fetch(memberId)
    } catch (e) {
      return undefined
    }
  }

  async getActiveBots(): Promise<Bot[]> {
    return this.core.data.bot.findMany({ where: { status: BotStatus.Active } })
  }

  async getDefaultBot(): Promise<Bot | null> {
    return this.core.data.bot.findFirst({ where: { id: this.core.config.authDiscordClientId } })
  }

  async getDefaultBotInstance(): Promise<DiscordBot> {
    const bot = await this.getDefaultBot()
    if (!bot) {
      throw new Error(`Can't get default bot`)
    }
    const instance = this.getBotInstance(bot.id)
    if (!instance) {
      throw new Error(`Can't get default bot instance`)
    }
    return instance
  }

  async getBotRole({
    botId,
    roleId,
    serverId,
  }: {
    botId: string
    serverId: string
    roleId: string
  }): Promise<DiscordRole | undefined> {
    try {
      const bot = this.getBotInstance(botId)
      if (!bot) {
        return undefined
      }
      const role = await bot.getRole(serverId, roleId)
      if (!role) {
        return undefined
      }
      return role
    } catch (e) {
      console.error(e)
      return undefined
    }
  }

  async getBotRoles({
    botId,
    serverId,
  }: {
    botId: string
    serverId: string
  }): Promise<{ discordRoles: DiscordRole[]; discordRoleMap: DiscordRoleMap }> {
    const botInstance = this.getBotInstance(botId)

    if (!botInstance) {
      throw new Error(`Bot ${botId} not found`)
    }

    return this.getDiscordRolesFromBotInstance({ botInstance, serverId })
  }

  async sendCommandChannel(botServer: BotServer, content: string | MessageCreateOptions) {
    if (!botServer.botChannel) {
      return
    }
    await this.getBotInstance(botServer.botId)?.sendChannel(botServer.botChannel, content)
  }

  async sendCommandChannelError(botServer: BotServer, options: MessageContent) {
    await this.sendCommandChannel(botServer, messageContentError(options))
  }

  async sendCommandChannelSuccess(botServer: BotServer, options: MessageContent) {
    await this.sendCommandChannel(botServer, messageContentSuccess(options))
  }

  async sendCommandChannelInfo(botServer: BotServer, options: MessageContent) {
    await this.sendCommandChannel(botServer, messageContentInfo(options))
  }

  /**
   * Get the roles for a bot in a server
   * @param botInstance The Discord bot instance
   * @param serverId The server ID we want to get the roles for
   * @param communityRoleIds (Optional) The roles used in the community to filter the roles by
   */
  async getDiscordRolesFromBotInstance({
    botInstance,
    serverId,
    communityRoleIds = [],
  }: {
    botInstance: DiscordBot
    serverId: string
    communityRoleIds?: string[]
  }): Promise<{ discordRoles: DiscordRole[]; discordRoleMap: DiscordRoleMap }> {
    const discordRoles = await botInstance
      // Get all the roles in the server
      .getRoles(serverId)
      // Filter out the roles that are not used in the community, if provided
      .then((items) => (communityRoleIds.length ? items.filter((i) => communityRoleIds.includes(i.id)) : items))

    return {
      discordRoles,
      discordRoleMap: createDiscordRoleMap(discordRoles),
    }
  }

  async getBotUser(token: string) {
    const client = createDiscordRestClient(token)
    const user: User = (await client.get('/users/@me')) as User
    if (!user) {
      throw new Error('Invalid token')
    }
    this.logger.verbose(`getBotUser ${user.username}`)
    return user
  }

  async getBotChannels(botId: string, serverId: string): Promise<DiscordChannel[]> {
    const bot = this.getBotInstance(botId)
    if (!bot) {
      return []
    }
    const channels = await bot.getDiscordServerChannels(serverId)

    return channels
      .filter(({ type }) => [ChannelType.GuildCategory, ChannelType.GuildText].includes(type))
      .map((channel) => ({
        id: channel.id,
        name: channel.name,
        type: ChannelType[channel.type],
        parentId: channel.parentId,
      }))
  }

  async getBotServer({ botId, serverId }: { botId: string; serverId: string }): Promise<DiscordServer | undefined> {
    try {
      const bot = this.getBotInstance(botId)
      if (!bot) {
        return undefined
      }
      const server = await bot.client?.guilds.fetch({ guild: serverId })

      if (!server) {
        return undefined
      }

      return {
        id: server.id,
        name: server.name,
        icon: server.iconURL(),
      }
    } catch (e) {
      console.error(e)
      return undefined
    }
  }

  async getBotServers(botId: string): Promise<DiscordServer[]> {
    const bot = this.getBotInstance(botId)

    if (!bot) {
      return []
    }

    const servers = await bot.client?.guilds.fetch()
    if (!servers) {
      return []
    }

    return servers.map((server) => ({
      id: server.id,
      name: server.name,
      icon: server.iconURL(),
      permissions: convertPermissions(server.permissions.serialize()),
    }))
  }

  async leaveBotServer(botId: string, serverId: string) {
    return this.ensureBotInstance(botId).leaveServer(serverId)
  }

  async startBot(bot: Bot) {
    if (this.bots.get(bot.id)) {
      throw new Error(`[${bot.name}] bot already started`)
    }
    this.logger.verbose(`[${bot.name}] Starting bot...`)
    const instance = new DiscordBot({ botId: bot.id, token: bot.token, name: bot.name })
    await instance.start()
    await this.setupApplicationCommands(bot, instance)
    await this.setupListeners(bot, instance)
    this.bots.set(bot.id, instance)

    return true
  }

  async stopBot(bot: Bot) {
    const instance = this.bots.get(bot.id)
    if (!instance) {
      throw new Error(`[${bot.name}] bot not started`)
    }
    await instance.stop()
    this.bots.delete(bot.id)

    return true
  }

  getBotInstance(botId: string): DiscordBot | undefined {
    return this.bots.get(botId)
  }

  ensureBotInstance(botId: string) {
    const instance = this.bots.get(botId)
    if (!instance) {
      throw new Error(`[${botId}] bot not started`)
    }
    return instance
  }

  async ensureBotInstanceGuild({ botId, serverId }: { botId: string; serverId: string }): Promise<{
    bot: Bot
    botInstance: DiscordBot
    botServer: BotServer
    guild: Guild
  }> {
    const [bot, botInstance, botServer] = await Promise.all([
      this.ensureBot({ botId }),
      this.ensureBotInstance(botId),
      this.ensureBotServer({ botId, serverId }),
    ])

    const guild = await botInstance.client?.guilds.fetch(serverId)

    if (!guild) {
      throw new Error(`Server ${serverId} not found for bot ${botId}`)
    }

    return { bot, botInstance, botServer, guild }
  }

  async ensureBot({ botId }: { botId: string }) {
    return this.core.data.bot.findUniqueOrThrow({ where: { id: botId } })
  }

  async ensureBotServer({ botId, serverId }: { botId: string; serverId: string }) {
    const found = await this.core.data.botServer.findUnique({
      where: { botId_serverId: { botId, serverId } },
      include: { bot: true },
    })
    if (!found) {
      // Make sure this bot is connected to the server
      const found = await this.ensureBotInstance(botId).client?.guilds.fetch(serverId)
      if (!found) {
        throw new Error(`Server ${serverId} not found for bot ${botId}`)
      }
      this.logger.verbose(`Creating bot server ${serverId}`)
      return this.core.data.botServer.create({
        data: { bot: { connect: { id: botId } }, serverId },
        include: { bot: true },
      })
    }
    return found
  }

  private async setupApplicationCommands(bot: Bot, instance: DiscordBot) {
    if (!instance.client?.user?.id) {
      this.logger.warn(`Bot client on instance not found.`)
      return
    }
    this.logger.verbose(`[${bot.name}] Setting up application commands for bot ${bot.name}`)

    const existingCommands = await instance.client?.application?.commands.fetch()
    const existingCommandNames = existingCommands?.map((c) => c.name)
    this.logger.debug(`Found ${existingCommands?.size} existing commands: ${existingCommands?.map((c) => c.name)}`)

    // console.log(existingCommands?.map((c) => c.toJSON()))
    for (const command of this.command.commands.values()) {
      this.logger.debug(`  => Registering command ${command.data.name}`)
      if (existingCommandNames?.includes(command.data.name)) {
        this.logger.debug(`    => Command ${command.data.name} already exists`)
        continue
      }
      const created = await instance.client?.application?.commands.create(command.data)
      if (!created) {
        throw new Error(`Failed to create command ${command.data.name}`)
      } else {
        this.logger.debug(`    => Created command ${command.data.name}`)
      }
    }
  }

  private async setupListeners(bot: Bot, instance: DiscordBot) {
    if (!instance.client?.user?.id) {
      this.logger.warn(`Bot client on instance not found.`)
      return
    }
    this.logger.verbose(`[${bot.name}] Setting up listeners...`)

    instance.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) {
        return
      }

      const command = this.command.commands.get(interaction.commandName)
      if (!command) {
        this.logger.warn(`Unknown command ${interaction.commandName}`)
        return
      }
      const result = await command.execute(interaction)
      if (result) {
        await interaction.reply(result)
      }
    })

    instance.client.on('guildMemberAdd', async (member) => {
      const botServer = await this.ensureBotServer({ botId: bot.id, serverId: member.guild.id })
      if (!botServer.botChannel) {
        this.logger.warn(`Bot channel not found for ${member.guild.id}`)
        return
      }
      const author = { name: member.user.username, iconURL: member.user.displayAvatarURL() }
      await this.sendCommandChannelInfo(botServer, {
        author,
        footer: `ID: ${member.user.id}`,
        description: `<@${member.user.id}> has joined the server.`,
      })
    })
    instance.client.on('guildMemberRemove', async (member) => {
      const botServer = await this.ensureBotServer({ botId: bot.id, serverId: member.guild.id })
      if (!botServer.botChannel) {
        this.logger.warn(`Bot channel not found for ${member.guild.id}`)
        return
      }
      const author = { name: member.user.username, iconURL: member.user.displayAvatarURL() }
      await this.sendCommandChannelInfo(botServer, {
        author,
        footer: `ID: ${member.user.id}`,
        description: `<@${member.user.id}> has left the server.`,
      })
    })
    instance.client.on('guildMemberUpdate', async (oldMember, newMember) => {
      const addedRoles = newMember.roles.cache.filter((role) => !oldMember.roles.cache.has(role.id))
      const removedRoles = oldMember.roles.cache.filter((role) => !newMember.roles.cache.has(role.id))

      if (!addedRoles.size && !removedRoles.size) {
        return
      }
      this.logger.log(
        `Bot ${instance?.client?.user?.id} updated member ${newMember.user.username} : ${addedRoles.size} added, ${removedRoles.size} removed`,
      )
      const botServer = await this.ensureBotServer({
        botId: `${instance?.client?.user?.id}`,
        serverId: newMember.guild.id,
      })

      if (!botServer.botChannel) {
        this.logger.warn(`Bot channel not found for ${newMember.guild.id}`)
        return
      }
      const author = { name: newMember.user.username, iconURL: newMember.user.displayAvatarURL() }

      addedRoles.forEach((role) => {
        this.sendCommandChannelInfo(botServer, {
          author,
          footer: `ID: ${newMember.user.id}`,
          description: `**<@${newMember.user.id}> was given the <@&${role.id}> role.**`,
        })
      })

      removedRoles.forEach((role) => {
        this.sendCommandChannelInfo(botServer, {
          author,
          footer: `ID: ${newMember.user.id}`,
          description: `**<@${newMember.user.id}> was removed from the <@&${role.id}> role.**`,
        })
      })
    })
  }

  isStarted(botId: string) {
    return !!this.bots.get(botId)
  }

  developersUrl(botId: string) {
    return `https://discord.com/developers/applications/${botId}`
  }

  inviteUrl(botId: string) {
    const url = new URL('https://discord.com/api/oauth2/authorize')
    url.searchParams.append('client_id', botId)
    url.searchParams.append('permissions', '2415935488')
    // url.searchParams.append('permissions', '268437504')
    url.searchParams.append('scope', ' bot role_connections.write')
    url.searchParams.append('redirect_uri', this.redirectUrl())
    url.searchParams.append('response_type', 'code')

    return url.toString()
  }

  redirectUrl() {
    // TODO: Implement redirect URL for bot specific callback
    // return `${this.core.config.apiUrl}/bot/${botId}/callback`
    return this.core.config.authDiscordStrategyOptions.callbackURL
  }

  verificationUrl(botId: string) {
    return `${this.core.config.webUrl}/bot/${botId}/verification`
  }

  async testBotServerConfig({ botId, serverId, userId }: { userId: string; botId: string; serverId: string }) {
    const bot = await this.core.data.bot.findUnique({ where: { id: botId }, include: { community: true } })
    if (!bot) {
      throw new Error(`Bot ${botId} not found`)
    }

    const discordBot = this.getBotInstance(botId)
    if (!discordBot) {
      throw new Error(`Bot ${botId} not started`)
    }

    const discordServer = await discordBot.client?.guilds.fetch(serverId)
    if (!discordServer) {
      throw new Error(`Server ${serverId} not found`)
    }

    const botServer = await this.ensureBotServer({ botId, serverId })
    if (!botServer) {
      throw new Error(`Bot server ${serverId} not found`)
    }
    if (!botServer.botChannel) {
      throw new Error(`This bot does not have a command channel set`)
    }
    const identity = await this.core.data.identity.findFirst({
      where: { ownerId: userId, provider: IdentityProvider.Discord },
    })
    if (!identity) {
      throw new Error(`Discord Identity for user ${userId} not found`)
    }
    const summary = await this.getCommunityRoleSummary(bot.communityId)

    await discordBot.sendChannel(botServer.botChannel, {
      embeds: [
        {
          title: `Configuration for ${discordBot.client?.user?.username} in ${bot.community.name}`,
          fields: [
            { name: 'Requester', value: `<@${identity.providerId}>` },
            { name: `Bot`, value: `<@${discordBot.client?.user?.id}>` },
            {
              name: `Admin Role`,
              value: botServer.adminRoles?.length
                ? botServer.adminRoles.map((role) => `<@&${role}>`).join(' ')
                : 'Not set',
            },
            { name: `Bot Channel`, value: `<#${botServer.botChannel}>` },
            { name: `Dry Run`, value: botServer.dryRun ? 'Enabled' : 'Disabled' },
            { name: `Enable Sync`, value: botServer.enableSync ? 'Enabled' : 'Disabled' },
            { name: 'Roles:', value: `There are ${summary.length} roles in this community` },
            ...summary.map((role) => ({
              name: `${role.name}`,
              value: `Conditions (**${role.conditions.length}**):
               ${role.conditions.map(
                 (condition) =>
                   ` - ${condition.amount} [${condition.token?.symbol}](https://solana.fm/address/${condition.token?.account}) ${condition.token?.name} (${condition.type})\n`,
               )}Permissions (**${role.permissions.length}**):
                ${role.permissions.map(
                  (permission) => ` - <@&${permission.botRole?.serverRoleId}>\n`,
                )}Members with this role: **${role.members.length}**.
            `,
            })),
          ],
          url: `${this.core.config.webUrl}/c/${bot.communityId}/discord/servers/${serverId}`,
        },
      ],
    })

    return botServer
  }

  private async getCommunityRoleSummary(communityId: string) {
    return this.core.data.role.findMany({
      where: { communityId },
      include: {
        conditions: { include: { token: true } },
        permissions: { include: { botRole: true } },
        members: true,
      },
    })
  }
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}

function createDiscordRoleMap(roles: DiscordRole[]): DiscordRoleMap {
  return roles.map((role) => ({ [role.id]: role.name })).reduce((acc, role) => ({ ...acc, ...role }), {})
}
