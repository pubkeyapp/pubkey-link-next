import { Injectable } from '@nestjs/common'
import { ApiRoleDataService } from './api-role-data.service'
import { AdminCreateRoleInput } from './dto/admin-create-role.input'
import { AdminFindManyRoleInput } from './dto/admin-find-many-role.input'
import { AdminUpdateRoleInput } from './dto/admin-update-role.input'
import { RolePaging } from './entity/role.entity'
import { getRoleWhereAdminInput } from './helpers/get-role-where-admin.input'

@Injectable()
export class ApiRoleDataAdminService {
  constructor(private readonly data: ApiRoleDataService) {}

  async createRole(userId: string, input: AdminCreateRoleInput) {
    return this.data.create(userId, input)
  }

  async deleteRole(userId: string, roleId: string) {
    return this.data.delete(userId, roleId)
  }

  async findManyRole(input: AdminFindManyRoleInput): Promise<RolePaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getRoleWhereAdminInput(input),
      include: { conditions: { include: { token: true } } },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneRole(roleId: string) {
    return this.data.findOne(roleId)
  }

  async updateRole(roleId: string, input: AdminUpdateRoleInput) {
    return this.data.update(roleId, input)
  }
}
