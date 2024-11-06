import { useUserFindManyCommunity, useUserGetCommunities } from '@pubkey-link/web-community-data-access'
import { CommunityUiList } from '@pubkey-link/web-community-ui'
import { AppUiDebugModal, UiAbout } from '@pubkey-link/web-core-ui'
import { UiCard, UiInfo, UiStack } from '@pubkey-ui/core'

export default function UserProfileTabCommunities({ isAuthUser, username }: { isAuthUser: boolean; username: string }) {
  const { items: all } = useUserFindManyCommunity({ limit: 100, withRoles: true })
  const { items: user } = useUserGetCommunities({ username })
  const other = all.filter((item) => !user.find((userItem) => userItem.id === item.id))

  return (
    <UiStack>
      <UiCard title="Communities">
        {user?.length ? (
          <>
            <UiAbout
              title={isAuthUser ? 'Your Communities' : `Communities for ${username}`}
              content={`These are the communities ${isAuthUser ? 'you are' : `${username} is`} a member of.`}
            />
            <CommunityUiList communities={user} username={username} />
          </>
        ) : (
          <UiInfo
            title="No communities found."
            message={`${isAuthUser ? 'You have' : `${username} has`} no assigned roles in any community.`}
          />
        )}
        <UiAbout
          title={`Other Communities`}
          content={`These are the communities ${isAuthUser ? 'you are' : `${username} is`} not a member of.`}
        />
        <CommunityUiList communities={other} username={username} />
      </UiCard>
      <AppUiDebugModal data={{ user, other }} />
    </UiStack>
  )
}
