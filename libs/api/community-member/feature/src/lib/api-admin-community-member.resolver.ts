import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard, CtxUser } from '@pubkey-link/api-auth-data-access'
import {
  AdminAddCommunityMemberInput,
  AdminFindManyCommunityMemberInput,
  AdminUpdateCommunityMemberInput,
  ApiCommunityMemberService,
  CommunityMember,
  CommunityMemberPaging,
} from '@pubkey-link/api-community-member-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminCommunityMemberResolver {
  constructor(private readonly service: ApiCommunityMemberService) {}

  @Mutation(() => CommunityMember, { nullable: true })
  adminAddCommunityMember(
    @CtxUser() user: User,
    @Args('communityId') communityId: string,
    @Args('input') input: AdminAddCommunityMemberInput,
  ) {
    return this.service.admin.addCommunityMember(user, communityId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveCommunityMember(@CtxUser() user: User, @Args('communityMemberId') communityMemberId: string) {
    return this.service.admin.removeCommunityMember(user, communityMemberId)
  }

  @Query(() => CommunityMemberPaging)
  adminFindManyCommunityMember(@Args('input') input: AdminFindManyCommunityMemberInput) {
    return this.service.admin.findManyCommunityMember(input)
  }

  @Query(() => CommunityMember, { nullable: true })
  adminFindOneCommunityMember(@Args('communityMemberId') communityMemberId: string) {
    return this.service.admin.findOneCommunityMember(communityMemberId)
  }

  @Mutation(() => CommunityMember, { nullable: true })
  adminUpdateCommunityMember(
    @CtxUser() user: User,
    @Args('communityMemberId') communityMemberId: string,
    @Args('input') input: AdminUpdateCommunityMemberInput,
  ) {
    return this.service.admin.updateCommunityMember(user, communityMemberId, input)
  }
}
