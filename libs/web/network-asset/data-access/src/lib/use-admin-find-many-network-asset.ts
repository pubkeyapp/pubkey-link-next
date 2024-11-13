import { AdminFindManyNetworkAssetInput, NetworkCluster, NetworkTokenType } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyNetworkAsset(
  props: Partial<AdminFindManyNetworkAssetInput> & { cluster: NetworkCluster },
) {
  const sdk = useSdk()
  const [type, setType] = useState<NetworkTokenType | undefined>(props?.type ?? undefined)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyNetworkAssetInput = { page, limit, search, cluster: props.cluster, type }
  const query = useQuery({
    queryKey: ['admin', 'find-many-network-asset', input],
    queryFn: () => sdk.adminFindManyNetworkAsset({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    type,
    setType,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    deleteNetworkAsset: (networkAssetId: string) =>
      sdk
        .adminDeleteNetworkAsset({ networkAssetId })
        .then(() => {
          toastSuccess('NetworkAsset deleted')
          return query.refetch()
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  }
}
