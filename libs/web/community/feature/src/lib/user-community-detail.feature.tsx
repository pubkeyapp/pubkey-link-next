import { Badge, Group } from '@mantine/core'
import { AppFeature } from '@pubkey-link/sdk'
import { UserBotFeature } from '@pubkey-link/web-bot-feature'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UserCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { UiIcon } from '@pubkey-link/web-core-ui'
import { UserLogFeature } from '@pubkey-link/web-log-feature'
import { NetworkUiClusterBadge } from '@pubkey-link/web-network-ui'
import { UserRoleFeature } from '@pubkey-link/web-role-feature'
import { UserSnapshotFeature } from '@pubkey-link/web-snapshot-feature'
import {
  UiBack,
  UiContainer,
  UiDebugModal,
  UiError,
  type UiGridRoute,
  UiGridRoutes,
  UiGroup,
  UiLoader,
  UiStack,
} from '@pubkey-ui/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { lazy } from 'react'
import { useParams } from 'react-router-dom'

const RouteDashboard = lazy(() => import('./user-community-detail-dashboard.tab'))
const RouteSettings = lazy(() => import('./user-community-detail-settings.tab'))

export function UserCommunityDetailFeature() {
  const { hasFeature } = useAppConfig()
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, isLoading, communityAdmin, member } = useUserFindOneCommunity({ communityId })

  const hasSnapshots = hasFeature(AppFeature.CommunitySnapshots)

  if (isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return <UiError message="Community not found." />
  }

  const routes: UiGridRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      element: <RouteDashboard community={item} member={member} />,
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

  return (
    <UiContainer>
      <UiStack gap="lg">
        <UiGroup>
          <Group>
            <UiBack />
            <CommunityUiItem
              community={item}
              title={
                <Badge variant="dot" color={item.enableSync ? 'lime' : 'orange'} size="xs">
                  Sync {item.enableSync ? 'Enabled' : 'Disabled'}
                </Badge>
              }
            />
          </Group>
          <Group>
            <UiDebugModal data={item} />
            <NetworkUiClusterBadge cluster={item.cluster} />
          </Group>
        </UiGroup>
        <UiGridRoutes basePath={`/c/${communityId}`} routes={routes} />
      </UiStack>
    </UiContainer>
  )
}
