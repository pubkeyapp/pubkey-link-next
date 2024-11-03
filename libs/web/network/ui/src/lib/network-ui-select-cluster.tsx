import { getEnumOptions, NetworkCluster } from '@pubkey-link/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function NetworkUiSelectCluster({
  value,
  setValue,
}: {
  value: NetworkCluster | undefined
  setValue: (role: NetworkCluster) => void
}) {
  return (
    <UiSelectEnum<NetworkCluster>
      value={value}
      setValue={(value) => setValue(value ?? NetworkCluster.SolanaMainnet)}
      clearable
      options={[
        ...getEnumOptions(NetworkCluster).map(({ label, value }) => ({
          value,
          label: label.replace('Solana', 'Solana '),
        })),
      ]}
    />
  )
}
