import { REST } from '@discordjs/rest'
import { Logger } from '@nestjs/common'
import { Client, Guild, GuildMember, MessageCreateOptions, NonThreadGuildBasedChannel, User } from 'discord.js'
import { createDiscordClient, createDiscordRestClient } from './discord/client'

export interface RESTDiscordRoleConnection {
  type: number
  name: string
  description: string
  key: string
}

export interface RESTDiscordRole {
  id: string
  name: string
  color: number
  managed: boolean
  position: number
}

export interface RESTDiscordMember {
  id: string
  providerId: string
  username: string
}

export class DiscordBot {
  private readonly logger = new Logger(DiscordBot.name)
  client?: Client
  rest?: REST
  constructor(private readonly config: { botId: string; token: string; name: string }) {}

  async start() {
    this.logger.verbose(`[${this.config.name}] Starting bot...`)
    this.client = await createDiscordClient(this.config.token)
    this.rest = createDiscordRestClient(this.config.token)
    this.logger.verbose(`[${this.config.name}] Bot started`)
  }

  async stop() {
    this.logger.verbose(`[${this.config.name}] Stopping bot...`)
    await this.client?.destroy()
    this.logger.verbose(`[${this.config.name}] Bot stopped`)
  }

  async addRoleConnection(input: RESTDiscordRoleConnection): Promise<RESTDiscordRoleConnection[]> {
    const existing = await this.getRoleConnections()

    const found = existing.find((item) => item.key === input.key)
    if (found) {
      throw new Error(`[${this.config.name}] Role ${input.key} already exists`)
    }

    const roles = await this.rest
      ?.put(`/applications/${this.config.botId}/role-connections/metadata`, { body: [...existing, input] })
      .catch(() => {
        throw new Error(`Error adding role ${input.key}`)
      })
    return (roles ?? []) as RESTDiscordRoleConnection[]
  }

  async getApplication() {
    return (await this.rest?.get(`/applications/${this.config.botId}`)) as BotApplication
  }

  async getDiscordServerMembers(
    guildId: string,
  ): Promise<{ discordId: string; username: string; roleIds: string[] }[]> {
    const guild = await this.getServer(guildId)
    if (!guild) {
      throw new Error(`[${this.config.name}] Could not fetch guild with id ${guildId}`)
    }

    const members = await this.getEachMember(guild)
    return members.map((member) => ({
      discordId: member.id,
      username: member.user?.username,
      roleIds: member.roles.cache.map((role) => role.id),
    }))
  }

  async getDiscordServerChannels(guildId: string) {
    const guild = await this.getServer(guildId)
    if (!guild) {
      throw new Error(`[${this.config.name}] Could not fetch guild with id ${guildId}`)
    }

    return guild.channels.fetch().then((res) => res.map((channel) => channel as NonThreadGuildBasedChannel))
  }

  private async getEachMember(guild: Guild): Promise<GuildMember[]> {
    const limit = 1000
    const result: GuildMember[] = []
    let after: string | undefined
    let batches = 0
    let count = 0
    let done = false

    while (!done) {
      const members = await guild.members.list({ limit, after })

      if (members.size === 0) {
        done = true
        break
      }

      batches++
      result.push(...members.values())
      after = members.last()?.id
      count += members.size
    }

    this.logger.verbose(
      `[${this.config.name}] getEachMember(${guild.name}): found ${count} members in ${batches} batches`,
    )

    return result
  }

  async getMembers(serverId: string): Promise<RESTDiscordMember[]> {
    const server = await this.getServer(serverId)
    const members = await server?.members.fetch()
    const summary =
      members?.map((members) => ({
        id: members.id,
        providerId: members.user.id,
        username: members.user.username,
      })) ?? []

    return summary.sort((a, b) => b.username.localeCompare(a.username))
  }

  async getRoleConnections(): Promise<RESTDiscordRoleConnection[]> {
    const roles = await this.rest?.get(`/applications/${this.config.botId}/role-connections/metadata`)

    return (roles ?? []) as RESTDiscordRoleConnection[]
  }

  async getRole(serverId: string, roleId: string): Promise<RESTDiscordRole | undefined> {
    return this.getRoles(serverId).then((roles) => roles.find((role) => role.id === roleId))
  }

  async getRoles(serverId: string): Promise<RESTDiscordRole[]> {
    const server = await this.getServer(serverId)
    const roles = await server?.roles.fetch()
    const summary =
      roles?.map((role) => ({
        id: role.id,
        name: role.name,
        color: role.color,
        managed: role.managed,
        position: role.position,
      })) ?? []

    return summary.sort((a, b) => b.position - a.position)
  }

  async getServer(serverId: string) {
    return await this.client?.guilds.fetch({ guild: serverId })
  }

  async leaveServer(serverId: string) {
    const server = await this.client?.guilds.fetch({ guild: serverId })
    if (!server) {
      throw new Error(`[${this.config.name}] Server ${serverId} not found`)
    }

    const result = await server.leave()
    this.logger.verbose(`[${this.config.name}] Bot ${this.client?.user?.username} left server ${result.name}`)
    return true
  }

  async sendChannel(channelId: string, content: string | MessageCreateOptions) {
    const channel = this.ensureDiscordServerChannel(channelId)
    if (channel.isTextBased()) {
      if (typeof content == 'string') {
        await channel.send({ content })
      } else {
        await channel.send(content)
      }
    } else {
      throw new Error(`[${this.config.name}] Channel not text based`)
    }
  }

  ensureDiscordServerChannel(channelId: string) {
    const found = this.client?.channels.cache.get(channelId)

    if (!found) {
      throw new Error(`[${this.config.name}] Channel not found`)
    }
    return found
  }

  async removeRoleConnection(key: string): Promise<RESTDiscordRoleConnection[]> {
    const existing = await this.getRoleConnections()

    const found = existing.find((item) => item.key === key)
    if (!found) {
      throw new Error(`[${this.config.name}] Role ${key} not found`)
    }

    const roles = await this.rest
      ?.put(`/applications/${this.config.botId}/role-connections/metadata`, {
        body: existing.filter((item) => item.key !== key),
      })
      .catch(() => {
        throw new Error(`Error removing role ${key}`)
      })

    return (roles ?? []) as RESTDiscordRoleConnection[]
  }

  async getUser(providerId: string): Promise<User | null> {
    return this.client?.users?.fetch(providerId, { force: true }) ?? null
  }
}

export interface BotApplication {
  redirect_uris: string[]
  role_connections_verification_url: string
}
