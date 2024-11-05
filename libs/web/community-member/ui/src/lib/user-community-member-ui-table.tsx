import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CommunityMember } from '@pubkey-link/sdk'
import { useUserFindOneCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { RoleUiItem } from '@pubkey-link/web-role-ui'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { CommunityMemberUiAdminBadge } from './community-member-ui-admin-badge'
import { UserCommunityMemberUiUpdateForm } from './user-community-member-ui-update-form'

export function UserCommunityMemberUiTable({
  deleteCommunityMember,
  communityMembers = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
  refresh,
}: {
  deleteCommunityMember: (communityMember: CommunityMember) => void
  communityMembers: CommunityMember[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
  refresh: () => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'user',
            render: (item) =>
              item.user ? (
                <UserUiItem user={item.user} to={item.user.profileUrl}>
                  <CommunityMemberUiAdminBadge size="xs" member={item} />
                </UserUiItem>
              ) : null,
          },
          {
            accessor: 'roles',
            render: (item) => (
              <Group gap="xs">
                {item.roles?.map((role) => (
                  <Anchor key={role.id} component={Link} to={`../roles/${role.id}`} size="sm" fw={500}>
                    <RoleUiItem avatarProps={{ size: 'sm' }} textProps={{ fz: 'sm' }} role={role} />
                  </Anchor>
                ))}
              </Group>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <AppUiDebugModal data={item} />
                <ActionIcon
                  color="brand"
                  variant="light"
                  size="sm"
                  onClick={() =>
                    modals.open({
                      centered: true,
                      title: `Edit ${item.user?.username}`,
                      children: <UserCommunityMemberUiUpdateModal item={item} refresh={refresh} />,
                    })
                  }
                >
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteCommunityMember(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={communityMembers}
      />
    </ScrollArea>
  )
}

function UserCommunityMemberUiUpdateModal({ item, refresh }: { item: CommunityMember; refresh: () => void }) {
  const { updateCommunityMember } = useUserFindOneCommunityMember({ communityMemberId: item.id })

  return (
    <UserCommunityMemberUiUpdateForm
      communityMember={item}
      submit={(value) =>
        updateCommunityMember(value).then((res) => {
          refresh()
          modals.closeAll()
          return res
        })
      }
    />
  )
}
