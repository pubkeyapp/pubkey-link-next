import { UiCard, UiStack } from '@pubkey-ui/core'
import { lazy } from 'react'

const UserProfileTabIdentitiesDiscordFeature = lazy(() => import('./user-profile-tab-identities-discord'))
const UserProfileTabIdentitiesSolanaFeature = lazy(() => import('./user-profile-tab-identities-solana'))

export default function UserProfileTabIdentities() {
  return (
    <UiStack>
      <UiCard title="Discord">
        <UserProfileTabIdentitiesDiscordFeature />
      </UiCard>
      <UiCard title="Solana">
        <UserProfileTabIdentitiesSolanaFeature />
      </UiCard>
    </UiStack>
  )
}
