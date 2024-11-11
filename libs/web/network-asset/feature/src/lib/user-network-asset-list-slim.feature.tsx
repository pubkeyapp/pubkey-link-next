import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiGrid, NetworkAssetUiTable } from '@pubkey-link/web-network-asset-ui'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserNetworkAssetListSlimFeature({
  username,
  token,
}: {
  username: string
  token: NetworkToken
}) {
  const { items, query } = useUserFindManyNetworkAsset({
    cluster: token.cluster,
    group: token.account,
    limit: 999,
    type: token.type,
    username,
  })

  return (
    <UiStack gap="lg">
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack gap="lg">
          <UiStack key={token.id}>
            {token.type === NetworkTokenType.NonFungible ? (
              <NetworkAssetUiGrid networkAssets={items} />
            ) : (
              <NetworkAssetUiTable networkAssets={items} />
            )}
          </UiStack>
        </UiStack>
      ) : (
        <UiInfo message={`No ${token.name} assets found.`} />
      )}
    </UiStack>
  )
}
