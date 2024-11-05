import { UiCard, UiStack } from '@pubkey-ui/core'
import { SettingsIdentityDiscordFeature } from './settings-identity-feature'
import { SettingsWalletsFeature } from './settings-wallets-feature'

export default function ProfileSettingsIdentitiesFeature() {
  return (
    <UiStack>
      <UiCard title="Discord">
        <SettingsIdentityDiscordFeature />
      </UiCard>
      <UiCard title="Solana Wallets">
        <SettingsWalletsFeature />
      </UiCard>
    </UiStack>
  )
}
