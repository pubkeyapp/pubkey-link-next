import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkTokenDataService } from './api-network-token-data.service'
import { UserFindManyNetworkTokenInput } from './dto/user-find-many-network-token.input'
import { NetworkTokenPaging } from './entity/network-token.entity'
import { getNetworkTokenWhereUserInput } from './helpers/get-network-token-where-user.input'

@Injectable()
export class ApiNetworkTokenDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiNetworkTokenDataService) {}

  async findManyNetworkToken(actor: User, input: UserFindManyNetworkTokenInput): Promise<NetworkTokenPaging> {
    if (input.username && (await this.core.isPrivateUser(actor, input.username))) {
      return { data: [], meta: { currentPage: 0, isFirstPage: true, isLastPage: true } }
    }
    const filters = await this.data.getNetworkTokenFilters(input.username)

    return this.data.findMany({
      orderBy: [{ type: 'desc' }, { name: 'asc' }],
      where: getNetworkTokenWhereUserInput(filters, input),
      limit: input.limit,
      page: input.page,
    })
  }
}
