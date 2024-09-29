import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { UserUiAvatar } from './user-ui-avatar'
import { UserUiUsername } from './user-ui-username'

export function UserUiItem({
  anchorProps,
  avatarProps,
  children,
  groupProps,
  user,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  children?: ReactNode
  user?: User
  to?: string | null
}) {
  if (!user) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps} display="inline-flex">
      <Group gap="sm" {...groupProps} wrap="nowrap">
        <UserUiAvatar user={user} {...avatarProps} />
        <Stack gap={1}>
          <UserUiUsername user={user} />
          {children ? (
            children
          ) : user.name ? (
            <Text size="sm" c="dimmed">
              {user.name}
            </Text>
          ) : null}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
