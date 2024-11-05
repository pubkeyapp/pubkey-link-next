import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiCommunityDataService } from './api-community-data.service'
import { UserCreateCommunityInput } from './dto/user-create-community.input'
import { UserFindManyCommunityInput } from './dto/user-find-many-community.input'
import { UserUpdateCommunityInput } from './dto/user-update-community.input'
import { CommunityPaging } from './entity/community.entity'
import { getCommunityWhereUserInput } from './helpers/get-community-where-user.input'

@Injectable()
export class ApiCommunityDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiCommunityDataService) {}

  async createCommunity(userId: string, input: UserCreateCommunityInput) {
    await this.core.ensureUserAdmin(userId)
    return this.data.create(userId, input)
  }

  async deleteCommunity(userId: string, communityId: string) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.data.delete(communityId)
  }

  async findManyCommunity(input: UserFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getCommunityWhereUserInput(input),
      include: input.withRoles ? { roles: { include: { conditions: { include: { token: true } } } } } : undefined,
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunity(communityId: string) {
    return this.core.data.community.findFirst({
      where: { id: communityId },
    })
  }

  async updateCommunity(userId: string, communityId: string, input: UserUpdateCommunityInput) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.data.update(communityId, input)
  }

  async getCommunities(actor: User, username: string) {
    if (await this.core.isPrivateUser(actor, username)) {
      return []
    }
    return this.data.getCommunities(username)
  }
}
