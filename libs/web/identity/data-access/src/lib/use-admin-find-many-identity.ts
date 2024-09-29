import { modals } from '@mantine/modals'
import { AdminCreateIdentityInput, AdminFindManyIdentityInput, Identity, IdentityProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyIdentity({ ownerId, provider }: { ownerId?: string; provider?: IdentityProvider }) {
  const sdk = useSdk()

  const [input] = useState<AdminFindManyIdentityInput>({
    ownerId: ownerId,
    provider: provider,
  })

  const query = useQuery({
    queryKey: ['admin', 'find-many-identity', input],
    queryFn: () => sdk.adminFindManyIdentity({ input }).then((res) => res.data),
  })

  return {
    items: query.data?.items ?? [],
    query,
    createIdentity: async (input: AdminCreateIdentityInput) => {
      if (!ownerId) {
        toastError('No owner ID')
        return false
      }
      try {
        const res = await sdk.adminCreateIdentity({ input: { ...input, ownerId } })

        if (res) {
          toastSuccess('Identity created')
          modals.closeAll()
          await query.refetch()
          return true
        }
        toastError('Error creating identity')
        return false
      } catch (err) {
        toastError(`${err}`)
        return false
      }
    },
    deleteIdentity: async (identity: Identity) => {
      return sdk.adminDeleteIdentity({ identityId: identity.id }).then(async (res) => {
        if (res) {
          toastSuccess('Identity deleted')
          await query.refetch()
          return true
        }
        toastError('Error deleting identity')
        return false
      })
    },
    syncIdentity: async (identity: Identity) => {
      return sdk
        .adminSyncIdentity({ identityId: identity.id })
        .then(async (res) => {
          if (res) {
            toastSuccess('Identity synced')
            await query.refetch()
            return true
          }
          toastError('Error syncing identity')
          return false
        })
        .catch((err) => {
          toastError(err)
        })
    },
  }
}
