import { AdminFindManyUserInput, UserRole, UserStatus } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyUser(props?: AdminFindManyUserInput) {
  const sdk = useSdk()
  const [role, setRole] = useState<UserRole | undefined>(undefined)
  const [status, setStatus] = useState<UserStatus | undefined>(undefined)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyUserInput = { limit, page, role, search, status }
  const query = useQuery({
    queryKey: ['admin', 'find-many-user', input],
    queryFn: () => sdk.adminFindManyUser({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    role,
    status,
    pagination: {
      limit,
      page,
      total,
      setLimit,
      setPage,
    },
    setRole: (role: UserRole | undefined) => {
      setPage(1)
      setRole(role)
    },
    setSearch: (search: string) => {
      setPage(1)
      setSearch(search)
    },
    setStatus: (status: UserStatus | undefined) => {
      setPage(1)
      setStatus(status)
    },
    deleteUser: (userId: string) =>
      sdk.adminDeleteUser({ userId }).then(() => {
        toastSuccess('User deleted')
        return query.refetch()
      }),
    verifyUser: (userId: string) =>
      sdk.adminVerifyUser({ userId }).then(async () => {
        toastSuccess('User verified')
        await query.refetch()
      }),
  }
}
