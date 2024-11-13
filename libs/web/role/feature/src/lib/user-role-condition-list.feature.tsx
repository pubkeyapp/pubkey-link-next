import { Accordion, Text } from '@mantine/core'
import { Community, Role } from '@pubkey-link/sdk'

import { RoleConditionUiItem, RoleConditionUiPanel } from '@pubkey-link/web-role-ui'
import { UiStack } from '@pubkey-ui/core'

export function UserRoleConditionListFeature(props: { role: Role; community: Community }) {
  const conditions = props.role.conditions ?? []
  return (
    <UiStack>
      <Text size="sm">The following conditions must be satisfied to receive the permissions below.</Text>
      <Accordion multiple variant="separated" defaultValue={[...conditions.map((condition) => condition.id)]}>
        {conditions?.map((condition) => (
          <Accordion.Item key={condition.id} value={condition.id}>
            <Accordion.Control>
              <RoleConditionUiItem type={condition.type} />
            </Accordion.Control>
            <Accordion.Panel>
              <RoleConditionUiPanel condition={condition} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </UiStack>
  )
}
