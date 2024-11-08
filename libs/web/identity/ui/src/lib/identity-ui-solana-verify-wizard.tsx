import { Identity, IdentityProvider } from '@pubkey-link/sdk'
import { useIdentitySolana } from '@pubkey-link/web-identity-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import { IdentityUiSolanaWizard, IdentityUiSolanaWizardProps } from './identity-ui-solana-wizard'

export function IdentityUiSolanaVerifyWizard({
  refresh,
  identity,
  ...props
}: Omit<IdentityUiSolanaWizardProps, 'sign'> & { refresh: () => void; identity: Identity }) {
  const { connected, publicKey } = useWallet()
  const { verifyAndSign } = useIdentitySolana()
  const [active, setActive] = useState(0)

  const canVerify = useMemo(
    () => identity.provider === IdentityProvider.Solana && connected && publicKey?.toBase58() === identity.providerId,
    [identity, connected, publicKey],
  )

  useEffect(() => {
    if (connected && active === 0) {
      setActive(1)
    }
  }, [active, connected])
  async function request(useLedger: boolean) {
    if (!publicKey) {
      return false
    }
    return verifyAndSign({ publicKey: publicKey.toString(), useLedger })
      .catch((err) => {
        console.log('Error verifying identity', err)
        toastError('Error verifying identity')
        return false
      })
      .finally(() => {
        refresh()
      })
  }

  return canVerify ? <IdentityUiSolanaWizard sign={request} {...props} /> : null
}
