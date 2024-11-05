import { Card, Group, Stack, Text } from '@mantine/core'
import { NetworkAsset } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { UiAnchor, type UiAnchorProps, UiGroup } from '@pubkey-ui/core'
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
      <Card.Section mt="md" p="xs">
        <UiGroup wrap="nowrap" w="100%" align="start">
          <Stack gap={0}>
            <Text fz="xs" fw={500}>
              {networkAsset?.name}
            </Text>
            <Text fz="sm" c="dimmed">
              {networkAsset?.symbol}
            </Text>
          </Stack>
          <Group wrap="nowrap" gap="xs">
            <NetworkAssetUiExplorerIcon asset={networkAsset} />
            <AppUiDebugModal data={networkAsset} />
          </Group>
        </UiGroup>
      </Card.Section>
    </Card>
  )
}
