import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { ApiNetworkAssetDataService } from './api-network-asset-data.service'
import { UserFindManyNetworkAssetInput } from './dto/user-find-many-network-asset.input'
import { NetworkAssetPaging } from './entity/network-asset.entity'
import { getNetworkAssetWhereUserInput } from './helpers/get-network-asset-where-user.input'

@Injectable()
export class ApiNetworkAssetDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiNetworkAssetDataService) {}

  async findManyNetworkAsset(actor: User, input: UserFindManyNetworkAssetInput): Promise<NetworkAssetPaging> {
    if (await this.core.isPrivateUser(actor, input.username)) {
      return { data: [], meta: { currentPage: 0, isFirstPage: true, isLastPage: true } }
    }
    const identities = await this.core.getSolanaIdentities({ username: input.username })

    return this.data.findMany({
      orderBy: { group: 'asc' },
      where: getNetworkAssetWhereUserInput(identities, input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneNetworkAsset(cluster: NetworkCluster, account: string) {
    return this.data.findOneByAccount(cluster, account)
  }
}
