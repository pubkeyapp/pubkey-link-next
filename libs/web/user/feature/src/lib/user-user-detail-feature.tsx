import { Button, Group, Stack, Text } from '@mantine/core'
import { AppFeature, ellipsify, UserRole } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { AppUiDebugModal, UiGrid } from '@pubkey-link/web-core-ui'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityRefreshIcon, IdentityUiIcon, IdentityUiLink } from '@pubkey-link/web-identity-ui'
import { UserNetworkTokenFeature } from '@pubkey-link/web-network-token-feature'
import { useUserFineOneUser } from '@pubkey-link/web-user-data-access'
import { UserUiProfile } from '@pubkey-link/web-user-ui'
import {
  UiCard,
  UiContainer,
  UiGroup,
  UiInfo,
  UiLoader,
  UiStack,
  UiTabRoutes,
  UiTime,
  UiWarning,
} from '@pubkey-ui/core'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserPubkeyProfileFeature } from './user-pubkey-profile-feature'
import { UserUserDetailCommunityFeature } from './user-user-detail-community-feature'

export function UserUserDetailFeature() {
  const { user: authUser, isDeveloper } = useAuth()
  const { hasFeature } = useAppConfig()
  const { username } = useParams<{ username: string }>() as { username: string }
  const { user, query } = useUserFineOneUser({ username })
  const { items, refreshIdentity } = useUserFindManyIdentity({ username })
  const hasPubkeyProtocol = hasFeature(AppFeature.PubkeyProtocol)

  const tabs = useMemo(() => {
    const res = [
      {
        path: 'communities',
        label: 'Communities',
        element: <UserUserDetailCommunityFeature username={username} />,
      },
      {
        path: 'assets',
        label: 'Assets',
        element: <UserNetworkTokenFeature username={username} />,
      },
    ]
    if (hasPubkeyProtocol) {
      res.unshift({
        path: 'profile',
        label: 'Profile',
        element: <UserPubkeyProfileFeature username={username} />,
      })
    }
    return res
  }, [hasPubkeyProtocol, username])

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }
  const isAuthAdmin = authUser?.role === UserRole.Admin
  const isSelf = authUser?.id === user.id

  return (
    <UiContainer>
      <UiGrid
        sidebar={
          <UiStack>
            <UserUiProfile
              user={user}
              action={
                <Group>
                  {isAuthAdmin ? (
                    <Button size="xs" variant="light" component={Link} to={`/admin/users/${user.id}`}>
                      Manage
                    </Button>
                  ) : null}
                  {isDeveloper ? (
                    <Button size="xs" variant="light" component={Link} to={`/p/${user.username}`}>
                      New Profile
                    </Button>
                  ) : null}
                </Group>
              }
            />
            {items?.map((identity) => (
              <UiCard key={identity.id} p="xs">
                <UiGroup align="center">
                  <Group gap="xs">
                    <IdentityUiIcon size={28} provider={identity.provider} />
                    <Stack gap={0}>
                      <Text size="sm" fw="bold">
                        {ellipsify(identity.name, 8)}
                      </Text>
                      {identity.syncEnded ? (
                        <UiTime size="xs" c="dimmed" prefix="Synced " date={new Date(identity.syncEnded)} />
                      ) : (
                        <Text size="xs" c="dimmed">
                          Not synced
                        </Text>
                      )}
                    </Stack>
                  </Group>
                  <Group gap={2}>
                    <IdentityRefreshIcon item={identity} onClick={refreshIdentity} />
                    <AppUiDebugModal data={identity} />
                    <IdentityUiLink item={identity} />
                  </Group>
                </UiGroup>
              </UiCard>
            ))}
            {isSelf && (
              <Group justify="flex-end">
                <Button size="xs" variant="light" component={Link} to="/settings">
                  Manage Identities
                </Button>
              </Group>
            )}
          </UiStack>
        }
      >
        {user.private && !isSelf ? (
          <UiInfo message='This user has set their profile to "private".' title="Private Profile" />
        ) : (
          <UiStack>
            <UiTabRoutes tabs={tabs} />
          </UiStack>
        )}
      </UiGrid>
    </UiContainer>
  )
}
