import { Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManyUser } from '@pubkey-link/web-user-data-access'
import { AdminUserUiTable } from '@pubkey-link/web-user-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { AdminUserUiSelectRole } from './admin-user-ui-select-role'
import { AdminUserUiSelectStatus } from './admin-user-ui-select-status'

export function AdminUserListFeature() {
  const { deleteUser, items, pagination, query, role, setRole, setSearch, setStatus, status, verifyUser } =
    useAdminFindManyUser()

  return (
    <UiPage title="Users" leftAction={<UiBack />} rightAction={<UiDebugModal data={items} />}>
      <Group>
        <UiSearchField placeholder="Search user" setSearch={setSearch} />
        <AdminUserUiSelectRole value={role} setValue={setRole} />
        <AdminUserUiSelectStatus value={status} setValue={setStatus} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminUserUiTable
          deleteUser={(user) => {
            if (!window.confirm('Are you sure?')) return
            return deleteUser(user.id)
          }}
          verifyUser={(user) => verifyUser(user.id)}
          users={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="User not found." />
      )}
    </UiPage>
  )
}
