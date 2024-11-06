import { Group } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiLinkButton, IdentityUiList } from '@pubkey-link/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserProfileTabIdentitiesDiscord() {
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
