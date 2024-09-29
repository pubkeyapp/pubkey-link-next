import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-link/api-auth-data-access'
import {
  AdminFindManyUserInput,
  AdminUpdateUserInput,
  ApiUserService,
  User,
  UserPaging,
} from '@pubkey-link/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminUserResolver {
  constructor(private readonly service: ApiUserService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteUser(@Args('userId') userId: string) {
    return this.service.admin.deleteUser(userId)
  }

  @Query(() => UserPaging)
  adminFindManyUser(@Args('input') input: AdminFindManyUserInput) {
    return this.service.admin.findManyUser(input)
  }

  @Query(() => User, { nullable: true })
  adminFindOneUser(@Args('userId') userId: string) {
    return this.service.admin.findOneUser(userId)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@Args('userId') userId: string, @Args('input') input: AdminUpdateUserInput) {
    return this.service.admin.updateUser(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminVerifyUser(@Args('userId') userId: string) {
    return this.service.admin.verifyUser(userId)
  }
}
