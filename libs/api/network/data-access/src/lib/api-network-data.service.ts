import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { getNetworkType } from '@pubkey-link/api-network-util'
import { ApiNetworkClusterService } from './api-network-cluster.service'
import { EVENT_NETWORK_CREATED, EVENT_NETWORK_DELETED, EVENT_NETWORK_UPDATED } from './api-network.events'
import { NetworkPaging } from './entity/network.entity'

@Injectable()
export class ApiNetworkDataService implements OnModuleInit {
  private readonly logger = new Logger(ApiNetworkDataService.name)
  constructor(private readonly cluster: ApiNetworkClusterService, private readonly core: ApiCoreService) {}

  async onModuleInit() {
    await this.refreshAllVoteIdentities()
  }

  async create(input: Omit<Prisma.NetworkCreateInput, 'type'>) {
    const type = getNetworkType(input.cluster)

    const created = await this.core.data.network.create({ data: { ...input, type, id: input.cluster } })
    this.core.eventEmitter.emit(EVENT_NETWORK_CREATED, { network: created })
    return created
  }

  async delete(networkId: string) {
    const deleted = await this.core.data.network.delete({ where: { id: networkId } })
    this.core.eventEmitter.emit(EVENT_NETWORK_DELETED, { network: deleted })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.NetworkFindManyArgs & PagingInputFields): Promise<NetworkPaging> {
    return this.core.data.network
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }
  async findOne(networkId: string) {
    return this.core.data.network.findUnique({ where: { id: networkId } })
  }

  async findOneByCluster(cluster: NetworkCluster) {
    return this.core.data.network.findUnique({ where: { cluster } })
  }

  async update(networkId: string, input: Prisma.NetworkUpdateInput) {
    const updated = await this.core.data.network.update({ where: { id: networkId }, data: input })
    this.core.eventEmitter.emit(EVENT_NETWORK_UPDATED, { network: updated })
    return updated
  }

  async getVoteIdentities(networkId: string) {
    const network = await this.findOne(networkId)
    if (!network) {
      throw new Error(`Network ${networkId} not found`)
    }
    return this.cluster.getVoteIdentities(network.cluster)
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async refreshAllVoteIdentities() {
    const networks = await this.core.data.network.findMany()
    if (!networks.length) {
      this.logger.log('No networks found')
      return true
    }
    this.logger.verbose(`Refreshing vote identities for ${networks.length} networks`)
    for (const network of networks) {
      await this.refreshVoteIdentities(network.id)
    }
    return true
  }

  async refreshVoteIdentities(networkId: string) {
    const network = await this.findOne(networkId)
    if (!network) {
      throw new Error(`Network ${networkId} not found`)
    }
    try {
      const voters = await this.cluster.getVoteIdentities(network.cluster)

      const { removed, added } = compareVoteIdentities(network.voters ?? [], voters)
      if (!removed.length && !added.length) {
        this.logger.log(`No changes to vote identities for network ${network.cluster}`, voters)
        return true
      }

      await this.update(networkId, { voters })

      if (removed.length) {
        this.logger.verbose(
          `Removed ${removed.length} vote identities from network ${network.cluster}: ${removed
            .splice(0, 10)
            .join(', ')}`,
        )
      }
      if (added.length) {
        this.logger.verbose(
          `Added ${added.length} vote identities to network ${network.cluster}: ${added.splice(0, 10).join(', ')}`,
        )
      }
      return true
    } catch (e) {
      this.logger.error(`Error refreshing vote identities for network ${network.cluster}`, e)
      return false
    }
  }
}

function compareVoteIdentities(existing: string[], incoming: string[]) {
  const added = incoming.filter((x) => !existing.includes(x))
  const removed = existing.filter((x) => !incoming.includes(x))

  return { added, removed }
}
