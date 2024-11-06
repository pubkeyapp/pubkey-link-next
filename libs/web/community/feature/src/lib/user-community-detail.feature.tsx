import { Badge, Group } from '@mantine/core'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { CommunityUiAdminIcon, CommunityUiItem } from '@pubkey-link/web-community-ui'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { NetworkUiClusterBadge } from '@pubkey-link/web-network-ui'
import { UiBack, UiContainer, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { CommunityDashboardMemberCardRoles } from './community-dashboard-member-card-roles'
import { UserCommunityDetailFeatureAdmin } from './user-community-detail-feature-admin'

export function UserCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, communityAdmin, isLoading, member } = useUserFindOneCommunity({ communityId })

  if (isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return <UiError message="Community not found." />
  }

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
            <CommunityUiAdminIcon community={item} />
            <AppUiDebugModal data={{ item, communityAdmin, communityId, member }} />
            <NetworkUiClusterBadge cluster={item.cluster} />
          </Group>
        </UiGroup>
        {member?.admin ? (
          <UserCommunityDetailFeatureAdmin communityAdmin={!!communityAdmin} communityId={communityId} item={item} />
        ) : (
          <CommunityDashboardMemberCardRoles community={item} />
        )}
      </UiStack>
    </UiContainer>
  )
}
