import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { CommunityMember } from '@pubkey-link/sdk'
import { RuleUiItem } from '@pubkey-link/web-rule-ui'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { UiDebugModal } from '@pubkey-ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { CommunityMemberUiRole } from './community-member-ui-role'

export function UserCommunityMemberUiTable({
  deleteCommunityMember,
  communityMembers = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteCommunityMember: (communityMember: CommunityMember) => void
  communityMembers: CommunityMember[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
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
            render: (item) => (item.user ? <UserUiItem user={item.user} to={item.user.profileUrl} /> : null),
          },
          {
            accessor: 'rules',
            render: (item) => (
              <Group gap="xs">
                {item.rules?.map((rule) => (
                  <Anchor key={rule.id} component={Link} to={`../rules/${rule.id}`} size="sm" fw={500}>
                    <RuleUiItem avatarProps={{ size: 'sm' }} textProps={{ fz: 'sm' }} rule={rule} />
                  </Anchor>
                ))}
              </Group>
            ),
          },
          {
            accessor: 'role',
            render: (item) => (
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                <CommunityMemberUiRole role={item.role} />
              </Anchor>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <UiDebugModal data={item} />
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
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
