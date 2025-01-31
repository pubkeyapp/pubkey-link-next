import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkClusterService } from './api-network-cluster.service'
import { ApiNetworkDataAdminService } from './api-network-data-admin.service'
import { ApiNetworkDataService } from './api-network-data.service'
import { ApiNetworkService } from './api-network.service'
import { ApiNetworkProvisionService } from './provision/api-network-provision.service'
import { ApiNetworkResolverSolanaFungibleService } from './resolver/api-network-resolver-solana-fungible.service'
import { ApiNetworkResolverSolanaNonFungibleService } from './resolver/api-network-resolver-solana-non-fungible.service'
import { ApiNetworkResolverService } from './resolver/api-network-resolver.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiNetworkClusterService,
    ApiNetworkDataAdminService,
    ApiNetworkDataService,
    ApiNetworkProvisionService,
    ApiNetworkResolverService,
    ApiNetworkResolverSolanaFungibleService,
    ApiNetworkResolverSolanaNonFungibleService,
    ApiNetworkService,
  ],
  exports: [ApiNetworkService],
})
export class ApiNetworkDataAccessModule {}
