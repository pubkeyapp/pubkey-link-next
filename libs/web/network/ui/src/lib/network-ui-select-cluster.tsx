import { getEnumOptions, NetworkCluster } from '@pubkey-link/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function NetworkUiSelectCluster({
  value,
  setValue,
  options = getEnumOptions(NetworkCluster),
}: {
  value: NetworkCluster | undefined
  setValue: (role: NetworkCluster) => void
  options?: { label: string; value: NetworkCluster }[]
}) {
  return (
    <UiSelectEnum<NetworkCluster>
      style={{ width: 160 }}
      value={value}
      setValue={(value) => setValue(value ?? NetworkCluster.SolanaMainnet)}
      clearable
      placeholder="Filter by cluster"
      options={[
        ...options.map(({ label, value }) => ({
          value,
          label: label.replace('Solana', 'Solana '),
        })),
      ]}
    />
  )
}
