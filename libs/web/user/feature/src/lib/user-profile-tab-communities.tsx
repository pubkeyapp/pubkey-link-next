import { useUserFindManyCommunity, useUserGetCommunities } from '@pubkey-link/web-community-data-access'
import { CommunityUiList } from '@pubkey-link/web-community-ui'
import { AppUiDebugModal, UiAbout } from '@pubkey-link/web-core-ui'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserProfileTabCommunities({ isAuthUser, username }: { isAuthUser: boolean; username: string }) {
  const { items: all, isLoading } = useUserFindManyCommunity({ limit: 100, withRoles: true })
  const { items: user, isLoading: userIsLoading } = useUserGetCommunities({ username })
  const other = all.filter((item) => !user.find((userItem) => userItem.id === item.id))

  return userIsLoading || isLoading ? (
    <UiLoader />
  ) : (
    <UiStack>
      {user?.length ? (
        <CommunityUiList communities={user} username={username} />
      ) : (
        <UiInfo
          title="No communities found."
          message={`${isAuthUser ? 'You have' : `${username} has`} is not a member of any communities`}
        />
      )}
      {other.length && isAuthUser ? (
        <>
          <UiAbout
            content={
              'These are the communities you are not a member of. Join their Discord and get the assets to get verified.'
            }
            title={'Other Communities'}
          />
          <CommunityUiList communities={other} username={username} />
        </>
      ) : null}

      <AppUiDebugModal data={{ user, other }} />
    </UiStack>
  )
}
