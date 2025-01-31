import { NetworkCluster, NetworkToken } from '@prisma/client'

export interface ResolveNetworkAssetConfig {
  cluster: NetworkCluster
  owner: string
  solanaFungibleTokens: NetworkToken[]
  solanaNonFungibleTokens: NetworkToken[]
}
