import { useUserGetCommunities } from '@pubkey-link/web-community-data-access'
import { CommunityUiList } from '@pubkey-link/web-community-ui'
import { UiInfo, UiLoader } from '@pubkey-ui/core'

export function UserUserDetailCommunityFeature({ username }: { username: string }) {
  const { items, query } = useUserGetCommunities({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!items?.length) {
    return <UiInfo title="No communities found." message={`${username} has no assigned roles in any community.`} />
  }

  return <CommunityUiList communities={items} username={username} />
}
