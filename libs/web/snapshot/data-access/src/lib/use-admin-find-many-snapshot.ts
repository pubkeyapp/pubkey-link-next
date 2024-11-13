import { AdminCreateSnapshotInput, AdminFindManySnapshotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManySnapshot(props: Partial<AdminFindManySnapshotInput> & { communityId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManySnapshotInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-snapshot', input],
    queryFn: () => sdk.adminFindManySnapshot({ input }).then((res) => res.data),
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
    createSnapshot: (input: AdminCreateSnapshotInput) =>
      sdk
        .adminCreateSnapshot({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Snapshot created`)
          } else {
            toastError(`Snapshot not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteSnapshot: (snapshotId: string) =>
      sdk
        .adminDeleteSnapshot({ snapshotId })
        .then(() => {
          toastSuccess('Snapshot deleted')
          return query.refetch()
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  }
}
