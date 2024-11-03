import { Box, Button, Group, Stepper } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Community, NetworkToken, NetworkTokenType, Role } from '@pubkey-link/sdk'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { toastError, UiCard, UiInfo, UiInfoTable, UiStack } from '@pubkey-ui/core'
import { useMemo, useState } from 'react'
import { RoleConditionUiItem } from './role-condition-ui-item'
import { RoleConditionUiNavLink } from './role-condition-ui-nav-link'
import { RoleConditionUiTypeForm } from './role-condition-ui-type-form'

export function RoleConditionUiCreateWizard(props: { role: Role; community: Community; tokens: NetworkToken[] }) {
  const { query, createRoleCondition } = useUserFindOneRole({ roleId: props.role.id })
  const [networkTokenType, setNetworkTokenType] = useState<NetworkTokenType | undefined>(undefined)
  const { enabledTokenTypes } = useAppConfig()
  const [networkToken, setNetworkToken] = useState<NetworkToken | undefined>(undefined)
  const tokens: NetworkToken[] = useMemo(() => {
    if (networkTokenType === NetworkTokenType.Fungible) {
      return props.tokens.filter((token) => token.type === NetworkTokenType.Fungible)
    }
    if (networkTokenType === NetworkTokenType.NonFungible) {
      return props.tokens.filter((token) => token.type === NetworkTokenType.NonFungible)
    }
    if (networkTokenType === NetworkTokenType.Validator) {
      const filtered = props.tokens.filter((token) => token.type === NetworkTokenType.Validator)

      if (filtered.length === 0) {
        toastError('No validators found')
      }
      if (filtered.length === 1) {
        setNetworkToken(filtered[0])
      }

      return filtered
    }
    return []
  }, [networkTokenType, props.tokens])

  async function addCondition(tokenId: string) {
    createRoleCondition({ roleId: props.role.id, tokenId })
      .then(async () => {
        await query.refetch()
        modals.closeAll()
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const isActive = useMemo(() => {
    if (!networkTokenType) return 0
    if (!networkToken) return 1
    return 2
  }, [networkTokenType, networkToken])

  return (
    <UiStack>
      <UiCard title="Add Condition">
        <UiStack>
          <Stepper
            active={isActive}
            onStepClick={(step) => {
              if (step === 0) {
                setNetworkTokenType(undefined)
                setNetworkToken(undefined)
              }
              if (step === 1) {
                setNetworkToken(undefined)
              }
            }}
          >
            <Stepper.Step label="Condition Type" description="Select Condition Type">
              <RoleConditionUiSelectType
                enabledTokenTypes={enabledTokenTypes}
                networkTokenType={networkTokenType}
                setNetworkTokenType={(type) => {
                  setNetworkTokenType(type ?? undefined)
                  setNetworkToken(undefined)
                }}
              />
            </Stepper.Step>
            <Stepper.Step label="Configuration" description="Configure the condition">
              {networkTokenType ? (
                <UiStack>
                  <Box px="sm" py="xs">
                    <RoleConditionUiItem type={networkTokenType} />
                  </Box>
                  <RoleConditionUiTypeForm
                    networkToken={networkToken}
                    setNetworkToken={setNetworkToken}
                    type={networkTokenType}
                    tokens={tokens.sort((a, b) => a.name.localeCompare(b.name))}
                  />
                </UiStack>
              ) : (
                <UiInfo message="Select a condition type" />
              )}
            </Stepper.Step>
            <Stepper.Step label="Confirm" description="Confirm and create condition">
              {networkTokenType && networkToken ? (
                <UiStack>
                  <UiInfoTable
                    items={[
                      ['Type', <RoleConditionUiItem type={networkTokenType} />],
                      networkToken ? ['Token', <NetworkTokenUiItem networkToken={networkToken} />] : undefined,
                      [
                        '',
                        <Group justify="end" mt="md">
                          <Button size="lg" onClick={() => addCondition(networkToken.id)}>
                            Add Condition
                          </Button>
                        </Group>,
                      ],
                    ]}
                  />
                </UiStack>
              ) : (
                <UiInfo message="Select a condition type and configure it" />
              )}
            </Stepper.Step>
            <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
          </Stepper>
        </UiStack>
      </UiCard>
    </UiStack>
  )
}

function RoleConditionUiSelectType({
  enabledTokenTypes,
  networkTokenType,
  setNetworkTokenType,
}: {
  enabledTokenTypes: NetworkTokenType[]
  networkTokenType: NetworkTokenType | undefined
  setNetworkTokenType: (type: NetworkTokenType | undefined) => void
}) {
  return networkTokenType ? (
    <RoleConditionUiNavLink
      type={networkTokenType}
      active
      onClick={() => {
        setNetworkTokenType(undefined)
      }}
    />
  ) : (
    <UiStack>
      {enabledTokenTypes.map((type) => (
        <RoleConditionUiNavLink
          type={type}
          key={type}
          onClick={() => setNetworkTokenType(type)}
          active={networkTokenType === type}
        />
      ))}
    </UiStack>
  )
}
