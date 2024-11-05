import { Community } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { CommunityDashboardCardBot } from './community-dashboard-card-bot'
import { CommunityDashboardMemberCardRoles } from './community-dashboard-member-card-roles'

export default function UserCommunityDetailDashboardTab({ community }: { community: Community }) {
  return (
    <UiStack>
      <CommunityDashboardMemberCardRoles community={community} />
      <CommunityDashboardCardBot community={community} />
    </UiStack>
  )
}
