import { NetworkCluster, NetworkTokenType, UserFindManyNetworkTokenInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyNetworkToken(
  props: Partial<UserFindManyNetworkTokenInput> & { cluster: NetworkCluster },
) {
  const sdk = useSdk()
  const [type, setType] = useState<NetworkTokenType | undefined>(props?.type ?? undefined)
  const [cluster, setCluster] = useState<NetworkCluster>(props.cluster)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyNetworkTokenInput = {
    page,
    limit,
    cluster,
    search,
    username: props.username,
    type,
  }
  const query = useQuery({
    queryKey: ['user', 'find-many-network-token', input],
    queryFn: () => sdk.userFindManyNetworkToken({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    type,
    cluster,
    setCluster,
    setType,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
  }
}
