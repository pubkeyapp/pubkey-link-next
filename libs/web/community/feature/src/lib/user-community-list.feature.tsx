import { Button, Group, Stack, Text } from '@mantine/core'
import { AppFeature } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyCommunity } from '@pubkey-link/web-community-data-access'
import { CommunityUiFeatured, CommunityUiGrid } from '@pubkey-link/web-community-ui'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { AppUiDebugModal, UiSearchField } from '@pubkey-link/web-core-ui'
import { UiContainer, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserCommunityListFeature() {
  const { hasFeature } = useAppConfig()
  const { isAdmin } = useAuth()
  const { items, pagination, query, setSearch } = useUserFindManyCommunity({
    limit: 12,
  })

  return (
    <UiContainer>
      <UiStack>
        <Group>
          <UiSearchField placeholder="Search community" setSearch={setSearch} />
          <AppUiDebugModal data={items} />
          {isAdmin && hasFeature(AppFeature.CommunityCreate) ? (
            <Group>
              <Button component={Link} to="create">
                Create
              </Button>
            </Group>
          ) : null}
        </Group>

        {query.isLoading ? (
          <UiLoader />
        ) : items?.length ? (
          <CommunityUiGrid
            communities={items}
            page={pagination.page}
            totalRecords={pagination.total}
            onPageChange={pagination.setPage}
            limit={pagination.limit}
            setLimit={pagination.setLimit}
            setPage={pagination.setPage}
          />
        ) : (
          <UiStack>
            <UiInfo
              title="No communities found."
              message={
                <Stack>
                  <Text>
                    If you just joined, it may take a few minutes for your communities to appear while we index your
                    wallet and validate your access.
                  </Text>
                </Stack>
              }
            />
            {hasFeature(AppFeature.AnonCommunities) && (
              <UiGroup mx="auto">
                <CommunityUiFeatured label="Join one of these communities to get verified" />
              </UiGroup>
            )}
          </UiStack>
        )}
      </UiStack>
    </UiContainer>
  )
}
