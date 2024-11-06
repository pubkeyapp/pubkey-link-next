import { useAdminGetVoteIdentities } from '@pubkey-link/web-network-data-access'
import { UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkDetailVoteIdentitiesTab({ networkId }: { networkId: string }) {
  const query = useAdminGetVoteIdentities({ networkId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.items?.length) {
    return <UiError message="Vote identities not found." />
  }

  const items = query.data?.items ?? []

  return <UiDebug data={{ found: `${items.length} vote identities`, items }} hideButton open />
}
