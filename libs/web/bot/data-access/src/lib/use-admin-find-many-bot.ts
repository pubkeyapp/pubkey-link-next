import { AdminCreateBotInput, AdminFindManyBotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyBot(props: Partial<AdminFindManyBotInput> & { communityId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyBotInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-bot', input],
    queryFn: () => sdk.adminFindManyBot({ input }).then((res) => res.data),
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
    createBot: (input: AdminCreateBotInput) =>
      sdk
        .adminCreateBot({ input: { ...input, communityId: props.communityId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Bot created`)
          } else {
            toastError(`Bot not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteBot: (botId: string) =>
      sdk
        .adminDeleteBot({ botId })
        .then(() => {
          toastSuccess('Bot deleted')
          return query.refetch()
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  }
}
