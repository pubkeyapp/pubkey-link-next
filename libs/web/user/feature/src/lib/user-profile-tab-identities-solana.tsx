import { AppFeature, IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiLinkButton, IdentityUiList, IdentityUiSolanaLinkCliButton } from '@pubkey-link/web-identity-ui'
import { UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserProfileTabIdentitiesSolana() {
  const { appConfig, hasFeature } = useAppConfig()
  const { user } = useAuth()
  const { deleteIdentity, updateIdentity, addIdentityGrant, removeIdentityGrant, items, query } =
    useUserFindManyIdentity({
      provider: IdentityProvider.Solana,
      username: user?.username as string,
    })
  const hasCliVerification = hasFeature(AppFeature.IdentityCliVerification)

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          {items.length ? (
            <IdentityUiList
              items={query.data?.items ?? []}
              deleteIdentity={deleteIdentity}
              updateIdentity={updateIdentity}
              addIdentityGrant={addIdentityGrant}
              removeIdentityGrant={removeIdentityGrant}
              refresh={() => query.refetch()}
            />
          ) : (
            <UiInfo message="No wallets found" />
          )}
          <UiGroup justify="end">
            {hasCliVerification ? (
              <IdentityUiSolanaLinkCliButton
                loading={query.isLoading}
                disabled={!appConfig?.authLinkProviders?.includes(IdentityProvider.Solana)}
                identities={[]}
                refresh={() => query.refetch()}
                size="sm"
                w={210}
              />
            ) : null}
            <IdentityUiLinkButton
              disabled={!appConfig?.authLinkProviders?.includes(IdentityProvider.Solana)}
              identities={[]}
              refresh={() => query.refetch()}
              provider={IdentityProvider.Solana}
              size="sm"
              w={210}
            />
          </UiGroup>
        </UiStack>
      )}
    </UiStack>
  )
}
