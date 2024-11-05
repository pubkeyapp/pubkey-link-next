import { NetworkCluster } from '@pubkey-link/sdk'
import { useUserGetTokenAccounts, useUserGetTokenMetadata } from '@pubkey-link/web-network-data-access'
import { UiDebug, UiError, UiLoader, UiStack } from '@pubkey-ui/core'
import { NetworkTokenUiItem } from './network-token-ui-item'

export function NetworkUiGetTokenMetadata({ cluster, account }: { cluster: NetworkCluster; account: string }) {
  const query = useUserGetTokenMetadata({ account, cluster })

  return query.isLoading ? (
    <UiLoader />
  ) : query.isError ? (
    <UiError message={query.error.message} />
  ) : query.data ? (
    <UiStack>
      <NetworkTokenUiItem networkToken={query.data?.result} />
      <UiDebug data={query.data} />
    </UiStack>
  ) : (
    <UiError message="No data" />
  )
}

export function NetworkUiGetTokenAccounts({ cluster, account }: { cluster: NetworkCluster; account: string }) {
  const query = useUserGetTokenAccounts({ account, cluster })

  return query.isLoading ? (
    <UiLoader />
  ) : query.isError ? (
    <UiError message={query.error.message} />
  ) : query.data ? (
    <UiStack>
      <UiDebug data={query.data} />
    </UiStack>
  ) : (
    <UiError message="No data" />
  )
}
