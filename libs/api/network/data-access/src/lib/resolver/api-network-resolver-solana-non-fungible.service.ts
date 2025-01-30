import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { publicKey, Umi } from '@metaplex-foundation/umi'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, NetworkToken } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import {
  convertDasApiAsset,
  findAssetGroupValue,
  findNetworkAssetsByGroup,
  findNetworkAssetsByMint,
  NetworkAssetInput,
} from '@pubkey-link/api-network-util'

import { ApiNetworkClusterService } from '../api-network-cluster.service'

@Injectable()
export class ApiNetworkResolverSolanaNonFungibleService {
  private readonly logger = new Logger(ApiNetworkResolverSolanaNonFungibleService.name)

  constructor(readonly core: ApiCoreService, readonly cluster: ApiNetworkClusterService) {}

  async resolve({
    cluster,
    owner,
    tokens,
  }: {
    cluster: NetworkCluster
    owner: string
    tokens: NetworkToken[]
  }): Promise<NetworkAssetInput[]> {
    const tag = `resolveNetworkAssetsSolanaNonFungible(${owner}, ${cluster}, ${tokens.map((t) => t.account).join(',')})`
    this.logger.verbose(`${tag}: Start resolving assets`)

    const groups = tokens.map((token) => token.account)
    const items: DasApiAsset[] = []
    const umi = await this.cluster.getUmi(cluster)
    const limit = 1000
    let page = 1
    let total = 0

    while (total < page * limit) {
      const assets = await this.getAssets({ umi, owner, limit, page })
      this.logger.verbose(`${tag} - page ${page} - ${assets.items.length} assets`)
      items.push(...assets.items)
      total += assets.total
      page++
      if (assets.items.length === 0 || assets.items.length < limit) {
        break
      }
    }
    const tokensWithMintList = tokens.filter((t) => t.mintList.length)
    const tokenMints = [...tokensWithMintList.map((t) => t.mintList).flat(), ...tokens.map((t) => t.account)]
    const converted = items
      ?.map((asset) => {
        const mint = tokensWithMintList.find((t) => t.mintList.includes(asset.id))
        const group = findAssetGroupValue(asset) ?? mint?.account

        // TODO: Figure out a way to not run the code below if the asset is not part of a group
        return convertDasApiAsset({ asset, cluster, group: mint ? mint.account : group })
      })
      .filter((asset) => {
        // Filter out assets that are not part of a group we are interested in
        return asset.group ? tokenMints.includes(asset.group) : false
      })
    if (!converted.length) {
      return []
    }

    const mints: string[] = tokens.flatMap((token) => token.mintList)
    const convertedGroups = findNetworkAssetsByGroup(converted, groups)
    const convertedMints = findNetworkAssetsByMint(converted, mints)

    return [...new Set([...convertedGroups, ...convertedMints])]
  }

  async getAssets({ umi, owner, limit, page }: { umi: Umi; owner: string; limit: number; page: number }) {
    if (this.core.config.featureBetaDasSearch) {
      return this.searchAssets({ umi, owner, limit, page })
    }
    return this.getAssetsByOwner({ umi, owner, limit, page })
  }

  async getAssetsByOwner({ umi, owner, limit, page }: { umi: Umi; owner: string; limit: number; page: number }) {
    return umi.rpc.getAssetsByOwner({
      owner: publicKey(owner),
      limit: limit,
      page,
      sortBy: { sortBy: 'updated', sortDirection: 'desc' },
    })
  }

  async searchAssets({ umi, owner, limit, page }: { umi: Umi; owner: string; limit: number; page: number }) {
    return umi.rpc.searchAssets({
      owner: publicKey(owner),
      limit: limit,
      page,
      sortBy: { sortBy: 'updated', sortDirection: 'desc' },
      burnt: this.core.config.featureBetaDasBurnt,
    })
  }
}
