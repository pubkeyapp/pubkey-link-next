import { Injectable } from '@nestjs/common'
import { ApiNetworkDataService } from './api-network-data.service'
import { AdminCreateNetworkInput } from './dto/admin-create-network.input'
import { AdminFindManyNetworkInput } from './dto/admin-find-many-network.input'
import { AdminUpdateNetworkInput } from './dto/admin-update-network.input'
import { NetworkPaging } from './entity/network.entity'
import { getNetworkWhereAdminInput } from './helpers/get-network-where-admin.input'

@Injectable()
export class ApiNetworkDataAdminService {
  constructor(private readonly data: ApiNetworkDataService) {}

  async createNetwork(input: AdminCreateNetworkInput) {
    return this.data.create(input)
  }

  async deleteNetwork(networkId: string) {
    return this.data.delete(networkId)
  }

  async findManyNetwork(input: AdminFindManyNetworkInput): Promise<NetworkPaging> {
    return this.data.findMany({
      orderBy: { name: 'desc' },
      where: getNetworkWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneNetwork(networkId: string) {
    return this.data.findOne(networkId)
  }

  async updateNetwork(networkId: string, input: AdminUpdateNetworkInput) {
    return this.data.update(networkId, input)
  }
}
