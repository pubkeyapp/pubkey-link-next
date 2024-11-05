import { ActionIcon, Anchor, Group, ScrollArea, Stack, Switch, Text } from '@mantine/core'
import { ellipsify, Identity } from '@pubkey-link/sdk'
import { IdentityUiAvatar } from '@pubkey-link/web-core-ui'
import { UiCopy, UiDebugModal } from '@pubkey-ui/core'
import { IconRefresh, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

interface AdminIdentityTableProps {
  identities: Identity[]
  deleteIdentity: (identity: Identity) => void
  setIdentityVerified: (identity: Identity, verified: boolean) => void
  syncIdentity: (identity: Identity) => void
}

export function AdminIdentityUiTable({
  deleteIdentity,
  identities = [],
  setIdentityVerified,
  syncIdentity,
}: AdminIdentityTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'identity',
            render: (item) => {
              return (
                <Group gap="sm" p={4}>
                  <IdentityUiAvatar item={item} />
                  <Stack gap={0}>
                    <Anchor size="lg" fw={500} component="a" href={item.url ?? ''} target="_blank" rel="noreferrer">
                      {ellipsify(item.name, 20)}
                    </Anchor>
                    <Text size="sm" c="dimmed">
                      {item.provider}
                    </Text>
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'verified',
            textAlign: 'center',
            width: '100px',
            render: (item) => (
              <Group justify="center">
                <Switch
                  size="xs"
                  checked={!!item.verified}
                  onChange={(event) => setIdentityVerified(item, event.currentTarget.checked)}
                />
              </Group>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            width: '125px',
            render: (item) => (
              <Group gap="xs" justify="right" wrap="nowrap">
                <UiDebugModal data={item} />
                <UiCopy text={item.providerId} tooltip="Copy the providerId" />
                <ActionIcon
                  variant="light"
                  size="sm"
                  onClick={() => {
                    syncIdentity(item)
                  }}
                >
                  <IconRefresh size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  size="sm"
                  color="red"
                  onClick={() => {
                    if (!window.confirm('Are you sure?')) return
                    deleteIdentity(item)
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={identities}
      />
    </ScrollArea>
  )
}
