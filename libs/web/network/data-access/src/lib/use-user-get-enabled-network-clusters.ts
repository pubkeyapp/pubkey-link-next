import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetEnabledNetworkClusters() {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user', 'getEnabledNetworkClusters'],
    queryFn: () => sdk.userGetEnabledNetworkClusters().then((res) => res.data),
    retry: false,
  })
}
