import { NetworkAsset } from '@pubkey-link/sdk'
import { useMemo } from 'react'

export function useNetworkAssetSummary({ items }: { items: NetworkAsset[] }) {
  return useMemo(() => {
    if (!items.length) {
      return { total: '0', items: [] }
    }

    const total = items.reduce((acc, item) => acc + parseFloat(item.balance ?? '0'), 0)

    return {
      total: total.toString(),
      items: items
        .map((item) => ({ account: item.account, balance: item.balance, owner: item.owner }))
        .sort((a, b) => a.account.localeCompare(b.account))
        .sort((a, b) => a.owner.localeCompare(b.owner))
        .sort((a, b) => parseFloat(b.balance ?? '0') - parseFloat(a.balance ?? '0')),
    }
  }, [items])
}
