import { AdminCreateNetworkInput, AdminFindManyNetworkInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyNetwork(props?: Partial<AdminFindManyNetworkInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyNetworkInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-network', input],
    queryFn: () => sdk.adminFindManyNetwork({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    createNetwork: (input: AdminCreateNetworkInput) =>
      sdk
        .adminCreateNetwork({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Network created`)
          } else {
            toastError(`Network not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteNetwork: (networkId: string) =>
      sdk
        .adminDeleteNetwork({ networkId })
        .then(() => {
          toastSuccess('Network deleted')
          return query.refetch()
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  }
}
