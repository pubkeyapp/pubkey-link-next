import { Group, Stack } from '@mantine/core'
import { ellipsify, Identity } from '@pubkey-link/sdk'
import { IdentityUiAvatar } from '@pubkey-link/web-core-ui'
import { UiAnchor, UiAvatarProps, UiCopy, UiGroup, UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { IdentityUiProviderTag } from './identity-ui-provider-tag'
import { IdentityUiVerified } from './identity-ui-verified'

export function IdentityUiIconItem({
  action,
  avatarProps,
  identity,
}: {
  action?: ReactNode
  avatarProps?: Omit<UiAvatarProps, 'url'>
  identity: Identity
}) {
  return (
    <Group w="100%" align="center" wrap="nowrap">
      <UiStack gap={0} align="center" w={50}>
        <IdentityUiAvatar item={identity} size={42} {...avatarProps} />
      </UiStack>
      <Stack gap={4} style={{ flexGrow: 1 }}>
        <UiGroup>
          <Group align="center" gap={4}>
            <UiCopy text={identity.providerId} tooltip="Copy name" variant="subtle" />
            <UiAnchor to={identity.url ?? ''} target="_blank" size="lg" fw="bold">
              {ellipsify(identity.name, 8)}
            </UiAnchor>
            {identity.verified ? <IdentityUiVerified item={identity} /> : null}
          </Group>
          {action}
        </UiGroup>
        <Group align="center" gap={4}>
          <UiCopy text={identity.providerId} tooltip="Copy providerId" variant="subtle" />
          <IdentityUiProviderTag provider={identity.provider} />
        </Group>
      </Stack>
    </Group>
  )
}
