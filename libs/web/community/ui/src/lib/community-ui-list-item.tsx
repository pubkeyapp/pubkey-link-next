import { Button, Paper } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { RoleUiListWithAssets } from '@pubkey-link/web-role-ui'
import { UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Suspense, useState } from 'react'
import { CommunityUiItem } from './community-ui-item'
import { CommunityUiSocials } from './community-ui-socials'

export function CommunityUiListItem({ item, to, username }: { item: Community; to?: string; username: string }) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={item} to={to} />
          <UiStack align="end">
            <CommunityUiSocials community={item}>
              <AppUiDebugModal data={item} />
            </CommunityUiSocials>
            <Button
              disabled={!item?.roles?.length}
              variant="subtle"
              size="xs"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </UiStack>
        </UiGroup>
        <Suspense fallback={<UiLoader />}>
          {item?.roles?.length ? (
            showDetails ? (
              <RoleUiListWithAssets mt="xs" roles={item.roles ?? []} username={username} />
            ) : null
          ) : (
            <UiInfo message="No roles." />
          )}
        </Suspense>
      </UiStack>
    </Paper>
  )
}
