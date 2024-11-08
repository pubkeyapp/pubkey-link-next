import { useIdentitySolanaLogin } from '@pubkey-link/web-identity-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { IdentityUiSolanaWizard, IdentityUiSolanaWizardProps } from './identity-ui-solana-wizard'

export function IdentityUiSolanaLoginWizard({
  refresh,
  ...props
}: Omit<IdentityUiSolanaWizardProps, 'sign'> & { refresh: () => void }) {
  const { connected, publicKey } = useWallet()
  const { verifyAndSign } = useIdentitySolanaLogin()
  const [active, setActive] = useState(0)

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

  return <IdentityUiSolanaWizard sign={request} {...props} />
}
