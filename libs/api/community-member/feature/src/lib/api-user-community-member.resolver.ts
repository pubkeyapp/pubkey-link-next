import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUser, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  ApiCommunityMemberService,
  CommunityMember,
  CommunityMemberPaging,
  UserAddCommunityMemberInput,
  UserFindManyCommunityMemberInput,
  UserUpdateCommunityMemberInput,
} from '@pubkey-link/api-community-member-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}

  @Mutation(() => CommunityMember, { nullable: true })
  userAddCommunityMember(
    @CtxUser() user: User,
    @Args('communityId') communityId: string,
    @Args('input') input: UserAddCommunityMemberInput,
  ) {
    return this.service.user.addCommunityMember(user, communityId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userRemoveCommunityMember(@CtxUser() user: User, @Args('communityMemberId') communityMemberId: string) {
    return this.service.user.removeCommunityMember(user, communityMemberId)
  }

  @Query(() => CommunityMember, { nullable: true })
  userGetCommunityMember(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.user.getCommunityMember({ communityId, userId })
  }

  @Query(() => CommunityMemberPaging)
  userFindManyCommunityMember(@CtxUserId() userId: string, @Args('input') input: UserFindManyCommunityMemberInput) {
    return this.service.user.findManyCommunityMember(userId, input)
  }

  @Query(() => CommunityMember, { nullable: true })
  userFindOneCommunityMember(@CtxUserId() userId: string, @Args('communityMemberId') communityMemberId: string) {
    return this.service.user.findOneCommunityMember(userId, communityMemberId)
  }

  @Mutation(() => CommunityMember, { nullable: true })
  userUpdateCommunityMember(
    @CtxUser() user: User,
    @Args('communityMemberId') communityMemberId: string,
    @Args('input') input: UserUpdateCommunityMemberInput,
  ) {
    return this.service.user.updateCommunityMember(user, communityMemberId, input)
  }
}
