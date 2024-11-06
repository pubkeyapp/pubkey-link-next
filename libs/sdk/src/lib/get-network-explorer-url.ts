import { NetworkAsset, NetworkCluster, NetworkToken } from '../generated/graphql-sdk'

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

export function getNetworkAssetUrl(asset: Pick<NetworkAsset, 'account' | 'cluster'>): string {
  return getNetworkExplorerUrl(asset.cluster).replace('{path}', `account/${asset.account}`)
}

export function getNetworkAssetGroupUrl(asset: Pick<NetworkAsset, 'cluster' | 'group'>): string {
  return getNetworkExplorerUrl(asset.cluster).replace('{path}', `account/${asset.group}`)
}

export function getNetworkAssetOwnerUrl(asset: Pick<NetworkAsset, 'cluster' | 'owner'>): string {
  return getNetworkExplorerUrl(asset.cluster).replace('{path}', `account/${asset.owner}`)
}

export function getNetworkTokenUrl(token: Pick<NetworkToken, 'account' | 'cluster'>): string {
  return getNetworkExplorerUrl(token.cluster).replace('{path}', `account/${token.account}`)
}
