import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { getNetworkTokenUrl, NetworkToken } from '@pubkey-link/sdk'
import { IconExternalLink } from '@tabler/icons-react'

export function NetworkTokenUiExplorerIcon({
  token,
  label = 'View on Explorer',
  ...props
}: ActionIconProps & { label?: string; token: NetworkToken }) {
  return (
    <Tooltip label={label} withArrow>
      <ActionIcon size="sm" variant="light" component="a" href={getNetworkTokenUrl(token)} target="_blank" {...props}>
        <IconExternalLink size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
