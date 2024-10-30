import { Paper } from '@mantine/core'
import { NetworkTokenType, RoleCondition, UserUpdateRoleConditionInput } from '@pubkey-link/sdk'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { UiAlert, UiDebug, UiInfo, UiStack } from '@pubkey-ui/core'
import { RoleConditionUiSettingsItem } from './role-condition-ui-settings-item'
import { RoleConditionUiUpdateFormFungible } from './role-condition-ui-update-form-fungible'
import { RoleConditionUiUpdateFormNonFungible } from './role-condition-ui-update-form-non-fungible'

export function RoleConditionUiSettings({ condition }: { condition: RoleCondition }) {
  const { deleteRoleCondition, updateRoleCondition } = useUserFindOneRole({ roleId: condition.roleId! })
  function update(input: UserUpdateRoleConditionInput) {
    return updateRoleCondition(condition.id, {
      ...input,
      config: input.config ? JSON.parse(input.config) : undefined,
      filters: input.filters ? JSON.parse(input.filters) : undefined,
    })
  }

  switch (condition.type) {
    case NetworkTokenType.NonFungible:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <UiStack>
            <RoleConditionUiSettingsItem condition={condition} />
            <RoleConditionUiUpdateFormNonFungible item={condition} submit={update} />
          </UiStack>
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    case NetworkTokenType.Fungible:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <UiStack>
            <RoleConditionUiSettingsItem condition={condition} />
            <RoleConditionUiUpdateFormFungible item={condition} submit={update} />
          </UiStack>
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    case NetworkTokenType.Validator:
      return condition.token ? (
        <Paper withBorder p="md" radius="sm" shadow="md">
          <UiStack>
            <RoleConditionUiSettingsItem condition={condition} />
            <UiInfo variant="outline" message="This condition has no configuration options" />
          </UiStack>
        </Paper>
      ) : (
        <UiDebug data={condition} />
      )
    default:
      return (
        <UiStack>
          <UiAlert message="Unknown condition type" />
          <UiDebug data={condition} open />
        </UiStack>
      )
  }
}
