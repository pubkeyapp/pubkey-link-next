import { Group } from '@mantine/core'
import { NetworkCluster, NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { NetworkTokenUiSelectType } from '@pubkey-link/web-network-token-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { NetworkTokenUiDetailFungible } from './network-token-ui-detail-fungible'
import { NetworkTokenUiDetailNonFungible } from './network-token-ui-detail-non-fungible'

export function UserNetworkTokenListFeature({ cluster, username }: { cluster: NetworkCluster; username: string }) {
  const { items, query, setSearch, type, setType } = useUserFindManyNetworkToken({
    cluster,
    username,
    limit: 100, // TODO: Figure out what to do with 100 tokens
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search token" setSearch={setSearch} />
        <NetworkTokenUiSelectType value={type} setValue={setType} />
        <UiDebugModal data={items} />
      </Group>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <NetworkTokenUiList tokens={items} username={username} />
      ) : (
        <UiInfo message={`No assets found for ${username}.`} />
      )}
    </UiStack>
  )
}

function NetworkTokenUiList({ tokens, username }: { tokens: NetworkToken[]; username: string }) {
  return (
    <UiStack>
      {tokens.map((token) => (
        <NetworkTokenUiDetail key={token.id} token={token} username={username} />
      ))}
    </UiStack>
  )
}

function NetworkTokenUiDetail(props: { token: NetworkToken; username: string }) {
  switch (props.token.type) {
    case NetworkTokenType.Fungible:
      return <NetworkTokenUiDetailFungible {...props} />
    case NetworkTokenType.NonFungible:
      return <NetworkTokenUiDetailNonFungible {...props} />
    default:
      return <UiInfo message="Unknown token type." />
  }
}
