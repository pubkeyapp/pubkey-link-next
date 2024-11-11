import { Accordion } from '@mantine/core'
import { Role } from '@pubkey-link/sdk'
import { NetworkAssetDetailFeature } from '@pubkey-link/web-network-asset-feature'
import { UiStack, UiStackProps, UiWarning } from '@pubkey-ui/core'
import { RoleConditionUiSummary } from './role-condition-ui-summary'
import { RoleUiItem } from './role-ui-item'

export function RoleUiList({
  roles,
  username,
  withAssets = false,
  ...props
}: Omit<UiStackProps, 'children'> & { roles: Role[]; username: string; withAssets?: boolean }) {
  return (
    <UiStack {...props}>
      <Accordion variant="separated" multiple>
        {roles?.map((role) => {
          return (
            <Accordion.Item key={role.id} value={role.id}>
              <Accordion.Control>
                <RoleUiItem key={role.id} role={role} avatarProps={{ size: 'sm' }}></RoleUiItem>
              </Accordion.Control>
              <Accordion.Panel>
                <UiStack>
                  {role.conditions?.length ? (
                    role.conditions?.map((condition) => (
                      <UiStack key={condition.id}>
                        <RoleConditionUiSummary key={condition.id} condition={condition} />
                        {condition.token ? (
                          <NetworkAssetDetailFeature
                            withAssets={withAssets}
                            username={username}
                            key={condition.token.id as string}
                            token={condition.token}
                          />
                        ) : null}
                      </UiStack>
                    ))
                  ) : (
                    <UiWarning message={`No conditions found for role ${role.name}`} />
                  )}
                </UiStack>
              </Accordion.Panel>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </UiStack>
  )
}
