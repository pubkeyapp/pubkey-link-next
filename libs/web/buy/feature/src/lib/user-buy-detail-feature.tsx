import { useBuy } from '@pubkey-link/web-buy-data-access'
import { BuyUiForm, BuyUiLayout } from '@pubkey-link/web-buy-ui'
import { NetworkTokenUiGridItem } from '@pubkey-link/web-network-token-ui'
import { UiError, UiLoader, UiStack } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export function UserBuyDetailFeature() {
  const { networkTokenId } = useParams<{ networkTokenId: string }>() as { networkTokenId: string }
  const { isLoading, tokens } = useBuy()

  const found = tokens.find((token) => token.id === networkTokenId)

  return (
    <BuyUiLayout description="Buy this token here.">
      {isLoading ? (
        <UiLoader />
      ) : found ? (
        <UiStack>
          <NetworkTokenUiGridItem networkToken={found} />
          <BuyUiForm networkToken={found} />
        </UiStack>
      ) : (
        <UiError message="Token not found." />
      )}
    </BuyUiLayout>
  )
}
