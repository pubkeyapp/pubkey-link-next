import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { Logger } from '@nestjs/common'

export function getDasApiAssetAttributes(
  asset: DasApiAsset & { mint_extensions?: Record<string, Record<string, string>> },
): [string, string][] {
  const attributes = asset.content.metadata.attributes?.length ? asset.content.metadata.attributes : []

  if (typeof attributes?.filter !== 'function') {
    Logger.error(
      `Invalid attributes for asset ${asset.id}: ${JSON.stringify(asset.content.metadata)}`,
      'getDasApiAssetAttributes',
    )
    return []
  }

  const main = attributes.length
    ? (attributes
        .filter((s) => !!s)
        .filter((s) => s.trait_type?.length && s.value?.length)
        .map((s) => [s.trait_type?.toString(), s.value?.toString()]) as [string, string][])
    : []

  const attributesExt = getAdditionalMetadata(asset)
  const ext = attributesExt.length ? attributesExt : []

  return [...main, ...ext]
}

// Get the Token2022 additional metadata from the mint extensions
function getAdditionalMetadata(
  asset: DasApiAsset & { mint_extensions?: Record<string, Record<string, string>> },
): [string, string][] {
  if (
    asset.mint_extensions &&
    asset.mint_extensions['metadata'] &&
    asset.mint_extensions['metadata']['additional_metadata']
  ) {
    const pairs = asset.mint_extensions['metadata']['additional_metadata'] as unknown as [string, string][]
    // Only return any items if they have a value with a length
    return pairs.filter((pair) => pair[1]?.length)
  }
  return []
}
