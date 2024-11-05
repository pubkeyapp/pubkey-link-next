import { UserUpdateUserInput } from '@pubkey-link/sdk'
import { useAuth, useMe } from '@pubkey-link/web-auth-data-access'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { useUserFineOneUser } from './use-user-fine-one-user'

export function useUserProfile() {
  const sdk = useSdk()
  const me = useMe(sdk)
  const { user } = useAuth()
  const { query } = useUserFineOneUser({ username: user?.username as string })

  return {
    user: query.data?.item,
    isLoading: query.isLoading,
    query,
    updateUser: async (input: UserUpdateUserInput) =>
      sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await Promise.all([query.refetch(), me.refetch()])
          return res.data.updated
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
