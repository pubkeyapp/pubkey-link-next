import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiCommunityService, Community } from '@pubkey-link/api-community-data-access'
import { Role } from '@pubkey-link/api-role-data-access'

@Resolver(() => Community)
export class ApiCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @ResolveField(() => [Role])
  roles(@Parent() community: Community) {
    return community.roles ?? []
  }
}
