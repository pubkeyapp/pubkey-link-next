import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@pubkey-link/api-auth-data-access'
import { ApiBotDataAccessModule } from '@pubkey-link/api-bot-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetDataAccessModule } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiIdentityDataAdminService } from './api-identity-data-admin.service'
import { ApiIdentityDataAnonService } from './api-identity-data-anon.service'
import { ApiIdentityDataUserService } from './api-identity-data-user.service'
import { ApiIdentitySolanaService } from './api-identity-solana.service'
import { ApiIdentityService } from './api-identity.service'

@Module({
  imports: [
    ApiAuthDataAccessModule,
    ApiBotDataAccessModule,
    ApiNetworkDataAccessModule,
    ApiCoreDataAccessModule,
    ApiNetworkAssetDataAccessModule,
  ],
  providers: [
    ApiIdentityDataAdminService,
    ApiIdentityDataAnonService,
    ApiIdentityService,
    ApiIdentitySolanaService,
    ApiIdentityDataUserService,
  ],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
