import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { CommunityMemberPaging } from './entity/community-member.entity'

@Injectable()
export class ApiCommunityMemberDataService {
  constructor(private readonly core: ApiCoreService) {}

  async add(input: Prisma.CommunityMemberUncheckedCreateInput) {
    return this.core.data.communityMember.create({ data: input })
  }

  async ensureCommunityMemberAccess({ communityMemberId, userId }: { communityMemberId: string; userId: string }) {
    const member = await this.findOne(communityMemberId)

    const { admin } = await this.core.ensureCommunityMember({ userId, communityId: member.communityId })

    return { member, admin }
  }

  async ensureCommunityMemberAdmin({ communityMemberId, userId }: { communityMemberId: string; userId: string }) {
    const { member, admin } = await this.ensureCommunityMemberAccess({ communityMemberId, userId })

    if (!admin) {
      throw new Error('Community member not admin')
    }

    return { member, admin }
  }

  async getMember({ communityId, userId }: { communityId: string; userId: string }) {
    return this.core.data.communityMember.findUnique({
      where: { communityId_userId: { communityId, userId } },
      include: { roles: { include: { role: true } } },
    })
  }

  async remove(communityMemberId: string) {
    const deleted = await this.core.data.communityMember.delete({ where: { id: communityMemberId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.CommunityMemberFindManyArgs & PagingInputFields): Promise<CommunityMemberPaging> {
    return this.core.data.communityMember
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(communityMemberId: string) {
    const found = await this.core.data.communityMember.findUnique({ where: { id: communityMemberId } })
    if (!found) {
      throw new Error('Community member not found')
    }
    return found
  }

  async update(communityMemberId: string, input: Prisma.CommunityMemberUpdateInput) {
    return this.core.data.communityMember.update({ where: { id: communityMemberId }, data: input })
  }
}
