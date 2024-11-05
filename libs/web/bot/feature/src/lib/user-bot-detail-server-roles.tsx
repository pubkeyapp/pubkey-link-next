import { Group, Stack, Table, Text } from '@mantine/core'
import { useUserGetBotRoles } from '@pubkey-link/web-bot-data-access'
import { AppUiDebugModal, UiDiscordRoleColor } from '@pubkey-link/web-core-ui'
import { UiAlert, UiCard, UiDebug, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconBrandDiscord } from '@tabler/icons-react'

export function UserBotDetailServerRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const { query } = useUserGetBotRoles({ botId, serverId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.items?.length) {
    return <UiAlert message="No roles found." />
  }

  const items = query.data.items

  return (
    <UiStack>
      <UiCard p={0}>
        <UiStack>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th align="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <Stack gap={1}>
                      <Text size="xl">
                        <UiDiscordRoleColor color={item.color}>{item.name}</UiDiscordRoleColor>
                      </Text>
                      <Text size="sm" c="dimmed" span>
                        <Group gap={4}>
                          <IconBrandDiscord size={16} />
                          Discord Role
                        </Group>
                      </Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td align="right">
                    <AppUiDebugModal data={item} />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </UiStack>
      </UiCard>
      <UiDebug data={items} />
    </UiStack>
  )
}
