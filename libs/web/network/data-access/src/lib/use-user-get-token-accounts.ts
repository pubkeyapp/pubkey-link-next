import { NetworkCluster } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserGetTokenAccounts({ cluster, account }: { cluster: NetworkCluster; account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user', 'getTokenAccounts', { cluster, account }],
    queryFn: () =>
      sdk
        .userGetTokenAccounts({ cluster, account })
        .then((res) => res.data)
        .catch((err) => toastError(`${err}`)),
    retry: false,
  })
}
