import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'
import {
  AdminCreateIdentityInput,
  AdminFindManyIdentityInput,
  ApiIdentityService,
  Identity,
} from '@pubkey-link/api-identity-data-access'
import { User } from '@pubkey-link/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminIdentityResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Identity, { nullable: true })
  adminCreateIdentity(@Args('input') input: AdminCreateIdentityInput) {
    return this.service.admin.createIdentity(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIdentity(@Args('identityId') identityId: string) {
    return this.service.admin.deleteIdentity(identityId)
  }

  @Query(() => [Identity], { nullable: true })
  adminFindManyIdentity(@Args('input') input: AdminFindManyIdentityInput) {
    return this.service.admin.findManyIdentity(input)
  }

  @Query(() => User, { nullable: true })
  adminFindUserByIdentity(
    @Args({ name: 'provider', type: () => IdentityProvider }) provider: IdentityProvider,
    @Args('providerId') providerId: string,
  ) {
    return this.service.admin.findUserByIdentity(provider, providerId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminSetIdentityVerified(@Args('identityId') identityId: string, @Args('verified') verified: boolean) {
    return this.service.admin.setIdentityVerified(identityId, verified)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminSyncIdentity(@Args('identityId') identityId: string) {
    return this.service.admin.syncIdentity(identityId)
  }
}
