import { Group } from '@mantine/core'
import { BuyProvider } from '@pubkey-link/web-buy-data-access'
import { BuyUiLayout } from '@pubkey-link/web-buy-ui'
import { WalletConnectionLoader } from '@pubkey-link/web-solana-data-access'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useRoutes } from 'react-router-dom'
import { UserBuyDetailFeature } from './user-buy-detail-feature'
import { UserBuyListFeature } from './user-buy-list-feature'

export default function BuyRoutes() {
  const routes = useRoutes([
    {
      index: true,
      element: <UserBuyListFeature />,
    },
    {
      path: ':networkTokenId',
      element: <UserBuyDetailFeature />,
    },
  ])

  return (
    <WalletConnectionLoader
      noWallet={
        <BuyUiLayout description="Connect your wallet to continue">
          <Group justify="center">
            <WalletMultiButton />
          </Group>
        </BuyUiLayout>
      }
      render={({ wallet, connection }) => {
        return (
          <BuyProvider wallet={wallet} connection={connection}>
            {routes}
          </BuyProvider>
        )
      }}
    />
  )
}
