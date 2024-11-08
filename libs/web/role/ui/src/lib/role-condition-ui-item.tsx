import { Group, Stack, Text, TextProps } from '@mantine/core'
import {
  getNetworkTokenTypeColor,
  getNetworkTokenTypeDescription,
  getNetworkTokenTypeTitle,
} from '@pubkey-link/resolvers'
import { NetworkTokenType } from '@pubkey-link/sdk'
import { UiIconAvatar } from '@pubkey-link/web-core-ui'
import { getNetworkTokenTypeIcon } from '@pubkey-link/web-network-token-ui'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function RoleConditionUiItem({
  anchorProps,
  children,
  textProps,
  type,
  to,
}: {
  anchorProps?: UiAnchorProps
  children?: ReactNode
  textProps?: TextProps
  type?: NetworkTokenType
  to?: string | null
}) {
  if (!type) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" wrap="nowrap" align="start">
        <RoleConditionUiAvatar type={type} />
        <Stack gap={0}>
          <Text size="lg" fw={500} {...textProps}>
            {getNetworkTokenTypeTitle(type)}
          </Text>
          <Text size="xs" c="dimmed">
            {getNetworkTokenTypeDescription(type)}
          </Text>
          {children}
        </Stack>
      </Group>
    </UiAnchor>
  )
}

export function RoleConditionUiAvatar({ type }: { type?: NetworkTokenType | null }) {
  return (
    <UiIconAvatar
      icon={getNetworkTokenTypeIcon(type)}
      name={`${type}`}
      size="md"
      color={getNetworkTokenTypeColor(type)}
    />
  )
}
