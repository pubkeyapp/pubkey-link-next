import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard, CtxUserId } from '@pubkey-link/api-auth-data-access'
import {
  AdminCreateRoleInput,
  AdminFindManyRoleInput,
  AdminUpdateRoleInput,
  ApiRoleService,
  Role,
  RolePaging,
} from '@pubkey-link/api-role-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminRoleResolver {
  constructor(private readonly service: ApiRoleService) {}

  @Mutation(() => Role, { nullable: true })
  adminCreateRole(@CtxUserId() userId: string, @Args('input') input: AdminCreateRoleInput) {
    return this.service.admin.createRole(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteRole(@CtxUserId() userId: string, @Args('roleId') roleId: string) {
    return this.service.admin.deleteRole(userId, roleId)
  }

  @Query(() => RolePaging)
  adminFindManyRole(@Args('input') input: AdminFindManyRoleInput) {
    return this.service.admin.findManyRole(input)
  }

  @Query(() => Role, { nullable: true })
  adminFindOneRole(@Args('roleId') roleId: string) {
    return this.service.admin.findOneRole(roleId)
  }

  @Mutation(() => Role, { nullable: true })
  adminUpdateRole(@Args('roleId') roleId: string, @Args('input') input: AdminUpdateRoleInput) {
    return this.service.admin.updateRole(roleId, input)
  }
}
