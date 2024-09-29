import { Injectable } from '@nestjs/common'
import { IdentityProvider, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiBotDataAdminService } from './api-bot-data-admin.service'
import { ApiBotDataUserService } from './api-bot-data-user.service'
import { ApiBotInstancesService } from './api-bot-instances.service'

@Injectable()
export class ApiBotService {
  constructor(
    readonly core: ApiCoreService,
    readonly admin: ApiBotDataAdminService,
    readonly instances: ApiBotInstancesService,
    readonly user: ApiBotDataUserService,
  ) {}

  async syncDiscordIdentity({ providerId }: { providerId: string }) {
    const bot = await this.instances.getDefaultBotInstance()
    const user = await bot.getUser(providerId)

    if (!user) {
      throw new Error(`Can't find discord user with id ${providerId}`)
    }

    const identity = await this.core.data.identity.findFirst({
      where: {
        provider: IdentityProvider.Discord,
        providerId,
      },
    })

    if (!identity) {
      throw new Error(`Can't find discord identity for id ${providerId}`)
    }
    await this.core.data.identity.update({
      where: { id: identity.id },
      data: {
        name: user.username,
        profile: user.toJSON() as Prisma.InputJsonValue,
        owner: { update: { avatarUrl: user?.avatarURL()?.toString() } },
      },
    })
    return true
  }
}
