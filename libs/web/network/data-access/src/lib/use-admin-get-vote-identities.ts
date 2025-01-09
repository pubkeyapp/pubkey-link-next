import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useAdminGetVoteIdentities({ networkId }: { networkId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['admin', 'getVoteIdentities', { networkId }],
    queryFn: () =>
      sdk
        .adminGetVoteIdentities({ networkId })
        .then((res) => res.data)
        .catch((err) => {
          toastError(`${err}`)
          return undefined
        }),
    retry: false,
  })
}

export function useAdminRefreshVoteIdentities({ networkId }: { networkId: string }) {
  const sdk = useSdk()
  return useMutation({
    mutationFn: () =>
      sdk
        .adminRefreshVoteIdentities({ networkId })
        .then((res) => res.data)
        .catch((err) => {
          toastError(`${err}`)
          return undefined
        }),
    retry: false,
  })
}
