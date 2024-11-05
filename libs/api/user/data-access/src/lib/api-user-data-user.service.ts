import { Injectable, Logger } from '@nestjs/common'
import { ApiUserDataService } from './api-user-data.service'
import { UserFindManyUserInput } from './dto/user-find-many-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserPaging } from './entity/user.entity'
import { getUserWhereUserInput } from './helpers/get-user-where-user.input'

@Injectable()
export class ApiUserDataUserService {
  private readonly logger = new Logger(ApiUserDataUserService.name)
  constructor(private readonly data: ApiUserDataService) {}

  async findManyUser(input: UserFindManyUserInput): Promise<UserPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getUserWhereUserInput(input),
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
      limit: input.limit,
      page: input.page,
    })
  }

  async updateUser(userId: string, input: UserUpdateUserInput) {
    return this.data.update(userId, input)
  }

  async findOneUser(username: string) {
    return this.data.findOneByUsername(username)
  }

  async findOneUserId(userId: string) {
    return this.data.findOne(userId)
  }
}
