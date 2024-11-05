import { Group } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { IdentityUiItem } from '@pubkey-link/web-identity-ui'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { useAdminFindUserByIdentity } from '@pubkey-link/web-verify-data-access'
import { UiCard, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'

export function VerifyIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
  const query = useAdminFindUserByIdentity({
    provider,
    providerId,
  })

  const item = query.data?.item

  return (
    <UiCard
      title={
        <Group>
          {provider} {providerId}
        </Group>
      }
    >
      {query.isLoading ? (
        <UiLoader />
      ) : item ? (
        <UiStack>
          <UserUiItem user={item} />
          {item.identities?.map((identity) => (
            <IdentityUiItem key={identity.id} identity={identity} />
          ))}
          <AppUiDebugModal data={item} />
        </UiStack>
      ) : (
        <UiWarning title="Not found." message={`No user found with ${provider} ${providerId}`} />
      )}
    </UiCard>
  )
}
