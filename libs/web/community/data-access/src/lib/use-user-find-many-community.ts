import { UserCreateCommunityInput, UserFindManyCommunityInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyCommunity(props?: Partial<UserFindManyCommunityInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyCommunityInput = { page, limit, search, withRoles: props?.withRoles ?? false }
  const query = useQuery({
    queryKey: ['user', 'find-many-community', input],
    queryFn: () => sdk.userFindManyCommunity({ input }).then((res) => res.data),
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
    createCommunity: (input: UserCreateCommunityInput) =>
      sdk
        .userCreateCommunity({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Community created`)
          } else {
            toastError(`Community not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteCommunity: (communityId: string) =>
      sdk.userDeleteCommunity({ communityId }).then(() => {
        toastSuccess('Community deleted')
        return query.refetch()
      }),
  }
}
