import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { ellipsify, getNetworkAssetOwnerUrl, NetworkAsset } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { UiAnchor } from '@pubkey-ui/core'
import { IconPencil } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { NetworkAssetUiExplorerIcon } from './network-asset-ui-explorer-icon'
import { NetworkAssetUiShowBalance } from './network-asset-ui-show-balance'

export function NetworkAssetUiTable({ networkAssets = [] }: { networkAssets: NetworkAsset[] }) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'identity',
            render: (item) => (
              <UiAnchor to={getNetworkAssetOwnerUrl(item)} size="sm" fw={500} target="_blank">
                {ellipsify(item.owner, 8)}
              </UiAnchor>
            ),
          },
          {
            accessor: 'account',
            render: (item) => (
              <UiAnchor to={item.explorerUrl} size="sm" fw={500} target="_blank">
                {ellipsify(item.account, 8)}
              </UiAnchor>
            ),
          },
          {
            accessor: 'balance',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <NetworkAssetUiShowBalance balance={item.balance ?? '0'} size="lg" symbol={item.symbol ?? ''} />
              </Group>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            width: '120px',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <AppUiDebugModal data={item} />
                <NetworkAssetUiExplorerIcon asset={item} />
                <ActionIcon
                  color="brand"
                  variant="light"
                  size="sm"
                  component={Link}
                  to={`/networkAssets/${item.id}/settings`}
                >
                  <IconPencil size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={networkAssets}
      />
    </ScrollArea>
  )
}
