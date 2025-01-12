import { ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiProviderButton } from './identity-ui-provider-button'
import { IdentityUiSolanaLoginButton } from './identity-ui-solana-login-button'
import { TelegramLoginButton } from '../../../../auth/ui/src/lib/web-auth-telegram-button'

export function IdentityUiLoginButton({
  provider,
  refresh,
  ...props
}: ButtonProps & { provider: IdentityProvider; refresh: () => void }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IdentityUiProviderButton action="login" provider={provider} fullWidth {...props} />
    case IdentityProvider.Solana:
      return <IdentityUiSolanaLoginButton refresh={refresh} fullWidth {...props} />
    case IdentityProvider.Telegram:
      return <TelegramLoginButton onSuccess={refresh} />
    default:
      return null
  }
}
