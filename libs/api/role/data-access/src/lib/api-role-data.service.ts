import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'

import { RolePaging } from './entity/role.entity'

@Injectable()
export class ApiRoleDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(userId: string, input: Prisma.RoleUncheckedCreateInput) {
    const created = await this.core.data.role.create({ data: input })
    await this.core.logInfo(`[${created.name}] Role created`, {
      roleId: created.id,
      communityId: created.communityId,
      userId,
    })
    return created
  }

  async delete(userId: string, roleId: string) {
    await this.findOne(roleId)
    const deleted = await this.core.data.role.delete({ where: { id: roleId } })
    await this.core.logInfo(`[${roleId}] Role deleted`, { communityId: deleted.communityId, userId })
    return !!deleted
  }

  async findMany({ limit = 10, page = 1, ...input }: Prisma.RoleFindManyArgs & PagingInputFields): Promise<RolePaging> {
    return this.core.data.role
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(roleId: string) {
    const found = await this.core.data.role.findUnique({
      where: { id: roleId },
      include: {
        conditions: { include: { token: true }, orderBy: { createdAt: 'asc' } },
        community: true,
        permissions: { include: { botRole: true } },
      },
    })
    if (!found) {
      throw new Error(`Role ${roleId} not found`)
    }
    return found
  }

  async update(roleId: string, input: Prisma.RoleUpdateInput) {
    return this.core.data.role.update({ where: { id: roleId }, data: input })
  }

  async ensureRoleAdmin({ userId, roleId }: { userId: string; roleId: string }) {
    const { role, communityRole } = await this.ensureRoleAccess({ userId, roleId })
    if (!communityRole.admin) {
      throw new Error('User is not an admin')
    }
    return { role, communityRole }
  }

  async ensureRoleAccess({ userId, roleId }: { userId: string; roleId: string }) {
    const role = await this.findOne(roleId)

    const communityRole = await this.core.ensureCommunityMember({ communityId: role.communityId, userId })

    return { role, communityRole }
  }
}
