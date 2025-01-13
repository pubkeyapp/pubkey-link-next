import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ApiCoreDataAccessModule, ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiAuthService } from './api-auth.service'
import { ApiAuthGraphQLUserGuard } from './guards/api-auth-graphql-user-guard'
import { ApiAuthStrategyJwt } from './strategies/api-auth-strategy-jwt'
import { ApiAuthStrategyModule } from './strategies/api-auth-strategy.module'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    JwtModule.registerAsync({
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: (core: ApiCoreService) => ({
        global: true,
        secret: core.config.jwtSecret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
    PassportModule,
    ApiAuthStrategyModule.register(),
  ],
  providers: [ApiAuthGraphQLUserGuard, ApiAuthStrategyJwt, ApiAuthService],
  exports: [ApiAuthService, ApiAuthStrategyModule],
})
export class ApiAuthDataAccessModule {}
