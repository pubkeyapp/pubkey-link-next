import { useAuth } from '@pubkey-link/web-auth-data-access'
import { Navigate } from 'react-router-dom'

export default function UserProfileRedirect({ to }: { to: string }) {
  const { user } = useAuth()

  return <Navigate to={`${user?.profileUrl}/${to}`} replace />
}
