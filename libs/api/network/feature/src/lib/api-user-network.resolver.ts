import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import { ApiNetworkService, NetworkCluster } from '@pubkey-link/api-network-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserNetworkResolver {
  constructor(private readonly service: ApiNetworkService) {}

  @Query(() => [NetworkCluster])
  userGetEnabledNetworkClusters() {
    return this.service.getEnabledNetworkClusters()
  }

  @Query(() => GraphQLJSON, { nullable: true })
  userGetTokenAccounts(
    @Args({ name: 'cluster', type: () => NetworkCluster }) cluster: NetworkCluster,
    @Args('account') account: string,
  ) {
    return this.service.getTokenAccounts({
      cluster,
      account,
    })
  }

  @Query(() => GraphQLJSON, { nullable: true })
  userGetTokenMetadata(
    @Args({ name: 'cluster', type: () => NetworkCluster }) cluster: NetworkCluster,
    @Args('account') account: string,
  ) {
    return this.service.getAllTokenMetadata({
      cluster,
      account,
    })
  }
}
