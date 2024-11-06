import { Button, Group } from '@mantine/core'
import { NetworkResolver } from '@pubkey-link/sdk'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { AdminNetworkAssetFeature } from '@pubkey-link/web-network-asset-feature'
import { useAdminFindOneNetwork } from '@pubkey-link/web-network-data-access'
import { AdminNetworkTokenFeature } from '@pubkey-link/web-network-token-feature'
import { NetworkUiItem, NetworkUiSyncBadge } from '@pubkey-link/web-network-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminNetworkDetailSettingsTab } from './admin-network-detail-settings.tab'
import { AdminNetworkDetailVoteIdentitiesTab } from './admin-network-detail-vote-identities-tab'

export function AdminNetworkDetailFeature() {
  const { networkId } = useParams<{ networkId: string }>() as { networkId: string }
  const { hasResolver } = useAppConfig()
  const { item, query, cleanupNetworkAssets, syncNetworkAssets, verifyNetworkAssets } = useAdminFindOneNetwork({
    networkId,
  })

  const tabs: UiTabRoute[] = [
    { path: 'tokens', label: 'Tokens', element: item ? <AdminNetworkTokenFeature cluster={item.cluster} /> : null },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminNetworkDetailSettingsTab networkId={networkId} />,
    },
    {
      path: 'assets',
      label: 'Assets',
      element: item ? <AdminNetworkAssetFeature cluster={item.cluster} /> : null,
    },
  ]

  if (hasResolver(NetworkResolver.SolanaValidator)) {
    tabs.push({
      path: 'vote-identities',
      label: 'Vote Identities',
      element: <AdminNetworkDetailVoteIdentitiesTab networkId={networkId} />,
    })
  }

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Network not found." />
  }

  return (
    <UiPage
      title={<NetworkUiItem network={item} to={`./${item.id}`} title={<NetworkUiSyncBadge network={item} />} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <Button size="xs" onClick={() => syncNetworkAssets()} variant="light">
            Sync Assets
          </Button>
          <Button size="xs" onClick={() => cleanupNetworkAssets()} variant="light">
            Cleanup Assets
          </Button>
          <Button size="xs" onClick={() => verifyNetworkAssets()} variant="light">
            Verify Assets
          </Button>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
