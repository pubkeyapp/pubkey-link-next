import { Injectable, Logger } from '@nestjs/common'
import { Identity, IdentityProvider, LogLevel, Prisma, UserRole, UserStatus } from '@prisma/client'
import { ApiCoreService, getRandomString } from '@pubkey-link/api-core-data-access'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'

@Injectable()
export class ApiBackupService {
  private readonly logger = new Logger(ApiBackupService.name)
  private readonly backupLocation: string
  constructor(private readonly core: ApiCoreService) {
    this.backupLocation = process.env['BACKUP_LOCATION'] || '/tmp'
  }

  async createBackup() {
    if (!existsSync(this.backupLocation)) {
      try {
        await mkdir(this.backupLocation)
        this.logger.verbose(`Created backup directory at ${this.backupLocation}`)
      } catch (error) {
        this.logger.error(`Failed to create backup directory: ${error}`)
        return false
      }
    }

    // Generate a secret that will be used to download the backup
    const { secret, timestamp, backupName, backupPath } = getBackupMetadata(this.backupLocation)

    this.logger.verbose(`Backup created at ${backupPath}`)

    const users = await this.core.data.user.findMany({
      where: {},
      orderBy: { username: 'asc' },
      select: {
        username: true,
        name: true,
        avatarUrl: true,
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        identities: {
          select: {
            id: true,
            provider: true,
            providerId: true,
            profile: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    })

    await writeFile(
      backupPath,
      JSON.stringify(
        {
          meta: { secret, timestamp, backupName, backupPath },
          data: { users, usersCount: users.length },
        },
        null,
        2,
      ),
    )
    return true
  }

  async deleteBackup(name: string) {
    const file = this.getBackupPath(name)
    if (!existsSync(file)) {
      return false
    }
    try {
      await rm(file)
      this.logger.verbose(`Deleted backup at ${file}`)
      return true
    } catch (error) {
      this.logger.error(`Failed to delete backup: ${error}`)
      return false
    }
  }

  async fetchBackup(url: string) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch backup: ${response.statusText}`)
    }
    const backup = await response.json()
    const backupPath = `${this.backupLocation}/${backup.meta.backupName}`
    if (existsSync(backupPath)) {
      throw new Error(`Backup already exists`)
    }
    await writeFile(backupPath, JSON.stringify(backup))
    this.logger.verbose(`Backup fetched at ${backupPath}`)
    return true
  }

  async adminGetBackup(name: string) {
    // Parse the json file
    const backup = await this.readBackupFile(name)

    return {
      meta: backup.meta,
      usersCount: backup.data.usersCount,
      download: this.core.config.apiUrl + `/backup/download?name=${name}&secret=${backup.meta.secret}`,
    }
  }

  async adminGetBackups(): Promise<string[]> {
    if (!existsSync(this.backupLocation)) {
      return []
    }
    const items = await readdir(this.backupLocation)

    return items.filter((item) => item.endsWith('.backup.json'))
  }

  async restoreBackup(name: string) {
    const backup = await this.readBackupFile(name)
    const backupUsers: BackupUser[] = backup.data.users ?? []

    const [existingUsernames, existingUserIds, existingUserIdentities] = await Promise.all([
      this.core.data.user.findMany({ select: { username: true } }).then((users) => users.map((user) => user.username)),
      this.core.data.user.findMany({ select: { id: true } }).then((users) => users.map((user) => user.id)),
      this.core.data.identity.findMany().then((res) => res ?? ([] as Identity[])),
    ])

    const toCreate = backupUsers.filter((backupUser: BackupUser) => {
      // Check if one of the identities of this user already exists
      const found = existingUserIdentities.some((identity) =>
        backupUser.identities.some(
          ({ provider, providerId }) => providerId === identity.providerId && provider === identity.provider,
        ),
      )
      if (found) {
        this.logger.warn(`One of the identities already exists for user ${backupUser.username}`)
        return false
      }
      // Check if the user id or username already exists
      return !existingUserIds.includes(backupUser.id) && !existingUsernames.includes(backupUser.username)
    })
    if (!toCreate.length) {
      this.logger.verbose(`No new users to create`)
      return true
    }
    for (const user of toCreate) {
      const { identities, ...userData } = user
      try {
        const discordIdentity = identities.find((identity) => identity.provider === IdentityProvider.Discord)
        const avatarUrl = (discordIdentity?.profile as { avatarUrl?: string })?.avatarUrl
        const newUser = await this.core.data.user.create({
          data: {
            ...restoreUserFields(userData),
            avatarUrl,
            private: this.core.config.featurePrivateProfiles,
            identities: { create: identities.map(restoreIdentityFields) },
            logs: {
              create: [
                {
                  message: `Restored ${user.username} with ${identities?.length} identities`,
                  level: LogLevel.Info,
                },
                ...(identities.length
                  ? [
                      ...identities.map((identity) => ({
                        message: `Restored ${identity.provider} identity ${identity.providerId}`,
                        level: LogLevel.Info,
                        identityProvider: identity.provider,
                        identityProviderId: identity.providerId,
                      })),
                    ]
                  : []),
              ],
            },
          },
        })
        this.logger.verbose(
          `Created user ${newUser.username} with id ${newUser.id} and ${identities.length} identities`,
        )
      } catch (error) {
        this.logger.error(`Failed to create user ${user.username}: ${error}`)
      }
    }
    return true
  }

  private async readBackupFile(name: string) {
    const backupPath = this.ensureBackupFile(name)
    // Read the json file
    const contents = await readFile(backupPath, 'utf-8')
    // Parse the json file
    return JSON.parse(contents)
  }

  private ensureBackupFile(name: string) {
    const backupPath = this.getBackupPath(name)
    if (!existsSync(backupPath)) {
      throw new Error('Backup file does not exist')
    }

    return backupPath
  }

  private getBackupPath(name: string) {
    if (!isValidFilename(name)) {
      throw new Error('Invalid filename')
    }

    return `${this.backupLocation}/${name}`
  }

  async downloadBackup(name: string, secret: string) {
    const backup = await this.readBackupFile(name)

    if (backup.meta.secret !== secret) {
      throw new Error('Invalid secret')
    }

    return backup
  }
}

function isValidFilename(filename: string) {
  // Regular expression for the date-time format
  const regexPattern = /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z.backup.json$/

  // Check if the filename matches the pattern
  if (!regexPattern.test(filename)) {
    return false
  }

  // Check for common path traversal patterns
  return !/(\.\.\/|\.\.\\)/.test(filename)
}

function getBackupTimestamp() {
  return new Date().toISOString().replace(/:/g, '-').replace(/\./, '-')
}

function getBackupMetadata(backupLocation: string) {
  const secret = getRandomString(21)
  const timestamp = getBackupTimestamp()
  const backupName = `${timestamp}${'.backup.json'}`
  const backupPath = `${backupLocation}/${backupName}`

  return { secret, timestamp, backupName, backupPath }
}

type BackupUser = { id: string; username: string; identities: Prisma.IdentityCreateInput[] }

function restoreUserFields(item: Record<string, string>): Prisma.UserCreateInput {
  return {
    id: item['id'] ?? undefined,
    username: item['username'],
    name: item['name'] ?? undefined,
    avatarUrl: item['avatarUrl'] ?? undefined,
    createdAt: item['createdAt'] ?? undefined,
    updatedAt: item['updatedAt'] ?? undefined,
    role: UserRole.User,
    status: (item['status'] ? item['status'] : UserStatus.Active) as UserStatus,
  }
}

function restoreIdentityFields(item: Prisma.IdentityCreateInput): Prisma.IdentityCreateWithoutOwnerInput {
  return {
    name: item['name'] ?? item['providerId'],
    profile: item['profile'] ?? undefined,
    id: item['id'] ?? undefined,
    createdAt: item['createdAt'] ?? undefined,
    updatedAt: item['updatedAt'] ?? undefined,
    syncEnded: item['syncEnded'] ?? undefined,
    verified: item['verified'] ? Boolean(item['verified']) : undefined,
    provider: item['provider'],
    providerId: item['providerId'],
  }
}
