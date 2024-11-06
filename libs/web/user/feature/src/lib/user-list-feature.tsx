import { Group } from '@mantine/core'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { useUserFindManyUser } from '@pubkey-link/web-user-data-access'
import { UserUiGrid } from '@pubkey-link/web-user-ui'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconUserSearch } from '@tabler/icons-react'

export function UserListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyUser({
    limit: 12,
  })

  return (
    <UiPage title="Users">
      <Group>
        <UiSearchField size="lg" leftSection={<IconUserSearch />} placeholder="Search user" setSearch={setSearch} />
      </Group>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserUiGrid
          users={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="User not found." />
      )}
    </UiPage>
  )
}
