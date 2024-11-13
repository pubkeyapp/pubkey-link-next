import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'
import { slugifyId } from '@pubkey-link/api-core-data-access'
import { ApiUserDataService } from './api-user-data.service'
import { AdminFindManyUserInput } from './dto/admin-find-many-user.input'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'
import { UserPaging } from './entity/user.entity'
import { getUserWhereAdminInput } from './helpers/get-user-where-admin.input'

@Injectable()
export class ApiUserDataAdminService {
  private readonly logger = new Logger(ApiUserDataAdminService.name)
  constructor(private readonly data: ApiUserDataService) {}

  async deleteUser(userId: string): Promise<boolean> {
    return this.data.delete(userId)
  }

  async findManyUser(input: AdminFindManyUserInput): Promise<UserPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getUserWhereAdminInput(input),
      include: { identities: { orderBy: [{ provider: 'asc' }, { providerId: 'asc' }] } },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneUser(userId: string): Promise<PrismaUser> {
    return this.data.findOne(userId)
  }

  async updateUser(userId: string, input: AdminUpdateUserInput): Promise<PrismaUser> {
    const exists = await this.findOneUser(userId)

    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    const newUsername = input.username ? slugifyId(input.username) : undefined
    if (newUsername && newUsername !== slugifyId(exists.username)) {
      await this.data.ensureUsername(newUsername)
      this.logger.verbose(`Updating username ${userId} to ${newUsername}`)
    }
    return this.data.update(userId, {
      ...input,
      username: newUsername,
    })
  }

  async verifyUser(userId: string) {
    return this.data.verify(userId)
  }
}
