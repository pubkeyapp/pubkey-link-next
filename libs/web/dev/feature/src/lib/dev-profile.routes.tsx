import { useAuth } from '@pubkey-link/web-auth-data-access'
import { Navigate, useRoutes } from 'react-router-dom'
import { DevProfile } from './dev-profile'

export default function DevRoutes() {
  const { user } = useAuth()

  return useRoutes([
    {
      path: '',
      element: <RedirectToUser username={user?.username as string} />,
    },
    {
      path: ':username/*',
      element: <DevProfile />,
    },
  ])
}

function RedirectToUser({ username }: { username: string }) {
  return <Navigate to={`/p/${username}`} replace />
}
