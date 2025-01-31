import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { ReactNode } from 'react'

export function WalletConnectionLoader({
  render,
  noWallet = <WalletMultiButton />,
}: {
  render: ({ wallet, connection }: { wallet: Wallet; connection: Connection }) => ReactNode
  noWallet?: ReactNode
}) {
  const { wallet } = useWallet()
  const { connection } = useConnection()

  if (!connection) {
    return null
  }
  if (!wallet) {
    return noWallet
  }

  return render({ wallet, connection })
}
