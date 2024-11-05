import { useAdminGetVoteAccounts } from '@pubkey-link/web-network-data-access'
import { UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkDetailVoteAccountsTab({ networkId }: { networkId: string }) {
  const query = useAdminGetVoteAccounts({ networkId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.voteAccounts?.length) {
    return <UiError message="Vote accounts not found." />
  }

  const items = query.data?.voteAccounts ?? []

  return <UiDebug data={{ found: `${items.length} vote accounts`, items }} hideButton open />
}
