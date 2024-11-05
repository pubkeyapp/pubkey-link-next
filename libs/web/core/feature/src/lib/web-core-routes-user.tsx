import { UserCommunityFeature } from '@pubkey-link/web-community-feature'
import { DashboardFeature } from '@pubkey-link/web-dashboard-feature'
import { DevProfileRoutes } from '@pubkey-link/web-dev-feature'
import { UserNetworkAssetDetailFeature } from '@pubkey-link/web-network-asset-feature'
import { SettingsFeature } from '@pubkey-link/web-settings-feature'
import { SolanaFeature } from '@pubkey-link/web-solana-feature'
import { UserFeature } from '@pubkey-link/web-user-feature'
import { UiDashboardItem } from '@pubkey-ui/core'
import { IconSettings, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/c' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/assets/:cluster/:account/*', element: <UserNetworkAssetDetailFeature /> },
  { path: '/c/*', element: <UserCommunityFeature /> },
  { path: '/dashboard', element: <DashboardFeature links={links} /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '/p/*', element: <DevProfileRoutes /> },
  { path: '/users', element: <Navigate to="/u" replace /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}
