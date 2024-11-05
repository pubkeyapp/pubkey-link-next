import { Divider, Group, Stack, StackProps, Text } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { UserUiAvatar, UserUiUsername } from '@pubkey-link/web-user-ui'
import { Link } from 'react-router-dom'
import { IdentityUiIconGroup } from './identity-ui-icon-group'

export function UserUiProfileItem({ isAuthUser, user, ...props }: StackProps & { isAuthUser: boolean; user: User }) {
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
          {user.private && !isAuthUser ? null : (
            <Stack align="center" w="100%">
              <Divider label="Verified identities" mt="sm" w="50%" />
              <IdentityUiIconGroup identities={user.identities ?? []} />
            </Stack>
          )}
        </Stack>
      </Group>
    </Stack>
  )
}
