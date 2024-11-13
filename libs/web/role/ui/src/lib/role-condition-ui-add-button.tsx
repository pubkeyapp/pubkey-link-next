import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Community, Role } from '@pubkey-link/sdk'
import { IconPlus } from '@tabler/icons-react'
import { RoleConditionUiCreateWizard } from './role-condition-ui-create-wizard'

export function RoleConditionUiAddButton(props: { role: Role; community: Community }) {
  return (
    <Button
      size="xs"
      variant="light"
      leftSection={<IconPlus size={28} />}
      onClick={() =>
        modals.open({
          title: 'Add Condition',
          size: 'xl',
          children: <RoleConditionUiCreateWizard {...props} />,
        })
      }
    >
      Add Condition
    </Button>
  )
}
