import { SimpleGrid } from '@mantine/core'
import { getNetworkAssetUrl, NetworkAsset } from '@pubkey-link/sdk'
import { NetworkAssetUiItem } from './network-asset-ui-item'

export function NetworkAssetUiGrid({ networkAssets = [] }: { networkAssets: NetworkAsset[] }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
      {networkAssets.map((networkAsset) => (
        <NetworkAssetUiItem key={networkAsset.id} to={getNetworkAssetUrl(networkAsset)} networkAsset={networkAsset} />
      ))}
    </SimpleGrid>
  )
}
