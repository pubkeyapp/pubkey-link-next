import { ActionIcon, Tooltip } from '@mantine/core'
import { Community, UserRole } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { IconShield } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function CommunityUiAdminIcon({ community }: { community: Community }) {
  const { user: authUser } = useAuth()
  const isAuthAdmin = authUser?.role === UserRole.Admin

  if (!isAuthAdmin) {
    return null
  }

  return (
    <Tooltip label="Community administration" withArrow position="top">
      <ActionIcon size="sm" variant="light" component={Link} to={`/admin/communities/${community.id}`}>
        <IconShield size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
