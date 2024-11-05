import { Button, Group } from '@mantine/core'
import { AdminNetworkAssetFeature } from '@pubkey-link/web-network-asset-feature'
import { useAdminFindOneNetwork } from '@pubkey-link/web-network-data-access'
import { AdminNetworkTokenFeature } from '@pubkey-link/web-network-token-feature'
import { NetworkUiItem, NetworkUiSyncBadge } from '@pubkey-link/web-network-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminNetworkDetailSettingsTab } from './admin-network-detail-settings.tab'
import { AdminNetworkDetailVoteAccountsTab } from './admin-network-detail-vote-accounts.tab'

export function AdminNetworkDetailFeature() {
  const { networkId } = useParams<{ networkId: string }>() as { networkId: string }
  const { item, query, cleanupNetworkAssets, syncNetworkAssets, verifyNetworkAssets } = useAdminFindOneNetwork({
    networkId,
  })

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
      <UiTabRoutes
        tabs={[
          { path: 'tokens', label: 'Tokens', element: <AdminNetworkTokenFeature cluster={item.cluster} /> },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminNetworkDetailSettingsTab networkId={networkId} />,
          },
          {
            path: 'assets',
            label: 'Assets',
            element: <AdminNetworkAssetFeature cluster={item.cluster} />,
          },
          {
            path: 'vote-accounts',
            label: 'Vote Accounts',
            element: <AdminNetworkDetailVoteAccountsTab networkId={networkId} />,
          },
        ]}
      />
    </UiPage>
  )
}
