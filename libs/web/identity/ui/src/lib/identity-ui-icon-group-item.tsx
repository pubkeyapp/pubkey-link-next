import { Group, HoverCard, Stack, Text } from '@mantine/core'
import { Identity } from '@pubkey-link/sdk'
import { IdentityUiIcon } from '@pubkey-link/web-identity-ui'
import { IdentityUiIconItem } from './identity-ui-icon-item'

export function IdentityUiIconGroupItem({ identity }: { identity: Identity }) {
  return (
    <Group>
      <HoverCard width={420} shadow="md" withArrow position="top">
        <HoverCard.Target>
          <Group>
            <Stack gap={0} key={identity.id} align="center">
              <IdentityUiIcon size={28} provider={identity.provider} />
              <Text fz="xs" fw="bold">
                {identity.provider}
              </Text>
            </Stack>
          </Group>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <IdentityUiIconItem identity={identity} />
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  )
}
