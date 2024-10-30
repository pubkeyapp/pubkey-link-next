import { ActionIcon } from '@mantine/core'
import { RoleCondition } from '@pubkey-link/sdk'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { UiGroup } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'

export function RoleConditionUiSettingsItem({ condition }: { condition: RoleCondition }) {
  const { deleteRoleCondition } = useUserFindOneRole({ roleId: condition.roleId! })

  return (
    <UiGroup>
      <NetworkTokenUiItem networkToken={condition.token} />
      <ActionIcon
        onClick={() => {
          if (!window.confirm('Are you sure you want to delete this condition?')) {
            return
          }
          return deleteRoleCondition(condition.id)
        }}
        variant="light"
        color="red"
        size="xs"
      >
        <IconTrash />
      </ActionIcon>
    </UiGroup>
  )
}
