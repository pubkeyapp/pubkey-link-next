import { Button, Group } from '@mantine/core'
import { Bot } from '@pubkey-link/sdk'
import { useUserManageBot } from '@pubkey-link/web-bot-data-access'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'

export function UserBotCommands({ bot }: { bot: Bot }) {
  const { startBot, starting, stopBot, stopping } = useUserManageBot({ bot })

  return (
    <Group gap="xs">
      <AppUiDebugModal data={bot} />
      <Button size="xs" disabled={bot.started ?? true} loading={starting} onClick={() => startBot()}>
        Start
      </Button>
      <Button size="xs" disabled={!bot.started ?? true} loading={stopping} onClick={() => stopBot()}>
        Stop
      </Button>
      <Button
        size="xs"
        component="a"
        href={bot.developersUrl}
        target="_blank"
        rel="noopener noreferrer"
        disabled={!bot.developersUrl}
      >
        Manage
      </Button>
      <Button
        size="xs"
        component="a"
        href={bot.inviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        disabled={!bot.inviteUrl}
      >
        Invite
      </Button>
    </Group>
  )
}
