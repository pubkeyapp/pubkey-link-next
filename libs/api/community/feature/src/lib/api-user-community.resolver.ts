import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { ApiAuthGraphQLUserGuard, CtxUser, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiCommunityService,
  Community,
  CommunityPaging,
  UserCreateCommunityInput,
  UserFindManyCommunityInput,
  UserUpdateCommunityInput,
} from '@pubkey-link/api-community-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Community, { nullable: true })
  userCreateCommunity(@CtxUserId() actorId: string, @Args('input') input: UserCreateCommunityInput) {
    return this.service.user.createCommunity(actorId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteCommunity(@CtxUserId() actorId: string, @Args('communityId') communityId: string) {
    return this.service.user.deleteCommunity(actorId, communityId)
  }

  @Query(() => [Community])
  userGetCommunities(@CtxUser() actor: User, @Args('username') username: string) {
    return this.service.user.getCommunities(actor, username)
  }

  @Query(() => CommunityPaging)
  userFindManyCommunity(@Args('input') input: UserFindManyCommunityInput) {
    return this.service.user.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  userFindOneCommunity(@Args('communityId') communityId: string) {
    return this.service.user.findOneCommunity(communityId)
  }

  @Mutation(() => Community, { nullable: true })
  userUpdateCommunity(
    @CtxUserId() actorId: string,
    @Args('communityId') communityId: string,
    @Args('input') input: UserUpdateCommunityInput,
  ) {
    return this.service.user.updateCommunity(actorId, communityId, input)
  }
}
