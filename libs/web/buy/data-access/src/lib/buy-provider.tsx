import { NetworkCluster, NetworkToken } from '@pubkey-link/sdk'
import { useUserFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { Wallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import React, { ReactNode } from 'react'

export interface BuyProviderContext {
  buyFungible: (networkToken: NetworkToken) => Promise<boolean>
  buyNonFungible: (networkToken: NetworkToken) => Promise<boolean>
  isLoading: boolean
  tokens: NetworkToken[]
}

const BuyContext = React.createContext<BuyProviderContext>({} as BuyProviderContext)

export function BuyProvider(props: { children: ReactNode; connection: Connection; wallet: Wallet }) {
  const { children } = props
  const { query, items } = useUserFindManyNetworkToken({
    cluster: NetworkCluster.SolanaMainnet,
    enableBuy: true,
  })

  const value = {
    buyFungible: async (networkToken: NetworkToken) => {
      // TODO: Implement logic to buy a fungible token
      return true
    },
    buyNonFungible: async (networkToken: NetworkToken) => {
      // TODO: Implement logic to buy a non-fungible token
      return true
    },
    isLoading: query.isLoading,
    tokens: items ?? [],
  }
  return <BuyContext.Provider value={value}>{children}</BuyContext.Provider>
}

export function useBuy() {
  return React.useContext(BuyContext)
}
