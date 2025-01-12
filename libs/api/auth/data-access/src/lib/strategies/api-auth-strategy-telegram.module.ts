import { DynamicModule, Logger, Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiUserDataAccessModule } from '@pubkey-link/api-user-data-access'
import { ApiAuthDataAccessModule } from '../api-auth.data-access.module'
import { ApiAuthStrategyTelegramService } from './api-auth-strategy-telegram.service'
import { ApiAuthStrategyService } from './api-auth-strategy.service'

@Module({})
export class ApiAuthStrategyTelegramModule {
  static logger = new Logger(ApiAuthStrategyTelegramModule.name)
  static register(): DynamicModule {
    const enabled = this.enabled
    if (!enabled) {
      this.logger.warn(`Telegram Auth DISABLED`)
    }
    return {
      module: ApiAuthStrategyTelegramModule,
      imports: [ApiCoreDataAccessModule, ApiAuthDataAccessModule, ApiUserDataAccessModule],
      providers: [ApiAuthStrategyTelegramService, ApiAuthStrategyService],
      exports: [ApiAuthStrategyTelegramService],
    }
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  private static get enabled(): boolean {
    return (
      // Telegram auth needs to be enabled
      (!!process.env['AUTH_TELEGRAM_LINK_ENABLED'] || !!process.env['AUTH_TELEGRAM_LOGIN_ENABLED']) &&
      // And we need to have the bot name and token set
      !!process.env['AUTH_TELEGRAM_BOT_NAME'] &&
      !!process.env['AUTH_TELEGRAM_BOT_TOKEN']
    )
  }
}
