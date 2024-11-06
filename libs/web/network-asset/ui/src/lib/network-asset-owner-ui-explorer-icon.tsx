import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { getNetworkAssetOwnerUrl, NetworkAsset } from '@pubkey-link/sdk'
import { IconExternalLink } from '@tabler/icons-react'

export function NetworkAssetOwnerUiExplorerIcon({
  asset,
  label = 'View on Explorer',
  ...props
}: ActionIconProps & { asset: NetworkAsset; label?: string }) {
  return (
    <Tooltip label={label} withArrow>
      <ActionIcon
        size="sm"
        variant="light"
        component="a"
        href={getNetworkAssetOwnerUrl(asset)}
        target="_blank"
        {...props}
      >
        <IconExternalLink size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
