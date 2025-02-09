import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { getNetworkAssetUrl, NetworkAsset } from '@pubkey-link/sdk'
import { IconExternalLink } from '@tabler/icons-react'

export function NetworkAssetUiExplorerIcon({
  asset,
  label = 'View on Explorer',
  ...props
}: ActionIconProps & { asset: NetworkAsset; label?: string }) {
  return (
    <Tooltip label={label} withArrow>
      <ActionIcon size="sm" variant="light" component="a" href={getNetworkAssetUrl(asset)} target="_blank" {...props}>
        <IconExternalLink size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
