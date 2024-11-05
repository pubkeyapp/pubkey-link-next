import { Paper } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { UiGroup } from '@pubkey-ui/core'
import { UserUiItem } from './user-ui-item'

export function UserUiGridItem({ user, to }: { user: User; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <UserUiItem user={user} to={to} />
        <AppUiDebugModal data={user} />
      </UiGroup>
    </Paper>
  )
}
