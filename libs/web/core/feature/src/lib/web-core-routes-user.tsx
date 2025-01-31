import { UserBuyFeature } from '@pubkey-link/web-buy-feature'
import { UserCommunityFeature } from '@pubkey-link/web-community-feature'
import { DashboardFeature } from '@pubkey-link/web-dashboard-feature'
import { UserNetworkAssetDetailFeature } from '@pubkey-link/web-network-asset-feature'
import { UserListFeature, UserProfileFeature, UserProfileRedirectFeature } from '@pubkey-link/web-user-feature'
import { UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconSettings, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/c' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/assets/:cluster/:account/*', element: <UserNetworkAssetDetailFeature /> },
  { path: '/buy/*', element: <UserBuyFeature /> },
  { path: '/c/*', element: <UserCommunityFeature /> },
  { path: '/dashboard', element: <DashboardFeature links={links} /> },
  { path: '/settings/*', element: <UserProfileRedirectFeature to="settings" /> },
  { path: '/u/*', element: <UserProfileFeature /> },
  { path: '/users/*', element: <UserListFeature /> },
  { path: '*', element: <UiNotFound /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}
