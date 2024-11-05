import { Checkbox, Group } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UserAddCommunityMemberModal, UserCommunityMemberUiTable } from '@pubkey-link/web-community-member-ui'
import { AppUiDebugModal, UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserCommunityMemberListFeature({ community }: { community: Community }) {
  const { addCommunityMember, removeCommunityMember, items, pagination, query, setSearch, admin, setAdmin } =
    useUserFindManyCommunityMember({
      communityId: community.id,
      limit: 20,
    })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search member" setSearch={setSearch} />
        <AppUiDebugModal data={items} />
        <UserAddCommunityMemberModal add={addCommunityMember} />
        <Checkbox label="Admins" checked={admin} onChange={() => setAdmin(!admin)} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserCommunityMemberUiTable
          refresh={query.refetch}
          deleteCommunityMember={(communityMember) => {
            if (!window.confirm('Are you sure?')) return
            return removeCommunityMember(communityMember.id)
          }}
          communityMembers={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No members found." />
      )}
    </UiStack>
  )
}
