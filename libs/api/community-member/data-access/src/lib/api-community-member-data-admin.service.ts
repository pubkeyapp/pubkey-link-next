import { Injectable } from '@nestjs/common'
import { User } from '@pubkey-link/api-user-data-access'
import { ApiCommunityMemberDataService } from './api-community-member-data.service'
import { AdminAddCommunityMemberInput } from './dto/admin-add-community-member-input'
import { AdminFindManyCommunityMemberInput } from './dto/admin-find-many-community-member.input'
import { AdminUpdateCommunityMemberInput } from './dto/admin-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member.entity'
import { getCommunityMemberWhereAdminInput } from './helpers/get-community-member-where-admin.input'

@Injectable()
export class ApiCommunityMemberDataAdminService {
  constructor(private readonly data: ApiCommunityMemberDataService) {}

  async addCommunityMember(actor: User, communityId: string, input: AdminAddCommunityMemberInput) {
    return this.data.add({ actor, input: { ...input, communityId } })
  }

  async removeCommunityMember(actor: User, communityMemberId: string) {
    return this.data.remove({ actor, communityMemberId })
  }

  async findManyCommunityMember(input: AdminFindManyCommunityMemberInput): Promise<CommunityMemberPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getCommunityMemberWhereAdminInput(input),
      include: { user: true },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunityMember(communityMemberId: string) {
    return this.data.findOne(communityMemberId)
  }

  async updateCommunityMember(actor: User, communityMemberId: string, input: AdminUpdateCommunityMemberInput) {
    return this.data.update({ actor, communityMemberId, input })
  }
}
