import { ScrollArea } from '@mantine/core'
import { BotRole } from '@pubkey-link/sdk'
import { AppUiDebugModal, UiDiscordRoleColor } from '@pubkey-link/web-core-ui'
import { RoleUiItem } from '@pubkey-link/web-role-ui'
import { UiStack } from '@pubkey-ui/core'
import { DataTable } from 'mantine-datatable'

export function UserBotRoleUiTable({ roles = [] }: { roles: BotRole[] }) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            title: 'Discord Role',
            cellsStyle: () => ({
              justifyContent: 'center',
              alignItems: 'center',
            }),
            render: (item) =>
              item.serverRole ? (
                <UiDiscordRoleColor size="lg" color={item.serverRole?.color}>
                  {item.serverRole?.name}
                </UiDiscordRoleColor>
              ) : (
                item.serverRoleId
              ),
          },
          {
            accessor: 'role',
            title: 'Community Roles',
            render: (item) =>
              item?.permissions?.length ? (
                <UiStack>
                  {item?.permissions?.map((role) => (
                    <UiStack key={role.id}>
                      <RoleUiItem role={role} to={role.viewUrl} />
                    </UiStack>
                  ))}
                </UiStack>
              ) : null,
          },
          {
            accessor: 'debug',
            title: 'Debug',
            render: (item) => <AppUiDebugModal data={item} />,
          },
        ]}
        records={roles}
      />
    </ScrollArea>
  )
}
