import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { NetworkAsset } from '@pubkey-link/sdk'
import { AppUiDebugModal, gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { NetworkAssetUiItem } from './network-asset-ui-item'

export function NetworkAssetUiGrid({
  networkAssets = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  networkAssets: NetworkAsset[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = Math.ceil(totalRecords / limit)
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {networkAssets.map((networkAsset) => (
          <NetworkAssetUiItem
            key={networkAsset.id}
            to={`/assets/${networkAsset.cluster}/${networkAsset.account}`}
            networkAsset={networkAsset}
          />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <AppUiDebugModal data={networkAssets} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
