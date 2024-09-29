import { ActionIcon, Alert, Group, ScrollArea } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { IdentityUiAvatarGroup } from '@pubkey-link/web-core-ui'
import { UiTime } from '@pubkey-ui/core'
import { IconParking, IconPencil, IconTrash, IconUser } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { UserUiItem } from './user-ui-item'
import { UserUiRoleBadge } from './user-ui-role-badge'
import { UserUiStatusBadge } from './user-ui-status-badge'

interface AdminUserTableProps {
  users: User[]
  deleteUser: (user: User) => void
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
  verifyUser: (user: User) => Promise<void>
}

export function AdminUserUiTable({
  deleteUser,
  users = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
  verifyUser,
}: AdminUserTableProps) {
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
            accessor: 'username',
            render: (item) => <UserUiItem user={item} to={`/admin/users/${item.id}`} />,
          },
          {
            accessor: 'identities',
            textAlign: 'right',
            width: '20%',
            render: (item) => (
              <Group justify="right">
                {item.identities?.length ? (
                  <IdentityUiAvatarGroup identities={item.identities ?? []} />
                ) : (
                  <Alert color="red" py={4} px="xs">
                    No Identities
                  </Alert>
                )}
              </Group>
            ),
          },
          {
            accessor: 'role',
            textAlign: 'center',
            width: '10%',
            render: (item) => (item.role ? <UserUiRoleBadge role={item.role} /> : null),
          },
          {
            accessor: 'status',
            textAlign: 'center',
            width: '10%',
            render: (item) => (item.status ? <UserUiStatusBadge status={item.status} /> : null),
          },
          {
            accessor: 'lastLogin',
            render: (item) => (item.lastLogin ? <UiTime date={new Date(item.lastLogin)} /> : null),
          },
          {
            accessor: 'createdAt',
            render: (item) => (item.createdAt ? <UiTime date={new Date(item.createdAt)} /> : null),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            width: '10%',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right" wrap="nowrap">
                <ActionIcon size="sm" variant="light" color="blue" onClick={() => verifyUser(item)}>
                  <IconParking size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="light" color="brand" component={Link} to={item.profileUrl}>
                  <IconUser size={16} />
                </ActionIcon>
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="brand"
                  component={Link}
                  to={`/admin/users/${item.id}/settings`}
                >
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="light" color="red" onClick={() => deleteUser(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={users}
      />
    </ScrollArea>
  )
}
