import { Group } from '@mantine/core'
import { NetworkAsset, NetworkCluster, NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiGrid, NetworkAssetUiShowBalance, NetworkAssetUiTable } from '@pubkey-link/web-network-asset-ui'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { NetworkUiSelectCluster } from '@pubkey-link/web-network-ui'
import { UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useMemo } from 'react'

interface AssetGroupItem {
  token: NetworkToken
  assets: NetworkAsset[]
  balance: string
}

export default function UserNetworkAssetListFeature({
  group,
  cluster: propsCluster,
  username,
  type,
  hideCluster = false,
}: {
  hideCluster?: boolean
  cluster?: NetworkCluster
  group?: string
  username: string
  type: NetworkTokenType
}) {
  const { items: tokens } = useUserFindManyNetworkToken({ cluster: propsCluster, limit: 999 })
  const { items, query, setSearch, cluster, setCluster } = useUserFindManyNetworkAsset({
    limit: 999,
    cluster: propsCluster,
    group,
    username,
    type,
  })

  const groups: AssetGroupItem[] = useMemo(() => {
    if (!tokens.length) {
      return []
    }
    return tokens
      .map((token) => {
        const assets = items.filter((item) => item.type === token.type && item.group === token.account)
        return {
          token,
          assets: assets.sort((a, b) => parseInt(b.balance ?? '0') - parseInt(a.balance ?? '0')),
          balance: assets.reduce((acc, asset) => acc + parseInt(asset.balance ?? '0'), 0).toString(),
        }
      })
      .sort((a, b) => a.token.name.localeCompare(b.token.name))
      .filter((group) => group.assets.length)
  }, [items, tokens])

  const placeholder = type === NetworkTokenType.NonFungible ? 'Search collectibles' : 'Search tokens'

  return (
    <UiStack gap="lg">
      <Group>
        <UiSearchField placeholder={placeholder} setSearch={setSearch} />
        {!hideCluster && <NetworkUiSelectCluster value={cluster} setValue={setCluster} />}
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack gap="lg">
          {groups.map((group) => (
            <UiStack key={group.token.id}>
              <UiGroup wrap="nowrap" align="center">
                <NetworkTokenUiItem
                  networkToken={group.token}
                  avatarProps={{ size: 'lg' }}
                  groupProps={{ align: 'start' }}
                />
                <NetworkAssetUiShowBalance balance={group.balance} symbol={group.token.symbol ?? ''} />
              </UiGroup>
              {type === NetworkTokenType.NonFungible ? (
                <NetworkAssetUiGrid networkAssets={group.assets} />
              ) : (
                <NetworkAssetUiTable networkAssets={group.assets} />
              )}
            </UiStack>
          ))}
        </UiStack>
      ) : (
        <UiInfo message={`No ${type ? type : ''} assets found${cluster ? ` on cluster ${cluster}` : ''}.`} />
      )}
    </UiStack>
  )
}
