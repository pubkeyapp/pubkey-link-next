import { Button } from '@mantine/core'
import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiNotFound, NetworkAssetUiShowBalance } from '@pubkey-link/web-network-asset-ui'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiCard, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { Suspense, useState } from 'react'
import { UserNetworkAssetFeature } from '../index'

export function NetworkAssetDetailNonFungible({ token, username }: { token: NetworkToken; username: string }) {
  const [showDetails, setShowDetails] = useState(false)
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
    <UiCard>
      <UiGroup align="start">
        <NetworkTokenUiItem avatarProps={{ size: 'lg' }} networkToken={token} />
        <UiStack gap={0} align="end">
          <NetworkAssetUiShowBalance balance={balance} size="lg" symbol={token.symbol ?? ''} />
          <Button variant="subtle" size="xs" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
        </UiStack>
      </UiGroup>
      <Suspense fallback={<UiLoader />}>
        {isLoading ? (
          <UiLoader />
        ) : items.length ? (
          showDetails ? (
            <UiStack mt="lg">
              <UserNetworkAssetFeature
                hideCluster
                cluster={token.cluster}
                group={token.account}
                username={username}
                type={NetworkTokenType.NonFungible}
              />
            </UiStack>
          ) : (
            <div />
          )
        ) : (
          <NetworkAssetUiNotFound token={token} username={username} />
        )}
      </Suspense>
    </UiCard>
  )
}
