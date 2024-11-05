import { Community } from '@pubkey-link/sdk'
import { UiInfo, UiStack } from '@pubkey-ui/core'
import { CommunityUiListItem } from './community-ui-list-item'

export function CommunityUiList({ communities, username }: { communities: Community[]; username: string }) {
  if (!communities.length) {
    return <UiInfo title="No communities found." message={`${username} has no assigned roles in any community.`} />
  }
  return (
    <UiStack>
      {communities
        .filter((item) => item.roles?.length)
        .map((item) => (
          <CommunityUiListItem key={item.id} item={item} to={`/c/${item.id}`} username={username} />
        ))}
    </UiStack>
  )
}
