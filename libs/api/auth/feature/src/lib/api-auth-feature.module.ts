import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@pubkey-link/api-auth-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiUserDataAccessModule } from '@pubkey-link/api-user-data-access'
import { ApiAuthStrategyDiscordController } from './api-auth-strategy-discord.controller'
import { ApiAuthStrategyTelegramController } from './api-auth-strategy-telegram.controller'
import { ApiAuthController } from './api-auth.controller'
import { ApiAuthResolver } from './api-auth.resolver'
import { ApiAuthStrategyService } from '@pubkey-link/api-auth-data-access'

@Module({
  controllers: [ApiAuthController, ApiAuthStrategyDiscordController, ApiAuthStrategyTelegramController],
  imports: [
    ApiAuthDataAccessModule,
    ApiCoreDataAccessModule,
    ApiUserDataAccessModule,
  ],
  providers: [ApiAuthResolver, ApiAuthStrategyService],
})
export class ApiAuthFeatureModule {}
