import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { AdminCommunityFeature } from '@pubkey-link/web-community-feature'
import { DevAdminRoutes } from '@pubkey-link/web-dev-feature'
import { AdminLogFeature } from '@pubkey-link/web-log-feature'
import { AdminNetworkFeature } from '@pubkey-link/web-network-feature'
import { AdminUserFeature } from '@pubkey-link/web-user-feature'
import { AdminVerifyFeature } from '@pubkey-link/web-verify-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import {
  IconBug,
  IconChartBar,
  IconCheckupList,
  IconFileText,
  IconNetwork,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react'
import { lazy } from 'react'
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom'

const AdminStatsFeature = lazy(() => import('./web-core-admin-stats'))

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/admin/communities' },
  { label: 'Logs', icon: IconFileText, to: '/admin/logs' },
  { label: 'Networks', icon: IconNetwork, to: '/admin/networks' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'Stats', icon: IconChartBar, to: '/admin/stats' },
  { label: 'Verify', icon: IconCheckupList, to: '/admin/verify' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'communities/*', element: <AdminCommunityFeature /> },
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'logs/*', element: <AdminLogFeature /> },
  { path: 'networks/*', element: <AdminNetworkFeature /> },
  { path: 'stats/*', element: <AdminStatsFeature /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: 'verify/*', element: <AdminVerifyFeature /> },
]

export default function WebCoreRoutesAdmin() {
  const { isDeveloper } = useAuth()
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <UiDashboardGrid links={links} />
          <Group justify="center" mt="lg">
            {isDeveloper && (
              <Tooltip label={'Developer Playground'} withArrow position="top">
                <ActionIcon component={Link} to="/admin/development" variant="light" size="lg">
                  <IconBug />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </UiContainer>
      ),
    },
    ...routes,
    { path: '*', element: <UiNotFound to="/admin" /> },
  ])
}
