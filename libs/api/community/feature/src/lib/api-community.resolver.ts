import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { CtxUserId } from '@pubkey-link/api-auth-data-access'
import { ApiCommunityService, Community } from '@pubkey-link/api-community-data-access'
import { CommunityMember } from '@pubkey-link/api-community-member-data-access'
import { Role } from '@pubkey-link/api-role-data-access'

@Resolver(() => Community)
export class ApiCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @ResolveField(() => [Role])
  roles(@Parent() community: Community) {
    return community.roles ?? []
  }

  @ResolveField(() => CommunityMember, { nullable: true })
  membership(@CtxUserId() userId: string, @Parent() community: Community) {
    return community.members?.find((member) => member.userId === userId) ?? null
  }

  @ResolveField(() => String)
  viewUrl(@Parent() community: Community) {
    return `/c/${community.id}`
  }
}
