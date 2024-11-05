import { Button } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { RoleUiListWithAssets } from '@pubkey-link/web-role-ui'
import { UiCard, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function CommunityDashboardMemberCardRoles({ community }: { community: Community }) {
  const { items, query } = useUserFindManyRole({ communityId: community.id })
  const { user, isAdmin } = useAuth()

  const filtered = items?.filter((item) => (item?.conditions ?? [])?.length > 0)

  return (
    <UiStack>
      <UiCard title="Community Roles">
        {query.isLoading ? (
          <UiLoader />
        ) : filtered?.length ? (
          <RoleUiListWithAssets mt="xs" roles={filtered ?? []} username={user?.username as string} />
        ) : (
          <UiInfo
            title="No roles found."
            message={
              <UiGroup>
                <div>This community does not have any roles.</div>
                {isAdmin ? (
                  <Button component={Link} to={'../roles/create'}>
                    Create role
                  </Button>
                ) : null}
              </UiGroup>
            }
          />
        )}
      </UiCard>
    </UiStack>
  )
}
