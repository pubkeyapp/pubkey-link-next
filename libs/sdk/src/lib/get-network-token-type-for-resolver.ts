import { NetworkResolver, NetworkTokenType } from '../generated/graphql-sdk'

export function getNetworkTokenTypeForResolver(resolver: NetworkResolver) {
  switch (resolver) {
    case NetworkResolver.SolanaFungible:
      return NetworkTokenType.Fungible
    case NetworkResolver.SolanaNonFungible:
      return NetworkTokenType.NonFungible
    case NetworkResolver.SolanaValidator:
      return NetworkTokenType.Validator
    default:
      return NetworkTokenType.NonFungible
  }
}
