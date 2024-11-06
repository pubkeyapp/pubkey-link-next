import { ActionIcon, Tooltip } from '@mantine/core'
import { User, UserRole } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { IconShield } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function UserUiAdminIcon({ user }: { user: User }) {
  const { user: authUser } = useAuth()
  const isAuthAdmin = authUser?.role === UserRole.Admin

  if (!isAuthAdmin) {
    return null
  }

  return (
    <Tooltip label="User administration" withArrow position="top">
      <ActionIcon size="sm" variant="light" component={Link} to={`/admin/users/${user.id}`}>
        <IconShield size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
