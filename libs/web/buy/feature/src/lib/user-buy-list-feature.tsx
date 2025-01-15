import { SimpleGrid } from '@mantine/core'
import { useBuy } from '@pubkey-link/web-buy-data-access'
import { BuyUiLayout } from '@pubkey-link/web-buy-ui'
import { NetworkTokenUiGridItem } from '@pubkey-link/web-network-token-ui'
import { UiLoader } from '@pubkey-ui/core'

export function UserBuyListFeature() {
  const { isLoading, tokens } = useBuy()
  return (
    <BuyUiLayout description="You can buy the following tokens here.">
      {isLoading ? (
        <UiLoader />
      ) : (
        <div>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {tokens.map((networkToken) => (
              <NetworkTokenUiGridItem key={networkToken.id} to={networkToken.id} networkToken={networkToken} />
            ))}
          </SimpleGrid>
        </div>
      )}
    </BuyUiLayout>
  )
}
