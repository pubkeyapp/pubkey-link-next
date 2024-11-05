import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetVoteAccounts({ networkId }: { networkId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['admin', 'getVoteAccounts', { networkId }],
    queryFn: () =>
      sdk
        .adminGetVoteAccounts({ networkId })
        .then((res) => res.data)
        .catch((err) => {
          toastError(`${err}`)
          return undefined
        }),
    retry: false,
  })
}
