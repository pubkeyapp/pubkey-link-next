import { Card, Group, Stack, Text } from '@mantine/core'
import { getNetworkAssetGroupUrl, NetworkAsset } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { NetworkAssetOwnerUiExplorerIcon } from './network-asset-owner-ui-explorer-icon'
import { NetworkAssetUiAvatar } from './network-asset-ui-avatar'
import { NetworkAssetUiExplorerIcon } from './network-asset-ui-explorer-icon'
import { NetworkAssetUiImage } from './network-asset-ui-image'

export function NetworkAssetUiItem({
  anchorProps,
  networkAsset,
  to,
}: {
  anchorProps?: UiAnchorProps
  networkAsset?: NetworkAsset
  to?: string | null
}) {
  if (!networkAsset) return null

  return (
    <Card withBorder>
      <Card.Section>
        <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
          {networkAsset.imageUrl ? (
            <NetworkAssetUiImage networkAsset={networkAsset} />
          ) : (
            <Group justify="center" pt="xl">
              <NetworkAssetUiAvatar size="lg" networkAsset={networkAsset} />
            </Group>
          )}
        </UiAnchor>
      </Card.Section>
      <Card.Section p="xs">
        <Stack gap="xs" w="100%">
          <Text fz="xs" fw={500}>
            {networkAsset?.name}
          </Text>
          <Group wrap="nowrap" justify="space-between">
            <UiAnchor to={getNetworkAssetGroupUrl(networkAsset)} fz="sm" c="dimmed" target="_blank">
              {networkAsset?.symbol}
            </UiAnchor>
            <Group wrap="nowrap" gap={4}>
              <NetworkAssetOwnerUiExplorerIcon asset={networkAsset} label="Asset Owner" />
              <NetworkAssetUiExplorerIcon asset={networkAsset} label="Asset" />
              <AppUiDebugModal data={networkAsset} />
            </Group>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  )
}
