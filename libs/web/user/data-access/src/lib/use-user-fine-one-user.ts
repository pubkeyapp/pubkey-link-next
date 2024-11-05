import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFineOneUser({ username }: { username: string }) {
  const { user: authUser } = useAuth()
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-user', username],
    queryFn: () => sdk.userFindOneUser({ username }).then((res) => res.data),
    retry: 0,
  })

  return {
    user: query.data?.item,
    isAuthUser: authUser?.id === query.data?.item?.id,
    query,
  }
}
