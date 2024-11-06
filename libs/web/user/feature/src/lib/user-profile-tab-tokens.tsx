import { NetworkTokenType } from '@pubkey-link/sdk'
import { UserNetworkAssetFeature } from '@pubkey-link/web-network-asset-feature'
import { UiCard } from '@pubkey-ui/core'

export default function UserProfileTabTokens({ username }: { username: string }) {
  return (
    <UiCard title="Tokens">
      <UserNetworkAssetFeature username={username} type={NetworkTokenType.Fungible} />
    </UiCard>
  )
}
