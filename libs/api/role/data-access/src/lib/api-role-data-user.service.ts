import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiRoleConditionDataService } from './api-role-condition-data.service'
import { ApiRoleDataService } from './api-role-data.service'
import { ApiRolePermissionDataService } from './api-role-permission-data.service'
import { ApiRoleResolverService } from './api-role-resolver.service'
import { UserCreateRoleConditionInput } from './dto/user-create-role-condition.input'
import { UserCreateRolePermissionInput } from './dto/user-create-role-permission.input'
import { UserCreateRoleInput } from './dto/user-create-role.input'
import { UserFindManyRoleInput } from './dto/user-find-many-role.input'
import { UserUpdateRoleConditionInput } from './dto/user-update-role-condition-input'
import { UserUpdateRoleInput } from './dto/user-update-role.input'
import { RolePaging } from './entity/role.entity'
import { getRoleWhereUserInput } from './helpers/get-role-where-user.input'

@Injectable()
export class ApiRoleDataUserService {
  constructor(
    private readonly core: ApiCoreService,
    private readonly data: ApiRoleDataService,
    private readonly condition: ApiRoleConditionDataService,
    private readonly permission: ApiRolePermissionDataService,
    private readonly resolver: ApiRoleResolverService,
  ) {}

  async createRole(userId: string, input: UserCreateRoleInput) {
    await this.core.ensureCommunityAdmin({ communityId: input.communityId, userId })
    return this.data.create(userId, input)
  }

  async deleteRole(userId: string, roleId: string) {
    await this.data.ensureRoleAdmin({ userId, roleId })
    return this.data.delete(userId, roleId)
  }

  async findManyRole(userId: string, input: UserFindManyRoleInput): Promise<RolePaging> {
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getRoleWhereUserInput(input),
      include: { conditions: { include: { token: true } } },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneRole(userId: string, roleId: string) {
    await this.data.ensureRoleAccess({ roleId, userId })
    return this.data.findOne(roleId)
  }

  async updateRole(userId: string, roleId: string, input: UserUpdateRoleInput) {
    await this.data.ensureRoleAdmin({ userId, roleId })
    return this.data.update(roleId, input)
  }

  async userSyncCommunityRoles(userId: string, communityId: string) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.resolver.syncCommunityRoles(communityId)
  }

  async createRoleCondition(userId: string, input: UserCreateRoleConditionInput) {
    await this.data.ensureRoleAdmin({ userId, roleId: input.roleId })
    return this.condition.create(input)
  }

  async deleteRoleCondition(userId: string, roleConditionId: string) {
    const found = await this.condition.findOne(roleConditionId)
    await this.data.ensureRoleAdmin({ userId, roleId: found.roleId })
    return this.condition.deleteRoleCondition(roleConditionId)
  }

  async updateRoleCondition(userId: string, roleConditionId: string, input: UserUpdateRoleConditionInput) {
    const found = await this.condition.findOne(roleConditionId)
    await this.data.ensureRoleAdmin({ userId, roleId: found.roleId })
    return this.condition.updateRoleCondition(roleConditionId, input)
  }

  async createRolePermission(userId: string, input: UserCreateRolePermissionInput) {
    await this.data.ensureRoleAdmin({ userId, roleId: input.roleId })
    return this.permission.create(input)
  }

  async deleteRolePermission(userId: string, rolePermissionId: string) {
    const found = await this.permission.findOne(rolePermissionId)
    await this.data.ensureRoleAdmin({ userId, roleId: found.roleId })
    return this.permission.delete(rolePermissionId)
  }
}
