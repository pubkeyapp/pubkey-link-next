import { PubKeyCommunity, PubkeyProtocolSdk } from '@pubkey-protocol/sdk'
import { useQuery } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

export interface DevPubkeyProtocolProviderContext {
  community?: PubKeyCommunity | null
  isLoading: boolean
  sdk: PubkeyProtocolSdk
  signer: string
}

const DevPubkeyProtocolContext = React.createContext<DevPubkeyProtocolProviderContext>(
  {} as DevPubkeyProtocolProviderContext,
)
export interface DevPubkeyProtocolProviderProps {
  children: ReactNode
  community: string
  sdk: PubkeyProtocolSdk
  signer: string
}

export function DevPubkeyProtocolProvider(props: DevPubkeyProtocolProviderProps) {
  const communityQuery = useQuery({
    queryKey: ['pubkey-protocol', 'community', { community: props.community }],
    queryFn: () => props.sdk.communityGet({ community: props.community }),
  })

  const value = {
    community: communityQuery.data,
    isLoading: communityQuery.isLoading,
    sdk: props.sdk,
    signer: props.signer,
  }

  return <DevPubkeyProtocolContext.Provider value={value}>{props.children}</DevPubkeyProtocolContext.Provider>
}

export function useDevPubkeyProtocol() {
  return React.useContext(DevPubkeyProtocolContext)
}

export interface DevPubkeyProtocolRenderProps {
  sdk: PubkeyProtocolSdk
  community: string
  signer: string
}
