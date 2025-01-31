import { Button } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { useBuy } from '@pubkey-link/web-buy-data-access'

export function BuyUiFormFungible({ networkToken }: { networkToken: NetworkToken }) {
  const { buyFungible } = useBuy()
  return (
    <div>
      <div>
        Buy {networkToken.type} {networkToken.name}
      </div>
      <Button onClick={() => buyFungible(networkToken)}>Buy</Button>
    </div>
  )
}
