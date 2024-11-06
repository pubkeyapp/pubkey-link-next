import { Group, Stack, StackProps, Text } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { ReactNode } from 'react'

import { Link } from 'react-router-dom'
import { UserUiAvatar } from './user-ui-avatar'
import { UserUiUsername } from './user-ui-username'

export function UserUiProfileItem({
  children,
  isAuthUser,
  user,
  ...props
}: StackProps & { children: ReactNode; isAuthUser: boolean; user: User }) {
  return (
    <Stack {...props}>
      <Group justify="center">
        <Stack gap="xs" align="center" w="100%">
          <UserUiAvatar user={user} size="xl" />
          <Stack gap={0} align="center">
            <Text component={Link} to={user.profileUrl} fz="xl" fw="bold">
              {user.name}
            </Text>
            <UserUiUsername fz="md" user={user} to={user.profileUrl} />
          </Stack>
          {children}
        </Stack>
      </Group>
    </Stack>
  )
}
