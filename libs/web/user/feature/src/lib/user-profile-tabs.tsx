import { AppFeature, NetworkResolver, User } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { UiEmptyState } from '@pubkey-link/web-core-ui'
import { UiCard, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { IconLock } from '@tabler/icons-react'
import { lazy } from 'react'

const UserProfileTabCollectiblesFeature = lazy(() => import('./user-profile-tab-collectibles'))
const UserProfileTabCommunitiesFeature = lazy(() => import('./user-profile-tab-communities'))
const UserProfileTabIdentitiesFeature = lazy(() => import('./user-profile-tab-identities'))
const UserProfileTabPubkeyFeature = lazy(() => import('./user-profile-tab-pubkey'))
const UserProfileTabSettingsFeature = lazy(() => import('./user-profile-tab-settings'))
const UserProfileTabTokensFeature = lazy(() => import('./user-profile-tab-tokens'))

export function UserProfileTabs({ isAuthUser, user }: { isAuthUser: boolean; user: User }) {
  const { hasFeature, hasResolver } = useAppConfig()
  const { isDeveloper } = useAuth()
  const hasPubkeyProtocol = hasFeature(AppFeature.PubkeyProtocol)
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
      element: <UserProfileTabCommunitiesFeature username={username} isAuthUser={isAuthUser} />,
    },
  ]

  if (hasResolver(NetworkResolver.SolanaNonFungible)) {
    tabs.push({
      path: 'collectibles',
      label: 'Collectibles',
      element: <UserProfileTabCollectiblesFeature username={username} />,
    })
  }

  if (hasResolver(NetworkResolver.SolanaFungible)) {
    tabs.push({
      path: 'tokens',
      label: 'Tokens',
      element: <UserProfileTabTokensFeature username={username} />,
    })
  }

  if (isAuthUser) {
    tabs.push(
      { path: 'identities', label: 'Identities', element: <UserProfileTabIdentitiesFeature /> },
      { path: 'settings', label: 'Settings', element: <UserProfileTabSettingsFeature /> },
    )

    if (isDeveloper && hasPubkeyProtocol) {
      tabs.push({
        path: 'pubkey',
        label: 'PubKey',
        element: <UserProfileTabPubkeyFeature username={username} />,
      })
    }
  }

  return <UiTabRoutes tabs={tabs} />
}
