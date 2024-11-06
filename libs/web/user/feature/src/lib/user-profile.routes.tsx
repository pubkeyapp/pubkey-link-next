import { useAuth } from '@pubkey-link/web-auth-data-access'
import { Navigate, useRoutes } from 'react-router-dom'
import { UserProfile } from './user-profile'

export default function UserProfileRoutes() {
  const { user } = useAuth()

  return useRoutes([
    {
      path: '',
      element: <Navigate to={`./${user?.username}`} replace />,
    },
    {
      path: ':username/*',
      element: <UserProfile />,
    },
  ])
}
