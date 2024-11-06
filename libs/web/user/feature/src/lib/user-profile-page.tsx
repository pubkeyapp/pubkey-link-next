import { Divider, Group, Stack } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { IdentityUiIconGroup } from '@pubkey-link/web-identity-ui'
import { UserUiAdminIcon, UserUiProfileItem } from '@pubkey-link/web-user-ui'
import { UiContainer, UiStack } from '@pubkey-ui/core'
import { UserProfileTabs } from './user-profile-tabs'

export function UserProfilePage({ isAuthUser, user }: { isAuthUser: boolean; user: User }) {
  return (
    <UiContainer size={800}>
      <UiStack>
        <UserUiProfileItem user={user} isAuthUser={isAuthUser} my="md">
          {user.private && !isAuthUser ? null : (
            <Stack align="center" w="100%">
              <Divider label="Verified identities" mt="sm" w="50%" />
              <IdentityUiIconGroup identities={user.identities ?? []} />
            </Stack>
          )}
        </UserUiProfileItem>
        <UserProfileTabs user={user} isAuthUser={isAuthUser} />
        <Group justify="center" gap="xs">
          <AppUiDebugModal data={{ user }} />
          <UserUiAdminIcon user={user} />
        </Group>
      </UiStack>
    </UiContainer>
  )
}
