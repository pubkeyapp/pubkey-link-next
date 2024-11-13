import { type DynamicModule, Logger, Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiUserDataAccessModule } from '@pubkey-link/api-user-data-access'
import { ApiAuthStrategyService } from '../api-auth-strategy.service'
import { ApiAuthStrategyDiscord } from './api-auth-strategy-discord'

@Module({})
export class ApiAuthStrategyDiscordModule {
  static logger = new Logger(ApiAuthStrategyDiscordModule.name)
  static register(): DynamicModule {
    const enabled = this.enabled
    if (!enabled) {
      this.logger.warn(`Discord Auth DISABLED`)
      return { module: ApiAuthStrategyDiscordModule }
    }
    return {
      module: ApiAuthStrategyDiscordModule,
      imports: [ApiCoreDataAccessModule, ApiUserDataAccessModule],
      providers: [ApiAuthStrategyDiscord, ApiAuthStrategyService],
    }
  }

  // TODO: These should be coming from the ApiCoreConfigService instead of process.env
  private static get enabled(): boolean {
    return (
      // Discord auth needs to be enabled
      (!!process.env['AUTH_DISCORD_LINK_ENABLED'] || !!process.env['AUTH_DISCORD_LOGIN_ENABLED']) &&
      // And we need to have the client ID and secret set
      !!process.env['AUTH_DISCORD_CLIENT_ID'] &&
      !!process.env['AUTH_DISCORD_CLIENT_SECRET']
    )
  }
}
