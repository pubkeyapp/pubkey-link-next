import { NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { NetworkAssetDetailFungible } from './network-asset-detail-fungible'
import { NetworkAssetDetailNonFungible } from './network-asset-detail-non-fungible'

export default function NetworkAssetDetailFeature(props: { token: NetworkToken; username: string }) {
  switch (props.token.type) {
    case NetworkTokenType.Fungible:
      return <NetworkAssetDetailFungible {...props} />
    case NetworkTokenType.NonFungible:
      return <NetworkAssetDetailNonFungible {...props} />
    default:
      return <NetworkTokenUiItem avatarProps={{ size: 'lg' }} networkToken={props.token} />
  }
}
