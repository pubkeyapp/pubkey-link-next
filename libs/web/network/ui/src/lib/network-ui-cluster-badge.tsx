import { Badge, BadgeProps, Tooltip } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'

export function NetworkUiClusterBadge({ cluster, ...props }: BadgeProps & { cluster?: NetworkCluster }) {
  if (!cluster) return null
  const label = cluster.replace('Solana', 'Solana ')
  return (
    <Tooltip label={`Cluster ${label}`} withArrow>
      <Badge variant="light" radius="sm" {...props}>
        {label}
      </Badge>
    </Tooltip>
  )
}
