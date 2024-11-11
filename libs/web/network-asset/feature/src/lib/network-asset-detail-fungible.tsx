import { Group, Text } from '@mantine/core'
import { ellipsify, NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { useNetworkAssetSummary, useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiNotFound, NetworkAssetUiShowBalance } from '@pubkey-link/web-network-asset-ui'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiGroup, UiInfoTable, UiLoader, UiStack } from '@pubkey-ui/core'

export function NetworkAssetDetailFungible({ token, username }: { token: NetworkToken; username: string }) {
  const { query, items } = useUserFindManyNetworkAsset({
    cluster: token.cluster,
    group: token.account,
    limit: 100,
    username,
    type: NetworkTokenType.Fungible,
  })
  const isLoading = query.isLoading
  const summary = useNetworkAssetSummary({ items })
  const balance = summary?.total ?? '0'

  return (
    <UiStack>
      <UiGroup align="start">
        <NetworkTokenUiItem avatarProps={{ size: 'lg' }} networkToken={token} />
        <UiStack gap={0} align="end">
          <NetworkAssetUiShowBalance balance={balance} size="lg" symbol={token.symbol ?? ''} />
        </UiStack>
      </UiGroup>
      {isLoading ? (
        <UiLoader />
      ) : items.length ? (
        <UiInfoTable
          mt="lg"
          items={items.map((item) => [
            <UiStack gap={0}>
              <Text ff="mono" fw="bold">
                {ellipsify(item.owner, 6)}
              </Text>
              <Text ff="mono" size="xs" c="dimmed">
                {item.account}
              </Text>
            </UiStack>,
            <Group justify="end">
              <NetworkAssetUiShowBalance mr={0} balance={item.balance ?? '0'} symbol={token.symbol ?? ''} />
            </Group>,
          ])}
        />
      ) : (
        <NetworkAssetUiNotFound token={token} username={username} />
      )}
    </UiStack>
  )
}
