import { NetworkCluster } from '@pubkey-link/sdk'
import { useMemo } from 'react'

export function useDefaultFormCluster(clusters: NetworkCluster[]) {
  return useMemo(() => {
    return clusters.includes(NetworkCluster.SolanaMainnet)
      ? NetworkCluster.SolanaMainnet
      : clusters.length
      ? clusters[0]
      : NetworkCluster.SolanaCustom
  }, [clusters])
}
