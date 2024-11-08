import { NetworkTokenType } from '@pubkey-link/sdk'
import { UserNetworkAssetFeature } from '@pubkey-link/web-network-asset-feature'
import { UiCard } from '@pubkey-ui/core'

export default function UserProfileTabCollectibles({ username }: { username: string }) {
  return (
    <UiCard>
      <UserNetworkAssetFeature username={username} type={NetworkTokenType.NonFungible} />
    </UiCard>
  )
}
