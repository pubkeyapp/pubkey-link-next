import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { AppUiDebugModal, gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { useMemo } from 'react'
import { CommunityUiGridItem } from './community-ui-grid-item'

export function CommunityUiGrid({
  communities = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  communities: Community[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = Math.ceil(totalRecords / limit)
  const cols = useMemo(() => ({ base: 1, sm: communities.length === 1 ? 1 : 2 }), [communities.length])

  return (
    <UiStack>
      <SimpleGrid cols={cols} spacing="md">
        {communities.map((community) => (
          <CommunityUiGridItem key={community.id} to={community.id} community={community} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <AppUiDebugModal data={communities} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
