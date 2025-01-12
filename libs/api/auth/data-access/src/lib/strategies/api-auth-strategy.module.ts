import { type DynamicModule, Module } from '@nestjs/common'
import { ApiAuthStrategyTelegramModule } from './api-auth-strategy-telegram.module'

import { ApiAuthStrategyDiscordModule } from './oauth/api-auth-strategy-discord.module'

@Module({})
export class ApiAuthStrategyModule {
  static register(): DynamicModule {
    return {
      module: ApiAuthStrategyModule,
      imports: [ApiAuthStrategyDiscordModule.register(), ApiAuthStrategyTelegramModule.register()],
      exports: [ApiAuthStrategyTelegramModule],
    }
  }
}
