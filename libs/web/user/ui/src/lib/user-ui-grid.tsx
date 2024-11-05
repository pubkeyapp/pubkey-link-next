import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { AppUiDebugModal, gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { UserUiGridItem } from './user-ui-grid-item'

export function UserUiGrid({
  users = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  users: User[]
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
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {users.map((user) => (
          <UserUiGridItem key={user.id} to={user.profileUrl} user={user} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <AppUiDebugModal data={users} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
