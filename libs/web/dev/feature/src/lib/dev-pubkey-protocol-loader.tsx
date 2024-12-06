import { AnchorProvider } from '@coral-xyz/anchor'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { AnchorKeypairWallet, PubkeyProtocolSdk } from '@pubkey-protocol/sdk'
import { UiLoader } from '@pubkey-ui/core'
import { Connection, Keypair } from '@solana/web3.js'
import React, { ReactNode } from 'react'
import { DevPubkeyProtocolRenderProps } from './dev-pubkey-protocol-provider'

export function DevPubkeyProtocolLoader({
  loader = <UiLoader />,
  noConfig = <div>No PubKey config in AppConfig</div>,
  render,
}: {
  loader?: ReactNode
  noConfig?: ReactNode
  render: ({ sdk }: DevPubkeyProtocolRenderProps) => ReactNode
}) {
  const { appConfig } = useAppConfig()

  if (!appConfig) {
    return loader
  }

  const community = appConfig.pubkeyProtocolCommunity
  const endpoint = appConfig.pubkeyProtocolEndpoint
  const signer = appConfig.pubkeyProtocolSigner

  if (!community || !endpoint || !signer) {
    return noConfig
  }

  const connection = new Connection(endpoint, 'confirmed')
  const provider = new AnchorProvider(connection, new AnchorKeypairWallet(Keypair.generate()), {
    commitment: connection.commitment,
    skipPreflight: true,
  })
  const sdk = new PubkeyProtocolSdk({ connection, provider })

  return render({ sdk, community, signer })
}
