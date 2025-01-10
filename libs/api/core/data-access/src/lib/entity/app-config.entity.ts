import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IdentityProvider } from './identity-provider.enum'
import { NetworkResolver } from './network-resolver.enum'

@ObjectType()
export class AppConfig {
  @Field({ nullable: true })
  appLogoUrlDark?: string
  @Field({ nullable: true })
  appLogoUrlLight?: string
  @Field({ nullable: true })
  appThemeBackground?: string
  @Field({ nullable: true })
  appThemeColor?: string
  @Field(() => [IdentityProvider], { nullable: true })
  authLoginProviders!: IdentityProvider[]
  @Field(() => [IdentityProvider], { nullable: true })
  authLinkProviders!: IdentityProvider[]
  @Field(() => [AppFeature])
  features!: AppFeature[]
  @Field(() => [NetworkResolver])
  resolvers!: NetworkResolver[]
}

export enum AppFeature {
  AnonCommunities = 'AnonCommunities',
  BotPlatformDiscord = 'BotPlatformDiscord',
  BotPlatformTelegram = 'BotPlatformTelegram',
  CommunityCreate = 'CommunityCreate',
  CommunitySnapshots = 'CommunitySnapshots',
  IdentityCliVerification = 'IdentityCliVerification',
  IdentityGrants = 'IdentityGrants',
  PubkeyProtocol = 'PubkeyProtocol',
}

registerEnumType(AppFeature, { name: 'AppFeature' })
