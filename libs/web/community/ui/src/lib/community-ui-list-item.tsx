import { Box, Paper, Text } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { RoleUiListWithAssets } from '@pubkey-link/web-role-ui'
import { UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Suspense } from 'react'
import { CommunityUiItem } from './community-ui-item'
import { CommunityUiSocials } from './community-ui-socials'

export function CommunityUiListItem({
  isAuthUser,
  item,
  to,
  username,
}: {
  isAuthUser: boolean
  item: Community
  to?: string
  username: string
}) {
  const rolesAssigned = item.roles?.filter((role) => role.member)
  const rolesAvailable = item.roles?.filter((role) => !role.member)
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={item} to={to} />
          <UiStack align="end">
            <CommunityUiSocials community={item}>
              <AppUiDebugModal data={item} />
            </CommunityUiSocials>
          </UiStack>
        </UiGroup>
        <Suspense fallback={<UiLoader />}>
          <Box>
            <Text fz="sm" c="dimmed">
              Roles assigned to {isAuthUser ? 'you' : username}
            </Text>
            {rolesAssigned?.length ? (
              <RoleUiListWithAssets mt="xs" roles={rolesAssigned} username={username} />
            ) : (
              <UiInfo
                mt="xs"
                title="No roles assigned"
                message={`${isAuthUser ? 'You have' : `${username} has`} no assigned roles in this community.`}
              />
            )}
          </Box>
          <Box>
            <Text fz="sm" c="dimmed">
              Available roles
            </Text>
            {rolesAvailable?.length ? (
              <RoleUiListWithAssets mt="xs" roles={rolesAvailable} username={username} />
            ) : (
              <UiInfo message="No inactive roles." />
            )}
          </Box>
        </Suspense>
      </UiStack>
    </Paper>
  )
}
