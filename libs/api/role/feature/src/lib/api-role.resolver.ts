import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { CommunityMember } from '@pubkey-link/api-community-member-data-access'
import { ApiRoleService, Role } from '@pubkey-link/api-role-data-access'

@Resolver(() => Role)
export class ApiRoleResolver {
  constructor(private readonly service: ApiRoleService) {}

  @ResolveField(() => CommunityMember, { nullable: true })
  member(@Parent() role: Role) {
    return role.members?.length ? role.members[0].member : null
  }

  @ResolveField(() => String, { nullable: true })
  viewUrl(@Parent() role: Role) {
    return `/c/${role.communityId}/roles/${role.id}`
  }
}
