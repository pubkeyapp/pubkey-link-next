import {
  AdminCreateNetworkTokenInput,
  AdminFindManyNetworkTokenInput,
  NetworkCluster,
  NetworkToken,
} from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyNetworkToken(
  props: Partial<AdminFindManyNetworkTokenInput> & { cluster: NetworkCluster },
) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyNetworkTokenInput = { page, limit, search, cluster: props.cluster }
  const query = useQuery({
    queryKey: ['admin', 'find-many-network-token', input],
    queryFn: () => sdk.adminFindManyNetworkToken({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items: NetworkToken[] = query.data?.paging.data ?? []

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
    createNetworkToken: (input: AdminCreateNetworkTokenInput) =>
      sdk
        .adminCreateNetworkToken({ input: { ...input, cluster: props.cluster } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`NetworkToken created`)
          } else {
            toastError(`NetworkToken not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteNetworkToken: (networkTokenId: string) =>
      sdk
        .adminDeleteNetworkToken({ networkTokenId })
        .then(() => {
          toastSuccess('NetworkToken deleted')
          return query.refetch()
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  }
}
