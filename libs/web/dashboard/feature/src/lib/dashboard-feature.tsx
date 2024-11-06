import { UserStatus } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { UiContainer, UiDashboardGrid, UiDashboardItem } from '@pubkey-ui/core'
import { Navigate } from 'react-router-dom'

export default function DashboardFeature({ links }: { links: UiDashboardItem[] }) {
  const { user } = useAuth()

  if (!user) return null

  return user?.status === UserStatus.Active ? (
    <Navigate to="/u" replace />
  ) : (
    <UiContainer>
      <UiDashboardGrid links={links} />
    </UiContainer>
  )
}
