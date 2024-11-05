import { Grid, Group } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { UserLogListFeature } from '@pubkey-link/web-log-ui'
import { useUserFindOneNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiItem } from '@pubkey-link/web-network-asset-ui'
import { NetworkUiClusterBadge } from '@pubkey-link/web-network-ui'
import { UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserNetworkAssetDetailOverviewTab } from './user-network-asset-detail-overview.tab'

export default function UserNetworkAssetDetailFeature() {
  const { account, cluster } = useParams<{ networkAssetId: string }>() as { account: string; cluster: NetworkCluster }
  const { item, query } = useUserFindOneNetworkAsset({ account, cluster })

  return (
    <UiPage
      title={<Group>{item?.name ?? ''}</Group>}
      rightAction={
        <Group>
          <AppUiDebugModal data={item} />
          <NetworkUiClusterBadge cluster={item?.cluster} />
        </Group>
      }
    >
      {query.isLoading ? (
        <UiLoader />
      ) : item ? (
        <Grid>
          <Grid.Col span={6}>
            <NetworkAssetUiItem networkAsset={item} />
          </Grid.Col>
          <Grid.Col span={6}>
            <UiTabRoutes
              tabs={[
                {
                  path: 'overview',
                  label: 'Overview',
                  element: <UserNetworkAssetDetailOverviewTab account={account} cluster={cluster} />,
                },
                { path: 'logs', label: 'Logs', element: <UserLogListFeature networkAssetId={item.id} /> },
              ]}
            />
          </Grid.Col>
        </Grid>
      ) : (
        <UiError message="NetworkAsset not found." />
      )}
    </UiPage>
  )
}
