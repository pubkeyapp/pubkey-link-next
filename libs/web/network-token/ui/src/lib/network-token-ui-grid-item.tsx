import { Paper } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { UiGroup } from '@pubkey-ui/core'
import { NetworkTokenUiItem } from './network-token-ui-item'

export function NetworkTokenUiGridItem({ networkToken, to }: { networkToken: NetworkToken; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <NetworkTokenUiItem networkToken={networkToken} to={to} />
        <AppUiDebugModal data={networkToken} />
      </UiGroup>
    </Paper>
  )
}
