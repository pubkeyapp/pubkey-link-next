import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiNotFound, NetworkAssetUiShowBalance } from '@pubkey-link/web-network-asset-ui'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { Suspense } from 'react'
import { UserNetworkAssetSlimFeature } from '../index'

export function NetworkAssetDetailNonFungible({ token, username }: { token: NetworkToken; username: string }) {
  const { query, items, pagination } = useUserFindManyNetworkAsset({
    cluster: token.cluster,
    group: token.account,
    limit: 12,
    username,
    type: NetworkTokenType.NonFungible,
  })
  const isLoading = query.isLoading
  const balance = pagination?.total.toString() ?? '0'

  return (
    <UiStack>
      <UiGroup align="start">
        <NetworkTokenUiItem avatarProps={{ size: 'lg' }} networkToken={token} />
        <UiStack gap={0} align="end">
          <NetworkAssetUiShowBalance balance={balance} size="lg" symbol={token.symbol ?? ''} />
        </UiStack>
      </UiGroup>
      <Suspense fallback={<UiLoader />}>
        {isLoading ? (
          <UiLoader />
        ) : items.length ? (
          <UiStack mt="lg">
            <UserNetworkAssetSlimFeature token={token} username={username} />
          </UiStack>
        ) : (
          <NetworkAssetUiNotFound token={token} username={username} />
        )}
      </Suspense>
    </UiStack>
  )
}
