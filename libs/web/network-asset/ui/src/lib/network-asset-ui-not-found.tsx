import { NetworkToken } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { UiInfo } from '@pubkey-ui/core'

export function NetworkAssetUiNotFound({ token, username }: { token: NetworkToken; username: string }) {
  const { user } = useAuth()

  const message =
    user?.username === username
      ? "You don't have any assets linked to your Solana wallets."
      : `No assets found for ${username}.`

  return <UiInfo title="No assets found" message={message} />
}
