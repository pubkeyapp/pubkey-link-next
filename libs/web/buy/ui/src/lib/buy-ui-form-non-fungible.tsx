import { Button } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { useBuy } from '@pubkey-link/web-buy-data-access'

export function BuyUiFormNonFungible({ networkToken }: { networkToken: NetworkToken }) {
  const { buyNonFungible } = useBuy()
  return (
    <div>
      <div>
        Buy {networkToken.type} {networkToken.name}
      </div>
      <Button onClick={() => buyNonFungible(networkToken)}>Buy</Button>
    </div>
  )
}
