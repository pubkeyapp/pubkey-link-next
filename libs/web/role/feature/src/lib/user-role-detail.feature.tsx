import { Group, Text } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { RoleConditionUiAddButton, RoleUiItem } from '@pubkey-link/web-role-ui'
import {
  UiAnchor,
  UiBack,
  UiCard,
  UiCardTitle,
  UiDebugModal,
  UiError,
  UiGroup,
  UiLoader,
  UiStack,
  UiWarning,
} from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserRoleDetailConditionsTab } from './user-role-detail-conditions.tab'
import { AddPermissionButton, UserRoleDetailPermissionsTab } from './user-role-detail-permissions.tab'
import { UserRoleDetailSettingsTab } from './user-role-detail-settings.tab'

export function UserRoleDetailFeature({ community }: { community: Community }) {
  const { roleId } = useParams<{ roleId: string }>() as { roleId: string }
  const { item, query } = useUserFindOneRole({ roleId })
  const { items: tokens } = useUserFindManyNetworkToken({ cluster: community.cluster, limit: 100 })
  const { query: botQuery, item: bot } = useUserFindOneBot({ communityId: community.id })

  const isLoading = query.isLoading || botQuery.isLoading

  return isLoading ? (
    <UiLoader />
  ) : item ? (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <RoleUiItem role={item} />
        </Group>
        <UiDebugModal data={item} />
      </UiGroup>
      <UiStack>
        <UiCard
          title={
            <UiGroup>
              <UiCardTitle>Conditions</UiCardTitle>
              <RoleConditionUiAddButton community={community} tokens={tokens} role={item} />
            </UiGroup>
          }
        >
          <UserRoleDetailConditionsTab community={community} role={item} />
        </UiCard>
        <UiCard
          title={
            <UiGroup>
              <UiCardTitle>Permissions</UiCardTitle>
              {bot ? <AddPermissionButton bot={bot} role={item} /> : null}
            </UiGroup>
          }
        >
          {bot ? (
            <UserRoleDetailPermissionsTab role={item} />
          ) : (
            <UiWarning
              title="No bot configured."
              message={
                <Text size="sm" span>
                  In order to grant permissions, you need to configure a{' '}
                  <UiAnchor to={`/c/${community.id}/discord`}>Discord bot</UiAnchor> for this community.
                </Text>
              }
            />
          )}
        </UiCard>
        <UiCard title="Settings">
          <UserRoleDetailSettingsTab roleId={roleId} />
        </UiCard>
      </UiStack>
    </UiStack>
  ) : (
    <UiError message="Role not found." />
  )
}
