import { Group } from '@mantine/core'
import { AppFeature } from '@pubkey-link/sdk'
import { AdminBotFeature } from '@pubkey-link/web-bot-feature'
import { useAdminFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { AdminCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { AdminLogFeature } from '@pubkey-link/web-log-feature'
import { AdminRoleFeature } from '@pubkey-link/web-role-feature'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminCommunityDetailOverviewTab } from './admin-community-detail-overview.tab'
import { AdminCommunityDetailSettingsTab } from './admin-community-detail-settings.tab'

export function AdminCommunityDetailFeature() {
  const { hasFeature } = useAppConfig()
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }

  const { item, query } = useAdminFindOneCommunity({ communityId })

  const hasSnapshots = hasFeature(AppFeature.CommunitySnapshots)

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'overview',
      label: 'Overview',
      element: <AdminCommunityDetailOverviewTab communityId={communityId} />,
    },
    {
      path: 'roles',
      label: 'Roles',
      element: <AdminRoleFeature communityId={communityId} />,
    },
    { path: 'logs', label: 'Logs', element: <AdminLogFeature communityId={communityId} /> },
    { path: 'bots', label: 'Bots', element: <AdminBotFeature communityId={communityId} /> },
    {
      path: 'members',
      label: 'Members',
      element: <AdminCommunityMemberFeature communityId={communityId} />,
    },
    hasSnapshots && {
      path: 'snapshots',
      label: 'Snapshots',
      element: <AdminCommunityDetailOverviewTab communityId={communityId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminCommunityDetailSettingsTab communityId={communityId} />,
    },
  ].filter(Boolean) as UiTabRoute[]

  return (
    <UiPage
      title={
        <Group>
          <CommunityUiItem community={item} to={`/c/${item.id}`} />
        </Group>
      }
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
