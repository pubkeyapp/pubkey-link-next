import { Paper } from '@mantine/core'
import { Role } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { UiGroup } from '@pubkey-ui/core'
import { RoleUiItem } from './role-ui-item'

export function RoleUiGridItem({ role, to }: { role: Role; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <RoleUiItem role={role} to={to} />
        <AppUiDebugModal data={role} />
      </UiGroup>
    </Paper>
  )
}
