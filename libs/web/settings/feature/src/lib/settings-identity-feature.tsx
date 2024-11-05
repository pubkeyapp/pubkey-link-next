import { Group } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiGroupList, IdentityUiLinkButton, IdentityUiList } from '@pubkey-link/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsIdentityFeature() {
  const { user } = useAuth()
  const { deleteIdentity, updateIdentity, grouped, query } = useUserFindManyIdentity({
    username: user?.username as string,
    provider: IdentityProvider.Discord,
  })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <IdentityUiGroupList
          grouped={grouped}
          deleteIdentity={deleteIdentity}
          updateIdentity={updateIdentity}
          refresh={() => query.refetch()}
        />
      )}
    </UiStack>
  )
}

export function SettingsIdentityDiscordFeature() {
  const { user } = useAuth()
  const { deleteIdentity, updateIdentity, items, query } = useUserFindManyIdentity({
    username: user?.username as string,
    provider: IdentityProvider.Discord,
  })
  const identity = items?.length ? items.find((i) => i.provider === IdentityProvider.Discord) : null

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : identity ? (
        <IdentityUiList
          items={[identity]}
          deleteIdentity={deleteIdentity}
          updateIdentity={updateIdentity}
          refresh={() => query.refetch()}
        />
      ) : (
        <Group justify="center">
          <IdentityUiLinkButton
            identities={items ?? []}
            refresh={() => query.refetch()}
            provider={IdentityProvider.Discord}
          />
        </Group>
      )}
    </UiStack>
  )
}
