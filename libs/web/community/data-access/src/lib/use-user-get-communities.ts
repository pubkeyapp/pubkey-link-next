import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetCommunities({ username }: { username: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-get-communities', username],
    queryFn: () => sdk.userGetCommunities({ username }).then((res) => res.data),
    retry: 0,
  })
  const items = query.data?.items ?? []

  return {
    isLoading: query.isLoading,
    items,
    query,
  }
}
