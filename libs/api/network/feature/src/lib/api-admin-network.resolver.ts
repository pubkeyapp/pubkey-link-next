import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminCreateNetworkInput,
  AdminFindManyNetworkInput,
  AdminUpdateNetworkInput,
  ApiNetworkService,
  Network,
  NetworkPaging,
} from '@pubkey-link/api-network-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminNetworkResolver {
  constructor(private readonly service: ApiNetworkService) {}

  @Mutation(() => Network, { nullable: true })
  adminCreateNetwork(@Args('input') input: AdminCreateNetworkInput) {
    return this.service.admin.createNetwork(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteNetwork(@Args('networkId') networkId: string) {
    return this.service.admin.deleteNetwork(networkId)
  }

  @Query(() => [String])
  adminGetVoteAccounts(@Args('networkId') networkId: string) {
    return this.service.admin.getVoteAccounts(networkId)
  }

  @Query(() => NetworkPaging)
  adminFindManyNetwork(@Args('input') input: AdminFindManyNetworkInput) {
    return this.service.admin.findManyNetwork(input)
  }

  @Query(() => Network, { nullable: true })
  adminFindOneNetwork(@Args('networkId') networkId: string) {
    return this.service.admin.findOneNetwork(networkId)
  }

  @Mutation(() => Network, { nullable: true })
  adminUpdateNetwork(@Args('networkId') networkId: string, @Args('input') input: AdminUpdateNetworkInput) {
    return this.service.admin.updateNetwork(networkId, input)
  }
}
