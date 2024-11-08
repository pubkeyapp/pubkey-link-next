import { Group } from '@mantine/core'
import { Identity } from '@pubkey-link/sdk'
import { IdentityUiIconGroupItem } from './identity-ui-icon-group-item'

export function IdentityUiIconGroup({ identities }: { identities: Identity[] }) {
  return (
    <Group justify="center">
      {identities
        .sort((a, b) => (a.provider > b.provider ? 1 : -1))
        .sort((a, b) => (a.providerId > b.providerId ? 1 : -1))
        .map((identity) => (
          <IdentityUiIconGroupItem identity={identity} key={identity.providerId} />
        ))}
    </Group>
  )
}
