import { Button, Group } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'
import { useAdminRefreshVoteIdentities } from '@pubkey-link/web-network-data-access'
import { UiDebug, UiError, UiStack } from '@pubkey-ui/core'

export function AdminNetworkDetailVoteIdentitiesTab({ network, refresh }: { network: Network; refresh: () => void }) {
  const mutation = useAdminRefreshVoteIdentities({ networkId: network.id })

  const items = network.voters ?? []

  return (
    <UiStack>
      <Group>
        <Button loading={mutation.isPending} onClick={() => mutation.mutateAsync().then(() => refresh())}>
          Refresh
        </Button>
      </Group>
      {items.length ? (
        <UiDebug data={{ found: `${items.length} vote identities`, items }} hideButton open />
      ) : (
        <UiError message="Vote identities not found." />
      )}
    </UiStack>
  )
}
