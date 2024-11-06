import { useUserFineOneUser } from '@pubkey-link/web-user-data-access'
import { UiLoader, UiWarning } from '@pubkey-ui/core'
import { UserProfilePage } from './user-profile-page'

export function UserProfileLoader({ username }: { username: string }) {
  const { isAuthUser, user, query } = useUserFineOneUser({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }

  return <UserProfilePage user={user} isAuthUser={isAuthUser} />
}
