import { NetworkCluster } from '@prisma/client'

export function getNetworkExplorerUrl(cluster: NetworkCluster, endpoint = 'http://localhost:8899') {
  const base = 'https://explorer.solana.com/{path}'
  switch (cluster) {
    case NetworkCluster.SolanaDevnet:
      return base + '?cluster=devnet'
    case NetworkCluster.SolanaMainnet:
      return base
    case NetworkCluster.SolanaTestnet:
      return base + '?cluster=testnet'
    case NetworkCluster.SolanaCustom:
      return base + `?cluster=custom&customUrl=${encodeURIComponent(endpoint)}`
    default:
      throw new Error(`Unknown network cluster: ${cluster}`)
  }
}
