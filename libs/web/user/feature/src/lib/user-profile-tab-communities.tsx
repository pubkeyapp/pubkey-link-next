import { useUserGetCommunities } from '@pubkey-link/web-community-data-access'
import { CommunityUiList } from '@pubkey-link/web-community-ui'
import { UiInfo, UiLoader } from '@pubkey-ui/core'

export default function UserProfileTabCommunities({ isAuthUser, username }: { isAuthUser: boolean; username: string }) {
  const { items, isLoading } = useUserGetCommunities({ username })
  return isLoading ? (
    <UiLoader />
  ) : items?.length ? (
    <CommunityUiList communities={items} isAuthUser={isAuthUser} username={username} />
  ) : (
    <UiInfo
      title="No communities found."
      message={`${isAuthUser ? 'You have' : `${username} has`} is not a member of any communities`}
    />
  )
}
