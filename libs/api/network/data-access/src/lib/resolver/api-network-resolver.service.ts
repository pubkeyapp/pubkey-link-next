import { Injectable } from '@nestjs/common'
import { NetworkAssetInput } from '@pubkey-link/api-network-util'
import { ApiNetworkResolverAnybodiesService } from './api-network-resolver-anybodies.service'
import { ApiNetworkResolverSolanaFungibleService } from './api-network-resolver-solana-fungible.service'
import { ApiNetworkResolverSolanaNonFungibleService } from './api-network-resolver-solana-non-fungible.service'
import { ResolveNetworkAssetConfig } from './resolve-network-asset-config'

@Injectable()
export class ApiNetworkResolverService {
  constructor(
    readonly anybodies: ApiNetworkResolverAnybodiesService,
    readonly solanaFungible: ApiNetworkResolverSolanaFungibleService,
    readonly solanaNonFungible: ApiNetworkResolverSolanaNonFungibleService,
  ) {}

  async resolveNetworkAssets({
    cluster,
    owner,
    anybodiesTokens,
    solanaFungibleTokens,
    solanaNonFungibleTokens,
  }: ResolveNetworkAssetConfig): Promise<NetworkAssetInput[]> {
    const assets: NetworkAssetInput[] = []

    // Handle Anybodies vaults
    if (anybodiesTokens.length > 0) {
      const anybodiesAssets = await this.anybodies.resolve({
        cluster,
        owner,
        tokens: anybodiesTokens,
      })
      assets.push(...anybodiesAssets)
    }

    // Handle Solana fungible tokens
    if (solanaFungibleTokens.length > 0) {
      const solanaFungibleAssets = await this.solanaFungible.resolve({
        cluster,
        owner,
        tokens: solanaFungibleTokens,
      })
      assets.push(...solanaFungibleAssets)
    }

    // Handle Solana non-fungible tokens
    if (solanaNonFungibleTokens.length > 0) {
      const solanaNonFungibleAssets = await this.solanaNonFungible.resolve({
        cluster,
        owner,
        tokens: solanaNonFungibleTokens,
      })
      assets.push(...solanaNonFungibleAssets)
    }

    return assets
  }
}
