import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { LogLevel, Prisma, UserStatus } from '@prisma/client'
import { ApiCoreService, EVENT_APP_STARTED, slugifyUsername } from '@pubkey-link/api-core-data-access'
import { ApiUserDataService } from '../api-user-data.service'
import { provisionUsers } from './api-user-provision-data'

@Injectable()
export class ApiUserProvisionService {
  private readonly logger = new Logger(ApiUserProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiUserDataService) {}

  @OnEvent(EVENT_APP_STARTED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await this.provisionUsers()
      this.logger.verbose(`Provisioned users`)
    }
  }

  private async provisionUsers() {
    await Promise.all(provisionUsers.map((user) => this.provisionUser(user)))
  }

  private async provisionUser(input: Prisma.UserCreateInput) {
    const username = slugifyUsername(input.username)
    const existing = await this.core.data.user.count({ where: { username } })
    if (existing < 1) {
      const identities = (input.identities?.create as Prisma.IdentityCreateInput[]) ?? []
      await this.data.create({
        ...input,
        id: username,
        status: input.status ?? UserStatus.Active,
        logs: {
          create: [
            {
              message: `Provisioned ${input.role} ${input.username} with ${identities?.length} identities`,
              level: LogLevel.Info,
            },
            ...(identities.length
              ? [
                  ...identities.map((identity) => ({
                    message: `Provisioned ${identity.provider} identity ${identity.providerId}`,
                    level: LogLevel.Info,
                    identityProvider: identity.provider,
                    identityProviderId: identity.providerId,
                  })),
                ]
              : []),
          ],
        },
      })
      this.logger.verbose(`Provisioned ${input.role} ${input.username} with ${identities.length} identities`)
      return
    }
  }
}
