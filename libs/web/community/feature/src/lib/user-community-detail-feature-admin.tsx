import { AppFeature, Community } from '@pubkey-link/sdk'
import { UserBotFeature } from '@pubkey-link/web-bot-feature'
import { UserCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { UiIcon } from '@pubkey-link/web-core-ui'
import { UserLogFeature } from '@pubkey-link/web-log-feature'
import { UserRoleFeature } from '@pubkey-link/web-role-feature'
import { UserSnapshotFeature } from '@pubkey-link/web-snapshot-feature'
import { UiGridRoute, UiGridRoutes } from '@pubkey-ui/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { lazy } from 'react'

const RouteDashboard = lazy(() => import('./user-community-detail-dashboard.tab'))
const RouteSettings = lazy(() => import('./user-community-detail-settings.tab'))

export function UserCommunityDetailFeatureAdmin({
  communityAdmin,
  communityId,
  item,
}: {
  communityAdmin: boolean
  communityId: string
  item: Community
}) {
  const { hasFeature } = useAppConfig()

  const hasSnapshots = hasFeature(AppFeature.CommunitySnapshots)

  const routes: UiGridRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      element: <RouteDashboard community={item} />,
      leftSection: <UiIcon type="dashboard" size={20} />,
    },
    communityAdmin && {
      path: 'discord',
      label: 'Discord',
      element: <UserBotFeature community={item} />,
      leftSection: <IconBrandDiscord size={20} />,
    },
    communityAdmin && {
      path: 'roles',
      label: 'Roles',
      element: <UserRoleFeature community={item} />,
      leftSection: <UiIcon type="roles" size={20} />,
    },
    communityAdmin && {
      path: 'members',
      label: 'Members',
      element: <UserCommunityMemberFeature community={item} />,
      leftSection: <UiIcon type="users" size={20} />,
    },
    communityAdmin &&
      hasSnapshots && {
        label: 'Snapshots',
        path: 'snapshots',
        element: <UserSnapshotFeature communityId={item.id} />,
        leftSection: <UiIcon type="snapshot" size={20} />,
      },
    communityAdmin && {
      label: 'Logs',
      path: 'logs',
      element: <UserLogFeature communityId={item.id} />,
      leftSection: <UiIcon type="logs" size={20} />,
    },
    communityAdmin && {
      path: 'settings',
      label: 'Settings',
      element: <RouteSettings community={item} />,
      leftSection: <UiIcon type="settings" size={20} />,
    },
  ].filter(Boolean) as UiGridRoute[]

  return <UiGridRoutes basePath={`/c/${communityId}`} routes={routes} />
}
