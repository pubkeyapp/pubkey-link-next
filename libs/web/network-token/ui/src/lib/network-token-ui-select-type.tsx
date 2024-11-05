import { getEnumOptions, NetworkTokenType } from '@pubkey-link/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function NetworkTokenUiSelectType({
  value,
  setValue,
}: {
  value: NetworkTokenType | undefined
  setValue: (role: NetworkTokenType | undefined) => void
}) {
  return (
    <UiSelectEnum<NetworkTokenType>
      style={{ width: 150 }}
      value={value}
      setValue={setValue}
      clearable
      placeholder="Filter by type"
      options={[...getEnumOptions(NetworkTokenType)]}
    />
  )
}
