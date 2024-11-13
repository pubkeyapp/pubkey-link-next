import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { UserPaging } from './entity/user.entity'

@Injectable()
export class ApiUserDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Omit<Prisma.UserUncheckedCreateInput, 'private'>) {
    return this.core.data.user.create({ data: { ...input, private: this.core.config.featurePrivateProfiles } })
  }

  async delete(userId: string) {
    await this.findOne(userId)
    const deleted = await this.core.data.user.delete({ where: { id: userId } })
    return !!deleted
  }

  async findMany({ limit = 10, page = 1, ...input }: Prisma.UserFindManyArgs & PagingInputFields): Promise<UserPaging> {
    return this.core.data.user
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(userId: string) {
    const found = await this.core.data.user.findUnique({ where: { id: userId } })
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async findOneByUsername(username: string) {
    const found = await this.core.data.user.findUnique({
      where: { username },
      include: {
        identities: {
          orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
          select: {
            id: true,
            name: true,
            profile: true,
            provider: true,
            providerId: true,
            verified: true,
          },
        },
      },
    })
    if (!found) {
      throw new Error(`User ${username} not found`)
    }
    return found
  }

  async update(userId: string, input: Prisma.UserUpdateInput) {
    return this.core.data.user.update({ where: { id: userId }, data: input })
  }

  async ensureUsername(username: string): Promise<boolean> {
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (exists) {
      throw new Error(`User ${username} already exists`)
    }
    return true
  }
}
