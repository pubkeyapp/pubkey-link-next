import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { NetworkResolver, NetworkTokenType, User, UserRole } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyCommunity, useUserGetCommunities } from '@pubkey-link/web-community-data-access'
import { CommunityUiList } from '@pubkey-link/web-community-ui'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { AppUiDebugModal, UiAbout, UiEmptyState } from '@pubkey-link/web-core-ui'
import { UserNetworkAssetFeature } from '@pubkey-link/web-network-asset-feature'
import { ProfileSettingsIdentitiesFeature, ProfileSettingsUpdateFeature } from '@pubkey-link/web-settings-feature'
import { useUserFineOneUser } from '@pubkey-link/web-user-data-access'
import { UiCard, UiContainer, UiInfo, UiLoader, UiStack, UiTabRoute, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { IconLock, IconShield } from '@tabler/icons-react'
import { Link, useParams } from 'react-router-dom'
import { UserUiProfileItem } from './user-ui-profile-item'

export function DevProfile() {
  const { username } = useParams<{ username: string }>() as { username: string }

  return username ? (
    <UiContainer size={800}>
      <DevUserLoader username={username} />
    </UiContainer>
  ) : null
}

function DevUserLoader({ username }: { username: string }) {
  const { isAuthUser, user, query } = useUserFineOneUser({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }

  return <DevUser user={user} isAuthUser={isAuthUser} />
}

function DevUser({ isAuthUser, user }: { isAuthUser: boolean; user: User }) {
  return (
    <UiContainer size={800}>
      <UiStack>
        <UserUiProfileItem user={user} isAuthUser={isAuthUser} my="md" />
        <DevUserTabs user={user} isAuthUser={isAuthUser} />
        <Group justify="center" gap="xs">
          <AppUiDebugModal data={{ user }} />
          <UserUiAdminIcon user={user} />
        </Group>
      </UiStack>
    </UiContainer>
  )
}

function UserUiAdminIcon({ user }: { user: User }) {
  const { user: authUser } = useAuth()
  const isAuthAdmin = authUser?.role === UserRole.Admin

  if (!isAuthAdmin) {
    return null
  }

  return (
    <Tooltip label="User administration" withArrow position="top">
      <ActionIcon size="sm" variant="light" component={Link} to={`/admin/users/${user.id}`}>
        <IconShield size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

function DevUserTabs({ isAuthUser, user }: { isAuthUser: boolean; user: User }) {
  const { hasResolver } = useAppConfig()
  const username = user.username as string

  if (user?.private && !isAuthUser) {
    return (
      <UiCard py="xl">
        <UiEmptyState icon={IconLock} title="Private Profile" message="This user has set their profile to private." />
      </UiCard>
    )
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'communities',
      label: 'Communities',
      element: <DevUserTabCommunities username={username} isAuthUser={isAuthUser} />,
    },
  ]

  if (hasResolver(NetworkResolver.SolanaNonFungible)) {
    tabs.push({
      path: 'collectibles',
      label: 'Collectibles',
      element: <DevUserTabAssetNonFungible username={username} />,
    })
  }

  if (hasResolver(NetworkResolver.SolanaFungible)) {
    tabs.push({
      path: 'tokens',
      label: 'Tokens',
      element: <DevUserTabAssetsFungible username={username} />,
    })
  }

  if (isAuthUser) {
    tabs.push(
      { path: 'settings', label: 'Settings', element: <ProfileSettingsUpdateFeature /> },
      { path: 'identities', label: 'Identities', element: <ProfileSettingsIdentitiesFeature /> },
    )
  }

  return <UiTabRoutes tabs={tabs} />
}

function useUserCommunitiesMap({ username }: { username: string }) {
  const { items: all } = useUserFindManyCommunity({ limit: 100, withRoles: true })
  const { items: user } = useUserGetCommunities({ username })

  return {
    user,
    other: all.filter((item) => !user.find((userItem) => userItem.id === item.id)),
  }
}

function DevUserTabCommunities({ isAuthUser, username }: { isAuthUser: boolean; username: string }) {
  const map = useUserCommunitiesMap({ username })

  return (
    <UiStack>
      <UiCard title="Communities">
        {map.user?.length ? (
          <>
            <UiAbout
              title={isAuthUser ? 'Your Communities' : `Communities for ${username}`}
              content={`These are the communities ${isAuthUser ? 'you are' : `${username} is`} a member of.`}
            />
            <CommunityUiList communities={map.user} username={username} />
          </>
        ) : (
          <UiInfo
            title="No communities found."
            message={`${isAuthUser ? 'You have' : `${username} has`} no assigned roles in any community.`}
          />
        )}
        <UiAbout
          title={`Other Communities`}
          content={`These are the communities ${isAuthUser ? 'you are' : `${username} is`} not a member of.`}
        />
        <CommunityUiList communities={map.other} username={username} />
      </UiCard>
      <AppUiDebugModal data={map} />
    </UiStack>
  )
}

function DevUserTabAssetNonFungible({ username }: { username: string }) {
  return (
    <UiCard title="Collectibles">
      <UserNetworkAssetFeature username={username} type={NetworkTokenType.NonFungible} />
    </UiCard>
  )
}
function DevUserTabAssetsFungible({ username }: { username: string }) {
  return (
    <UiCard title="Tokens">
      <UserNetworkAssetFeature username={username} type={NetworkTokenType.Fungible} />
    </UiCard>
  )
}
