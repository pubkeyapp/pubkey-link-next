import { Injectable } from '@nestjs/common'
import { ApiCoreService, AppFeature } from '@pubkey-link/api-core-data-access'

@Injectable()
export class ApiCommunityDataAnonService {
  constructor(private readonly core: ApiCoreService) {}

  async getCommunities() {
    this.core.config.ensureFeature(AppFeature.AnonCommunities)
    return this.core.data.community.findMany({
      where: { featured: true, bots: { some: {} } },
      orderBy: { name: 'asc' },
    })
  }
}
