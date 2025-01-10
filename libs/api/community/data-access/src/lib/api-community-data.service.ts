import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, AppFeature, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { CommunityPaging } from './entity/community.entity'

@Injectable()
export class ApiCommunityDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(userId: string, input: Prisma.CommunityCreateInput) {
    this.core.config.ensureFeature(AppFeature.CommunityCreate)
    const created = await this.core.createCommunity({ userId, input })
    await this.core.logInfo(`[${created.id}] Community created`, { userId, communityId: created.id })
    return created
  }

  async delete(communityId: string) {
    const deleted = await this.core.data.community.delete({ where: { id: communityId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.CommunityFindManyArgs & PagingInputFields): Promise<CommunityPaging> {
    return this.core.data.community
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(communityId: string) {
    const found = await this.core.getCommunityById(communityId)
    if (!found) {
      throw new Error('Community not found')
    }
    return found
  }

  async getCommunities(username: string) {
    return this.core.data.community.findMany({
      include: {
        members: {
          where: { user: { username } },
        },
        roles: {
          // Ensure that the role has at least one condition
          where: { conditions: { some: {} } },
          include: {
            conditions: { include: { token: true } },
            members: {
              where: { member: { user: { username } } },
              include: { member: true },
            },
          },
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    })
  }

  async update(communityId: string, input: Prisma.CommunityUpdateInput) {
    return this.core.data.community.update({ where: { id: communityId }, data: input })
  }
}
