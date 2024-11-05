import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { Role } from '@pubkey-link/sdk'
import { AppUiDebugModal, gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { RoleUiGridItem } from './role-ui-grid-item'

export function RoleUiGrid({
  roles = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  roles: Role[]
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
        {roles.map((role) => (
          <RoleUiGridItem key={role.id} to={role.id} role={role} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <AppUiDebugModal data={roles} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
