import { Group } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'
import { AppUiDebugModal, UiSearchField } from '@pubkey-link/web-core-ui'
import { NetworkAssetDetailFeature } from '@pubkey-link/web-network-asset-feature'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { NetworkTokenUiSelectType } from '@pubkey-link/web-network-token-ui'
import { NetworkUiSelectCluster } from '@pubkey-link/web-network-ui'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserNetworkTokenListFeature({ username }: { username: string }) {
  const { items, query, setSearch, type, setType, cluster, setCluster } = useUserFindManyNetworkToken({
    username,
    limit: 100, // TODO: Figure out what to do with 100 tokens
    cluster: NetworkCluster.SolanaMainnet,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search token" setSearch={setSearch} />
        <NetworkUiSelectCluster value={cluster} setValue={setCluster} />
        <NetworkTokenUiSelectType value={type} setValue={setType} />
        <AppUiDebugModal data={items} />
      </Group>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack>
          {items.map((token) => (
            <NetworkAssetDetailFeature key={token.id} token={token} username={username} />
          ))}
        </UiStack>
      ) : (
        <UiInfo message={`No assets found for ${username}.`} />
      )}
    </UiStack>
  )
}
