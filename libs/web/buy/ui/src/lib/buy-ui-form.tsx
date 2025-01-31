import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { UiError } from '@pubkey-ui/core'
import { BuyUiFormFungible } from './buy-ui-form-fungible'
import { BuyUiFormNonFungible } from './buy-ui-form-non-fungible'

export function BuyUiForm({ networkToken }: { networkToken: NetworkToken }) {
  switch (networkToken.type) {
    case NetworkTokenType.Fungible:
      return <BuyUiFormFungible networkToken={networkToken} />
    case NetworkTokenType.NonFungible:
      return <BuyUiFormNonFungible networkToken={networkToken} />
    default:
      return <UiError message={`You can't buy ${networkToken.type} tokens`} />
  }
}
