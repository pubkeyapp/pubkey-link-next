import { Group, Text, TextProps, Tooltip } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { UiAnchor } from '@pubkey-ui/core'
import { IconLock } from '@tabler/icons-react'

export function UserUiUsername({ to, user, ...props }: TextProps & { to?: string | null; user: User }) {
  return (
    <Group gap={2} align="center">
      <UiAnchor to={to ?? undefined} underline="never">
        <Text c="dimmed" fz="md" {...props}>
          {user.username}
        </Text>
      </UiAnchor>
      {user.pubkeyProfile ? <span aria-label={'pubkey emoji'}>🅿️</span> : null}
      {user.private ? (
        <Tooltip label="Private profile">
          <Text c="dimmed" span display="flex">
            <IconLock size={14} />
          </Text>
        </Tooltip>
      ) : null}
    </Group>
  )
}
