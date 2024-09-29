import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { IdentityProvider } from '@prisma/client'
import { getIdentityUrl, Identity } from '@pubkey-link/api-identity-data-access'

@Resolver(() => Identity)
export class ApiIdentityResolver {
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() identity: Identity) {
    return (
      (identity.profile as { avatarUrl?: string })?.avatarUrl ??
      (identity.profile as { avatarURL?: string })?.avatarURL ??
      null
    )
  }

  @ResolveField(() => Boolean, { nullable: true })
  expired(@Parent() identity: Identity) {
    if (identity.provider !== IdentityProvider.Discord) return false

    return !(identity.accessToken && identity.refreshToken)
  }

  @ResolveField(() => String)
  name(@Parent() identity: Identity) {
    return identity.name ?? (identity.profile as { username?: string })?.username ?? identity?.providerId
  }

  @ResolveField(() => String, { nullable: true })
  url(@Parent() identity: Identity) {
    return getIdentityUrl(identity)
  }
}
