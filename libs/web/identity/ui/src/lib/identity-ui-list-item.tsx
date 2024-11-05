import { Badge, Button, Collapse, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  AppFeature,
  ellipsify,
  Identity,
  UserAddIdentityGrantInput,
  UserRemoveIdentityGrantInput,
  UserUpdateIdentityInput,
} from '@pubkey-link/sdk'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { IdentityUiAvatar } from '@pubkey-link/web-core-ui'
import { UiAnchor, UiCard, UiCopy, UiGroup, UiStack } from '@pubkey-ui/core'
import { IdentityGrantUiManager } from './identity-grant-ui-manager'
import { IdentityUiListActions } from './identity-ui-list-actions'
import { IdentityUiProviderTag } from './identity-ui-provider-tag'
import { IdentityUiSolanaVerifyButton } from './identity-ui-solana-verify-button'
import { IdentityUiVerified } from './identity-ui-verified'

export function IdentityUiListItem({
  deleteIdentity,
  updateIdentity,
  addIdentityGrant,
  removeIdentityGrant,
  refresh,
  item,
}: {
  refresh?: () => void
  deleteIdentity: (id: string) => Promise<void>
  updateIdentity: (id: string, input: UserUpdateIdentityInput) => Promise<void>
  addIdentityGrant?: (input: UserAddIdentityGrantInput) => Promise<void>
  removeIdentityGrant?: (input: UserRemoveIdentityGrantInput) => Promise<void>
  item: Identity
}) {
  const { hasFeature } = useAppConfig()
  const hasIdentityGrants = hasFeature(AppFeature.IdentityGrants) && addIdentityGrant && removeIdentityGrant
  const [showIdentityGrants, { toggle }] = useDisclosure(false)

  return (
    <UiCard>
      <Group justify="space-between">
        <Group>
          <IdentityUiAvatar item={item} size={42} />
          <UiStack gap={0} align="start">
            <UiGroup gap="xs" align="center">
              <Group align="center" gap={4}>
                <UiCopy text={item.name} tooltip="Copy name" variant="subtle" />
                <UiAnchor to={item.url ?? ''} target="_blank" size="lg" fw="bold">
                  {ellipsify(item.name, 8)}
                </UiAnchor>
                {item.verified ? (
                  <IdentityUiVerified item={item} />
                ) : refresh ? (
                  <IdentityUiSolanaVerifyButton identity={item} refresh={refresh} />
                ) : (
                  <Badge variant="light" color="yellow">
                    Not verified
                  </Badge>
                )}
              </Group>
            </UiGroup>

            <Group align="center" gap={4}>
              <UiCopy text={item.providerId} tooltip="Copy providerId" variant="subtle" />
              <IdentityUiProviderTag provider={item.provider} />
            </Group>
          </UiStack>
        </Group>
        <IdentityUiListActions
          identity={item}
          deleteIdentity={deleteIdentity}
          updateIdentity={updateIdentity}
          addIdentityGrant={addIdentityGrant}
          removeIdentityGrant={removeIdentityGrant}
        />
      </Group>
      {hasIdentityGrants ? (
        <UiStack>
          <Group justify="flex-end">
            <Button onClick={toggle} size="xs" variant="light">
              Manage Identity Grants
            </Button>
          </Group>
          <Collapse in={showIdentityGrants} transitionTimingFunction="linear">
            <IdentityGrantUiManager item={item} addGrant={addIdentityGrant} removeGrant={removeIdentityGrant} />
          </Collapse>
        </UiStack>
      ) : null}
    </UiCard>
  )
}
