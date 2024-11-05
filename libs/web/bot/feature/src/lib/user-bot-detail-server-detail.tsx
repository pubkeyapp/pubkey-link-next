import { Button, Group } from '@mantine/core'
import { Bot, DiscordServer } from '@pubkey-link/sdk'
import { useUserGetBotServer, useUserManageBot } from '@pubkey-link/web-bot-data-access'
import { AppUiDebugModal, UiDiscordServerItem } from '@pubkey-link/web-core-ui'
import { UiAlert, UiCard, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { UserBotDetailRolesTab } from './user-bot-detail-roles-tab'
import { UserBotDetailServerRoles } from './user-bot-detail-server-roles'
import { UserBotDetailServerSettings } from './user-bot-detail-server-settings'

export function UserBotDetailServerDetail({ bot }: { bot: Bot }) {
  const { serverId } = useParams() as { serverId: string }
  const navigate = useNavigate()
  const query = useUserGetBotServer({ botId: bot.id, serverId })
  const { leaveServer } = useUserManageBot({ bot })
  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.item) {
    return <UiAlert message="Bot not found." />
  }

  const item: DiscordServer = query.data.item

  return (
    <UiStack>
      <UiCard>
        <UiGroup>
          <Group>
            <UiDiscordServerItem server={item} />
          </Group>
          <Group justify="end">
            <AppUiDebugModal data={item} />
            <Button
              size="xs"
              color="red"
              variant="outline"
              onClick={() => {
                if (!window.confirm('Are you sure you want to leave this server?')) {
                  return
                }
                return leaveServer(item.id).then(() => navigate('..'))
              }}
            >
              Leave Server
            </Button>
          </Group>
        </UiGroup>
      </UiCard>
      <UiTabRoutes
        tabs={[
          {
            path: 'server-settings',
            label: 'Server Settings',
            element: <UserBotDetailServerSettings botId={bot.id} serverId={serverId} />,
          },
          {
            path: 'permissions',
            label: 'Permissions',
            element: <UserBotDetailRolesTab bot={bot} serverId={serverId} />,
          },
          {
            path: 'server-roles',
            label: 'Server Roles',
            element: <UserBotDetailServerRoles botId={bot.id} serverId={serverId} />,
          },
        ]}
      />
    </UiStack>
  )
}
