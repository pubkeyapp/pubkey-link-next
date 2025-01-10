// @ts-nocheck
import { z } from 'zod'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type AdminAddCommunityMemberInput = {
  admin: Scalars['Boolean']['input']
  userId: Scalars['String']['input']
}

export type AdminCreateBotInput = {
  clientId: Scalars['String']['input']
  clientSecret: Scalars['String']['input']
  communityId: Scalars['String']['input']
  platform: BotPlatform
  token: Scalars['String']['input']
}

export type AdminCreateCommunityInput = {
  name: Scalars['String']['input']
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type AdminCreateNetworkInput = {
  cluster: NetworkCluster
  endpoint: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type AdminCreateNetworkTokenInput = {
  account: Scalars['String']['input']
  cluster: NetworkCluster
}

export type AdminCreateRoleInput = {
  communityId: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type AdminCreateSnapshotInput = {
  roleId: Scalars['String']['input']
}

export type AdminFindManyBotInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyCommunityMemberInput = {
  admin?: InputMaybe<Scalars['Boolean']['input']>
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyLogInput = {
  botId?: InputMaybe<Scalars['String']['input']>
  communityId?: InputMaybe<Scalars['String']['input']>
  identityProvider?: InputMaybe<IdentityProvider>
  identityProviderId?: InputMaybe<Scalars['String']['input']>
  level?: InputMaybe<LogLevel>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  relatedId?: InputMaybe<Scalars['String']['input']>
  relatedType?: InputMaybe<LogRelatedType>
  roleId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyNetworkAssetInput = {
  cluster: NetworkCluster
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<NetworkTokenType>
}

export type AdminFindManyNetworkInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyNetworkTokenInput = {
  cluster: NetworkCluster
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyRoleInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManySnapshotInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  roleId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatus>
}

export type AdminUpdateBotInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  clientId?: InputMaybe<Scalars['String']['input']>
  clientSecret?: InputMaybe<Scalars['String']['input']>
  communityId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  token?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  discordUrl?: InputMaybe<Scalars['String']['input']>
  enableSync?: InputMaybe<Scalars['Boolean']['input']>
  featured?: InputMaybe<Scalars['Boolean']['input']>
  githubUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  telegramUrl?: InputMaybe<Scalars['String']['input']>
  twitterUrl?: InputMaybe<Scalars['String']['input']>
  websiteUrl?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateCommunityMemberInput = {
  admin: Scalars['Boolean']['input']
}

export type AdminUpdateNetworkInput = {
  enableSync?: InputMaybe<Scalars['Boolean']['input']>
  endpoint?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateNetworkTokenInput = {
  name?: InputMaybe<Scalars['String']['input']>
  vault?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateRoleInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']['input']>
}

export type AppConfig = {
  __typename?: 'AppConfig'
  appLogoUrlDark?: Maybe<Scalars['String']['output']>
  appLogoUrlLight?: Maybe<Scalars['String']['output']>
  appThemeBackground?: Maybe<Scalars['String']['output']>
  appThemeColor?: Maybe<Scalars['String']['output']>
  authLinkProviders?: Maybe<Array<IdentityProvider>>
  authLoginProviders?: Maybe<Array<IdentityProvider>>
  features: Array<AppFeature>
  resolvers: Array<NetworkResolver>
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

export type Bot = {
  __typename?: 'Bot'
  application?: Maybe<Scalars['JSON']['output']>
  avatarUrl?: Maybe<Scalars['String']['output']>
  communityId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developersUrl: Scalars['String']['output']
  id: Scalars['String']['output']
  inviteUrl: Scalars['String']['output']
  name: Scalars['String']['output']
  permissions?: Maybe<Array<BotRole>>
  platform: BotPlatform
  redirectUrl: Scalars['String']['output']
  redirectUrlSet?: Maybe<Scalars['Boolean']['output']>
  started: Scalars['Boolean']['output']
  status: BotStatus
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  verificationUrl: Scalars['String']['output']
  verificationUrlSet?: Maybe<Scalars['Boolean']['output']>
}

export type BotPaging = {
  __typename?: 'BotPaging'
  data: Array<Bot>
  meta: PagingMeta
}

export enum BotPlatform {
  Discord = 'Discord',
  Telegram = 'Telegram',
}

export type BotRole = {
  __typename?: 'BotRole'
  botId?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  permissions?: Maybe<Array<Role>>
  server?: Maybe<DiscordServer>
  serverId?: Maybe<Scalars['String']['output']>
  serverRole?: Maybe<DiscordRole>
  serverRoleId?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type BotServer = {
  __typename?: 'BotServer'
  adminRoles?: Maybe<Array<Scalars['String']['output']>>
  botChannel?: Maybe<Scalars['String']['output']>
  botId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  dryRun?: Maybe<Scalars['Boolean']['output']>
  enableSync?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  serverId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  verbose?: Maybe<Scalars['Boolean']['output']>
}

export enum BotStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export type Community = {
  __typename?: 'Community'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  discordUrl?: Maybe<Scalars['String']['output']>
  enableSync?: Maybe<Scalars['Boolean']['output']>
  featured?: Maybe<Scalars['Boolean']['output']>
  githubUrl?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  membership?: Maybe<CommunityMember>
  name: Scalars['String']['output']
  roles?: Maybe<Array<Role>>
  telegramUrl?: Maybe<Scalars['String']['output']>
  twitterUrl?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
  websiteUrl?: Maybe<Scalars['String']['output']>
}

export type CommunityMember = {
  __typename?: 'CommunityMember'
  admin: Scalars['Boolean']['output']
  communityId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  roles?: Maybe<Array<Role>>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  userId: Scalars['String']['output']
}

export type CommunityMemberPaging = {
  __typename?: 'CommunityMemberPaging'
  data: Array<CommunityMember>
  meta: PagingMeta
}

export type CommunityPaging = {
  __typename?: 'CommunityPaging'
  data: Array<Community>
  meta: PagingMeta
}

export type DiscordChannel = {
  __typename?: 'DiscordChannel'
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  parentId?: Maybe<Scalars['String']['output']>
  type: Scalars['String']['output']
}

export type DiscordRole = {
  __typename?: 'DiscordRole'
  color: Scalars['Int']['output']
  id: Scalars['String']['output']
  managed: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  position: Scalars['Int']['output']
}

export type DiscordServer = {
  __typename?: 'DiscordServer'
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  permissions?: Maybe<Array<Scalars['String']['output']>>
}

export type Identity = {
  __typename?: 'Identity'
  avatarUrl?: Maybe<Scalars['String']['output']>
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  expired?: Maybe<Scalars['Boolean']['output']>
  grants?: Maybe<Array<IdentityGrant>>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  owner?: Maybe<User>
  ownerId?: Maybe<Scalars['String']['output']>
  profile?: Maybe<Scalars['JSON']['output']>
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  syncEnded?: Maybe<Scalars['DateTime']['output']>
  syncStarted?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  url?: Maybe<Scalars['String']['output']>
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type IdentityChallenge = {
  __typename?: 'IdentityChallenge'
  blockhash?: Maybe<Scalars['String']['output']>
  challenge: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  signature?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  userAgent: Scalars['String']['output']
  verified: Scalars['Boolean']['output']
}

export type IdentityGrant = {
  __typename?: 'IdentityGrant'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  grantee?: Maybe<User>
  granteeId: Scalars['String']['output']
  id: Scalars['String']['output']
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export enum IdentityProvider {
  Discord = 'Discord',
  Solana = 'Solana',
}

export type LinkIdentityInput = {
  name?: InputMaybe<Scalars['String']['input']>
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type Log = {
  __typename?: 'Log'
  bot?: Maybe<Bot>
  botId?: Maybe<Scalars['String']['output']>
  communityId?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  data?: Maybe<Scalars['JSON']['output']>
  id: Scalars['String']['output']
  identity?: Maybe<Identity>
  identityProvider?: Maybe<IdentityProvider>
  identityProviderId?: Maybe<Scalars['String']['output']>
  level: LogLevel
  message: Scalars['String']['output']
  networkAsset?: Maybe<NetworkAsset>
  networkAssetId?: Maybe<Scalars['String']['output']>
  relatedId?: Maybe<Scalars['String']['output']>
  relatedType?: Maybe<LogRelatedType>
  role?: Maybe<Role>
  roleId?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  userId?: Maybe<Scalars['String']['output']>
}

export enum LogLevel {
  Error = 'Error',
  Info = 'Info',
  Verbose = 'Verbose',
  Warning = 'Warning',
}

export type LogPaging = {
  __typename?: 'LogPaging'
  data: Array<Log>
  meta: PagingMeta
}

export enum LogRelatedType {
  Bot = 'Bot',
  BotMember = 'BotMember',
  Community = 'Community',
  Identity = 'Identity',
  Role = 'Role',
  User = 'User',
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddCommunityMember?: Maybe<CommunityMember>
  adminCleanupNetworkAssets?: Maybe<Scalars['Boolean']['output']>
  adminCreateBackup: Scalars['Boolean']['output']
  adminCreateBot?: Maybe<Bot>
  adminCreateCommunity?: Maybe<Community>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateNetwork?: Maybe<Network>
  adminCreateNetworkToken?: Maybe<NetworkToken>
  adminCreateRole?: Maybe<Role>
  adminCreateSnapshot?: Maybe<Snapshot>
  adminDeleteBackup: Scalars['Boolean']['output']
  adminDeleteBot?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteLog?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetwork?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetworkAsset?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetworkToken?: Maybe<Scalars['Boolean']['output']>
  adminDeleteRole?: Maybe<Scalars['Boolean']['output']>
  adminDeleteSnapshot?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminFetchBackup: Scalars['Boolean']['output']
  adminPurgeLogs?: Maybe<Scalars['Boolean']['output']>
  adminRefreshVoteIdentities?: Maybe<Scalars['Boolean']['output']>
  adminRemoveCommunityMember?: Maybe<Scalars['Boolean']['output']>
  adminRestoreBackup: Scalars['Boolean']['output']
  adminSetIdentityVerified?: Maybe<Scalars['Boolean']['output']>
  adminSyncIdentity?: Maybe<Scalars['Boolean']['output']>
  adminSyncNetworkAssets?: Maybe<Scalars['Boolean']['output']>
  adminUpdateBot?: Maybe<Bot>
  adminUpdateCommunity?: Maybe<Community>
  adminUpdateCommunityMember?: Maybe<CommunityMember>
  adminUpdateNetwork?: Maybe<Network>
  adminUpdateNetworkToken?: Maybe<NetworkToken>
  adminUpdateNetworkTokenMetadata?: Maybe<NetworkToken>
  adminUpdateRole?: Maybe<Role>
  adminUpdateUser?: Maybe<User>
  adminVerifyNetworkAssets?: Maybe<Scalars['Boolean']['output']>
  anonVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  logout?: Maybe<Scalars['Boolean']['output']>
  userAddCommunityMember?: Maybe<CommunityMember>
  userAddIdentityGrant?: Maybe<Scalars['Boolean']['output']>
  userCreateBot?: Maybe<Bot>
  userCreateCommunity?: Maybe<Community>
  userCreateRole?: Maybe<Role>
  userCreateRoleCondition?: Maybe<RoleCondition>
  userCreateRolePermission?: Maybe<RolePermission>
  userCreateSnapshot?: Maybe<Snapshot>
  userDeleteBot?: Maybe<Scalars['Boolean']['output']>
  userDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userDeleteRole?: Maybe<Scalars['Boolean']['output']>
  userDeleteRoleCondition?: Maybe<Scalars['Boolean']['output']>
  userDeleteRolePermission?: Maybe<Scalars['Boolean']['output']>
  userDeleteSnapshot?: Maybe<Scalars['Boolean']['output']>
  userLeaveBotServer?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userRefreshIdentity?: Maybe<Scalars['Boolean']['output']>
  userRemoveCommunityMember?: Maybe<Scalars['Boolean']['output']>
  userRemoveIdentityGrant?: Maybe<Scalars['Boolean']['output']>
  userStartBot?: Maybe<Scalars['Boolean']['output']>
  userStopBot?: Maybe<Scalars['Boolean']['output']>
  userSyncBotServer?: Maybe<Scalars['Boolean']['output']>
  userSyncCommunityRoles?: Maybe<Scalars['JSON']['output']>
  userTestBotServerConfig?: Maybe<BotServer>
  userUpdateBot?: Maybe<Bot>
  userUpdateBotServer?: Maybe<BotServer>
  userUpdateCommunity?: Maybe<Community>
  userUpdateCommunityMember?: Maybe<CommunityMember>
  userUpdateIdentity?: Maybe<Identity>
  userUpdateRole?: Maybe<Role>
  userUpdateRoleCondition?: Maybe<RoleCondition>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  userVerifyIdentityChallengeCli?: Maybe<IdentityChallenge>
}

export type MutationAdminAddCommunityMemberArgs = {
  communityId: Scalars['String']['input']
  input: AdminAddCommunityMemberInput
}

export type MutationAdminCleanupNetworkAssetsArgs = {
  cluster: NetworkCluster
}

export type MutationAdminCreateBotArgs = {
  input: AdminCreateBotInput
}

export type MutationAdminCreateCommunityArgs = {
  input: AdminCreateCommunityInput
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateNetworkArgs = {
  input: AdminCreateNetworkInput
}

export type MutationAdminCreateNetworkTokenArgs = {
  input: AdminCreateNetworkTokenInput
}

export type MutationAdminCreateRoleArgs = {
  input: AdminCreateRoleInput
}

export type MutationAdminCreateSnapshotArgs = {
  input: AdminCreateSnapshotInput
}

export type MutationAdminDeleteBackupArgs = {
  name: Scalars['String']['input']
}

export type MutationAdminDeleteBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationAdminDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminDeleteLogArgs = {
  logId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkAssetArgs = {
  networkAssetId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkTokenArgs = {
  networkTokenId: Scalars['String']['input']
}

export type MutationAdminDeleteRoleArgs = {
  roleId: Scalars['String']['input']
}

export type MutationAdminDeleteSnapshotArgs = {
  snapshotId: Scalars['String']['input']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationAdminFetchBackupArgs = {
  url: Scalars['String']['input']
}

export type MutationAdminRefreshVoteIdentitiesArgs = {
  networkId: Scalars['String']['input']
}

export type MutationAdminRemoveCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type MutationAdminRestoreBackupArgs = {
  name: Scalars['String']['input']
}

export type MutationAdminSetIdentityVerifiedArgs = {
  identityId: Scalars['String']['input']
  verified: Scalars['Boolean']['input']
}

export type MutationAdminSyncIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminUpdateBotArgs = {
  botId: Scalars['String']['input']
  input: AdminUpdateBotInput
}

export type MutationAdminUpdateCommunityArgs = {
  communityId: Scalars['String']['input']
  input: AdminUpdateCommunityInput
}

export type MutationAdminUpdateCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
  input: AdminUpdateCommunityMemberInput
}

export type MutationAdminUpdateNetworkArgs = {
  input: AdminUpdateNetworkInput
  networkId: Scalars['String']['input']
}

export type MutationAdminUpdateNetworkTokenArgs = {
  input: AdminUpdateNetworkTokenInput
  networkTokenId: Scalars['String']['input']
}

export type MutationAdminUpdateNetworkTokenMetadataArgs = {
  networkTokenId: Scalars['String']['input']
}

export type MutationAdminUpdateRoleArgs = {
  input: AdminUpdateRoleInput
  roleId: Scalars['String']['input']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']['input']
}

export type MutationAnonVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type MutationUserAddCommunityMemberArgs = {
  communityId: Scalars['String']['input']
  input: UserAddCommunityMemberInput
}

export type MutationUserAddIdentityGrantArgs = {
  input: UserAddIdentityGrantInput
}

export type MutationUserCreateBotArgs = {
  input: UserCreateBotInput
}

export type MutationUserCreateCommunityArgs = {
  input: UserCreateCommunityInput
}

export type MutationUserCreateRoleArgs = {
  input: UserCreateRoleInput
}

export type MutationUserCreateRoleConditionArgs = {
  input: UserCreateRoleConditionInput
}

export type MutationUserCreateRolePermissionArgs = {
  input: UserCreateRolePermissionInput
}

export type MutationUserCreateSnapshotArgs = {
  input: UserCreateSnapshotInput
}

export type MutationUserDeleteBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationUserDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserDeleteRoleArgs = {
  roleId: Scalars['String']['input']
}

export type MutationUserDeleteRoleConditionArgs = {
  roleConditionId: Scalars['String']['input']
}

export type MutationUserDeleteRolePermissionArgs = {
  rolePermissionId: Scalars['String']['input']
}

export type MutationUserDeleteSnapshotArgs = {
  snapshotId: Scalars['String']['input']
}

export type MutationUserLeaveBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserRefreshIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserRemoveCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type MutationUserRemoveIdentityGrantArgs = {
  input: UserRemoveIdentityGrantInput
}

export type MutationUserStartBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationUserStopBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationUserSyncBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationUserSyncCommunityRolesArgs = {
  communityId: Scalars['String']['input']
}

export type MutationUserTestBotServerConfigArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationUserUpdateBotArgs = {
  botId: Scalars['String']['input']
  input: UserUpdateBotInput
}

export type MutationUserUpdateBotServerArgs = {
  botId: Scalars['String']['input']
  input: UserUpdateBotServerInput
  serverId: Scalars['String']['input']
}

export type MutationUserUpdateCommunityArgs = {
  communityId: Scalars['String']['input']
  input: UserUpdateCommunityInput
}

export type MutationUserUpdateCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
  input: UserUpdateCommunityMemberInput
}

export type MutationUserUpdateIdentityArgs = {
  identityId: Scalars['String']['input']
  input: UserUpdateIdentityInput
}

export type MutationUserUpdateRoleArgs = {
  input: UserUpdateRoleInput
  roleId: Scalars['String']['input']
}

export type MutationUserUpdateRoleConditionArgs = {
  input: UserUpdateRoleConditionInput
  roleConditionId: Scalars['String']['input']
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type MutationUserVerifyIdentityChallengeCliArgs = {
  input: VerifyIdentityChallengeInput
}

export type Network = {
  __typename?: 'Network'
  cluster: NetworkCluster
  createdAt?: Maybe<Scalars['DateTime']['output']>
  decimals: Scalars['Int']['output']
  enableSync?: Maybe<Scalars['Boolean']['output']>
  endpoint: Scalars['String']['output']
  explorerUrl: Scalars['String']['output']
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  symbol: Scalars['String']['output']
  type: NetworkType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  voters?: Maybe<Array<Scalars['String']['output']>>
}

export type NetworkAsset = {
  __typename?: 'NetworkAsset'
  account: Scalars['String']['output']
  attributes?: Maybe<Scalars['JSON']['output']>
  balance?: Maybe<Scalars['String']['output']>
  burnt?: Maybe<Scalars['Boolean']['output']>
  cluster: NetworkCluster
  createdAt?: Maybe<Scalars['DateTime']['output']>
  decimals: Scalars['Int']['output']
  explorerUrl: Scalars['String']['output']
  group?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  metadata?: Maybe<Scalars['JSON']['output']>
  mint: Scalars['String']['output']
  name: Scalars['String']['output']
  owner: Scalars['String']['output']
  program?: Maybe<Scalars['String']['output']>
  resolver: NetworkResolver
  symbol?: Maybe<Scalars['String']['output']>
  type: NetworkTokenType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type NetworkAssetPaging = {
  __typename?: 'NetworkAssetPaging'
  data: Array<NetworkAsset>
  meta: PagingMeta
}

export enum NetworkCluster {
  SolanaCustom = 'SolanaCustom',
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
  SolanaTestnet = 'SolanaTestnet',
}

export type NetworkPaging = {
  __typename?: 'NetworkPaging'
  data: Array<Network>
  meta: PagingMeta
}

export enum NetworkResolver {
  Anybodies = 'Anybodies',
  SolanaFungible = 'SolanaFungible',
  SolanaNonFungible = 'SolanaNonFungible',
  SolanaValidator = 'SolanaValidator',
}

export type NetworkToken = {
  __typename?: 'NetworkToken'
  account: Scalars['String']['output']
  cluster: NetworkCluster
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  metadataUrl?: Maybe<Scalars['String']['output']>
  mintList?: Maybe<Array<Scalars['String']['output']>>
  name: Scalars['String']['output']
  program: Scalars['String']['output']
  raw?: Maybe<Scalars['JSON']['output']>
  symbol?: Maybe<Scalars['String']['output']>
  type: NetworkTokenType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  vault?: Maybe<Scalars['String']['output']>
}

export type NetworkTokenPaging = {
  __typename?: 'NetworkTokenPaging'
  data: Array<NetworkToken>
  meta: PagingMeta
}

export enum NetworkTokenType {
  Fungible = 'Fungible',
  NonFungible = 'NonFungible',
  Validator = 'Validator',
}

export enum NetworkType {
  Solana = 'Solana',
}

export type PagingMeta = {
  __typename?: 'PagingMeta'
  currentPage: Scalars['Int']['output']
  isFirstPage: Scalars['Boolean']['output']
  isLastPage: Scalars['Boolean']['output']
  nextPage?: Maybe<Scalars['Int']['output']>
  pageCount?: Maybe<Scalars['Int']['output']>
  previousPage?: Maybe<Scalars['Int']['output']>
  totalCount?: Maybe<Scalars['Int']['output']>
}

export type Query = {
  __typename?: 'Query'
  adminFindManyBot: BotPaging
  adminFindManyCommunity: CommunityPaging
  adminFindManyCommunityMember: CommunityMemberPaging
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyLog: LogPaging
  adminFindManyNetwork: NetworkPaging
  adminFindManyNetworkAsset: NetworkAssetPaging
  adminFindManyNetworkToken: NetworkTokenPaging
  adminFindManyRole: RolePaging
  adminFindManySnapshot: SnapshotPaging
  adminFindManyUser: UserPaging
  adminFindOneBot?: Maybe<Bot>
  adminFindOneCommunity?: Maybe<Community>
  adminFindOneCommunityMember?: Maybe<CommunityMember>
  adminFindOneLog?: Maybe<Log>
  adminFindOneNetwork?: Maybe<Network>
  adminFindOneNetworkAsset?: Maybe<NetworkAsset>
  adminFindOneNetworkToken?: Maybe<NetworkToken>
  adminFindOneRole?: Maybe<Role>
  adminFindOneSnapshot?: Maybe<Snapshot>
  adminFindOneUser?: Maybe<User>
  adminFindUserByIdentity?: Maybe<User>
  adminGetBackup?: Maybe<Scalars['JSON']['output']>
  adminGetBackups: Array<Scalars['String']['output']>
  adminGetVoteIdentities: Array<Scalars['String']['output']>
  adminTableStats?: Maybe<Array<StatRecordGroup>>
  anonGetCommunities: Array<Community>
  anonRequestIdentityChallenge?: Maybe<IdentityChallenge>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyBotRoles?: Maybe<Array<BotRole>>
  userFindManyCommunity: CommunityPaging
  userFindManyCommunityMember: CommunityMemberPaging
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyLog: LogPaging
  userFindManyNetworkAsset: NetworkAssetPaging
  userFindManyNetworkToken: NetworkTokenPaging
  userFindManyRole: RolePaging
  userFindManySnapshot: SnapshotPaging
  userFindManyUser: UserPaging
  userFindOneBot?: Maybe<Bot>
  userFindOneBotServer?: Maybe<BotServer>
  userFindOneCommunity?: Maybe<Community>
  userFindOneCommunityMember?: Maybe<CommunityMember>
  userFindOneIdentity?: Maybe<Identity>
  userFindOneLog?: Maybe<Log>
  userFindOneNetworkAsset?: Maybe<NetworkAsset>
  userFindOneRole?: Maybe<Role>
  userFindOneSnapshot?: Maybe<Snapshot>
  userFindOneUser?: Maybe<User>
  userFindOneUserById?: Maybe<User>
  userGetBotChannels?: Maybe<Array<DiscordChannel>>
  userGetBotRoles?: Maybe<Array<DiscordRole>>
  userGetBotServer?: Maybe<DiscordServer>
  userGetBotServers?: Maybe<Array<DiscordServer>>
  userGetCommunities: Array<Community>
  userGetCommunityMember?: Maybe<CommunityMember>
  userGetEnabledNetworkClusters: Array<NetworkCluster>
  userGetTokenAccounts?: Maybe<Scalars['JSON']['output']>
  userGetTokenMetadata?: Maybe<Scalars['JSON']['output']>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
  userRequestIdentityChallengeCli?: Maybe<IdentityChallenge>
}

export type QueryAdminFindManyBotArgs = {
  input: AdminFindManyBotInput
}

export type QueryAdminFindManyCommunityArgs = {
  input: AdminFindManyCommunityInput
}

export type QueryAdminFindManyCommunityMemberArgs = {
  input: AdminFindManyCommunityMemberInput
}

export type QueryAdminFindManyIdentityArgs = {
  input: AdminFindManyIdentityInput
}

export type QueryAdminFindManyLogArgs = {
  input: AdminFindManyLogInput
}

export type QueryAdminFindManyNetworkArgs = {
  input: AdminFindManyNetworkInput
}

export type QueryAdminFindManyNetworkAssetArgs = {
  input: AdminFindManyNetworkAssetInput
}

export type QueryAdminFindManyNetworkTokenArgs = {
  input: AdminFindManyNetworkTokenInput
}

export type QueryAdminFindManyRoleArgs = {
  input: AdminFindManyRoleInput
}

export type QueryAdminFindManySnapshotArgs = {
  input: AdminFindManySnapshotInput
}

export type QueryAdminFindManyUserArgs = {
  input: AdminFindManyUserInput
}

export type QueryAdminFindOneBotArgs = {
  botId: Scalars['String']['input']
}

export type QueryAdminFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryAdminFindOneCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type QueryAdminFindOneLogArgs = {
  logId: Scalars['String']['input']
}

export type QueryAdminFindOneNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type QueryAdminFindOneNetworkAssetArgs = {
  networkAssetId: Scalars['String']['input']
}

export type QueryAdminFindOneNetworkTokenArgs = {
  networkTokenId: Scalars['String']['input']
}

export type QueryAdminFindOneRoleArgs = {
  roleId: Scalars['String']['input']
}

export type QueryAdminFindOneSnapshotArgs = {
  snapshotId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryAdminFindUserByIdentityArgs = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type QueryAdminGetBackupArgs = {
  name: Scalars['String']['input']
}

export type QueryAdminGetVoteIdentitiesArgs = {
  networkId: Scalars['String']['input']
}

export type QueryAnonRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type QueryUserFindManyBotRolesArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserFindManyCommunityArgs = {
  input: UserFindManyCommunityInput
}

export type QueryUserFindManyCommunityMemberArgs = {
  input: UserFindManyCommunityMemberInput
}

export type QueryUserFindManyIdentityArgs = {
  input: UserFindManyIdentityInput
}

export type QueryUserFindManyLogArgs = {
  input: UserFindManyLogInput
}

export type QueryUserFindManyNetworkAssetArgs = {
  input: UserFindManyNetworkAssetInput
}

export type QueryUserFindManyNetworkTokenArgs = {
  input: UserFindManyNetworkTokenInput
}

export type QueryUserFindManyRoleArgs = {
  input: UserFindManyRoleInput
}

export type QueryUserFindManySnapshotArgs = {
  input: UserFindManySnapshotInput
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
}

export type QueryUserFindOneBotArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserFindOneBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserFindOneCommunityMemberArgs = {
  communityMemberId: Scalars['String']['input']
}

export type QueryUserFindOneIdentityArgs = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type QueryUserFindOneLogArgs = {
  logId: Scalars['String']['input']
}

export type QueryUserFindOneNetworkAssetArgs = {
  account: Scalars['String']['input']
  cluster: NetworkCluster
}

export type QueryUserFindOneRoleArgs = {
  roleId: Scalars['String']['input']
}

export type QueryUserFindOneSnapshotArgs = {
  snapshotId: Scalars['String']['input']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
}

export type QueryUserFindOneUserByIdArgs = {
  userId: Scalars['String']['input']
}

export type QueryUserGetBotChannelsArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserGetBotRolesArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserGetBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryUserGetBotServersArgs = {
  botId: Scalars['String']['input']
}

export type QueryUserGetCommunitiesArgs = {
  username: Scalars['String']['input']
}

export type QueryUserGetCommunityMemberArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserGetTokenAccountsArgs = {
  account: Scalars['String']['input']
  cluster: NetworkCluster
}

export type QueryUserGetTokenMetadataArgs = {
  account: Scalars['String']['input']
  cluster: NetworkCluster
}

export type QueryUserRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type QueryUserRequestIdentityChallengeCliArgs = {
  input: RequestIdentityChallengeInput
}

export type RequestIdentityChallengeInput = {
  name?: InputMaybe<Scalars['String']['input']>
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type Role = {
  __typename?: 'Role'
  communityId: Scalars['String']['output']
  conditions?: Maybe<Array<RoleCondition>>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  member?: Maybe<CommunityMember>
  name: Scalars['String']['output']
  permissions?: Maybe<Array<RolePermission>>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl?: Maybe<Scalars['String']['output']>
}

export type RoleCondition = {
  __typename?: 'RoleCondition'
  amount?: Maybe<Scalars['String']['output']>
  amountMax?: Maybe<Scalars['String']['output']>
  asset?: Maybe<SolanaNetworkAsset>
  config?: Maybe<Scalars['JSON']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  filters?: Maybe<Scalars['JSON']['output']>
  id: Scalars['String']['output']
  roleId?: Maybe<Scalars['String']['output']>
  token?: Maybe<NetworkToken>
  tokenId?: Maybe<Scalars['String']['output']>
  type: NetworkTokenType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  valid?: Maybe<Scalars['Boolean']['output']>
}

export type RolePaging = {
  __typename?: 'RolePaging'
  data: Array<Role>
  meta: PagingMeta
}

export type RolePermission = {
  __typename?: 'RolePermission'
  botId?: Maybe<Scalars['String']['output']>
  botRole?: Maybe<BotRole>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  role?: Maybe<Role>
  roleId?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type Snapshot = {
  __typename?: 'Snapshot'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  data?: Maybe<Array<SnapshotItem>>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  role?: Maybe<Role>
  roleId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type SnapshotAsset = {
  __typename?: 'SnapshotAsset'
  account?: Maybe<Scalars['String']['output']>
  balance?: Maybe<Scalars['String']['output']>
  mint?: Maybe<Scalars['String']['output']>
  owner?: Maybe<Scalars['String']['output']>
}

export type SnapshotItem = {
  __typename?: 'SnapshotItem'
  assets?: Maybe<Array<SnapshotAsset>>
  balance?: Maybe<Scalars['String']['output']>
  items?: Maybe<Scalars['Int']['output']>
  owner?: Maybe<SnapshotOwner>
}

export type SnapshotOwner = {
  __typename?: 'SnapshotOwner'
  discordId?: Maybe<Scalars['String']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type SnapshotPaging = {
  __typename?: 'SnapshotPaging'
  data: Array<Snapshot>
  meta: PagingMeta
}

export type SolanaNetworkAsset = {
  __typename?: 'SolanaNetworkAsset'
  accounts: Array<Scalars['String']['output']>
  amount: Scalars['String']['output']
  group?: Maybe<Scalars['String']['output']>
  owner: Scalars['String']['output']
}

export type StatRecord = {
  __typename?: 'StatRecord'
  name: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type StatRecordGroup = {
  __typename?: 'StatRecordGroup'
  name: Scalars['String']['output']
  records: Array<StatRecord>
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developer?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  identities?: Maybe<Array<Identity>>
  lastLogin?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  private?: Maybe<Scalars['Boolean']['output']>
  profileUrl: Scalars['String']['output']
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type UserAddCommunityMemberInput = {
  admin: Scalars['Boolean']['input']
  userId: Scalars['String']['input']
}

export type UserAddIdentityGrantInput = {
  granteeId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type UserCreateBotInput = {
  clientId: Scalars['String']['input']
  clientSecret: Scalars['String']['input']
  communityId: Scalars['String']['input']
  platform: BotPlatform
  token: Scalars['String']['input']
}

export type UserCreateCommunityInput = {
  name: Scalars['String']['input']
}

export type UserCreateRoleConditionInput = {
  roleId: Scalars['String']['input']
  tokenId: Scalars['String']['input']
}

export type UserCreateRoleInput = {
  communityId: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type UserCreateRolePermissionInput = {
  botId: Scalars['String']['input']
  roleId: Scalars['String']['input']
  serverId: Scalars['String']['input']
  serverRoleId: Scalars['String']['input']
}

export type UserCreateSnapshotInput = {
  roleId: Scalars['String']['input']
}

export type UserFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  withRoles?: InputMaybe<Scalars['Boolean']['input']>
}

export type UserFindManyCommunityMemberInput = {
  admin?: InputMaybe<Scalars['Boolean']['input']>
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyIdentityInput = {
  provider?: InputMaybe<IdentityProvider>
  username: Scalars['String']['input']
}

export type UserFindManyLogInput = {
  botId?: InputMaybe<Scalars['String']['input']>
  communityId?: InputMaybe<Scalars['String']['input']>
  identityProvider?: InputMaybe<IdentityProvider>
  identityProviderId?: InputMaybe<Scalars['String']['input']>
  level?: InputMaybe<LogLevel>
  limit?: InputMaybe<Scalars['Int']['input']>
  networkAssetId?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  relatedId?: InputMaybe<Scalars['String']['input']>
  relatedType?: InputMaybe<LogRelatedType>
  roleId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyNetworkAssetInput = {
  cluster?: InputMaybe<NetworkCluster>
  group?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<NetworkTokenType>
  username: Scalars['String']['input']
}

export type UserFindManyNetworkTokenInput = {
  cluster?: InputMaybe<NetworkCluster>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<NetworkTokenType>
  username?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyRoleInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManySnapshotInput = {
  communityId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  roleId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserPaging = {
  __typename?: 'UserPaging'
  data: Array<User>
  meta: PagingMeta
}

export type UserRemoveIdentityGrantInput = {
  granteeId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUpdateBotInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  clientId?: InputMaybe<Scalars['String']['input']>
  clientSecret?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  token?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateBotServerInput = {
  adminRoles?: InputMaybe<Array<Scalars['String']['input']>>
  botChannel?: InputMaybe<Scalars['String']['input']>
  dryRun?: InputMaybe<Scalars['Boolean']['input']>
  enableSync?: InputMaybe<Scalars['Boolean']['input']>
  verbose?: InputMaybe<Scalars['Boolean']['input']>
}

export type UserUpdateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  discordUrl?: InputMaybe<Scalars['String']['input']>
  enableSync?: InputMaybe<Scalars['Boolean']['input']>
  githubUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  telegramUrl?: InputMaybe<Scalars['String']['input']>
  twitterUrl?: InputMaybe<Scalars['String']['input']>
  websiteUrl?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateCommunityMemberInput = {
  admin: Scalars['Boolean']['input']
}

export type UserUpdateIdentityInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateRoleConditionInput = {
  amount?: InputMaybe<Scalars['String']['input']>
  amountMax?: InputMaybe<Scalars['String']['input']>
  config?: InputMaybe<Scalars['JSON']['input']>
  filters?: InputMaybe<Scalars['JSON']['input']>
}

export type UserUpdateRoleInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
}

export type VerifyIdentityChallengeInput = {
  challenge: Scalars['String']['input']
  message: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
  signature: Scalars['String']['input']
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      avatarUrl?: string | null
      id: string
      name: string
      provider: IdentityProvider
      providerId: string
      verified?: boolean | null
    }> | null
  } | null
}

export type AdminCreateBackupMutationVariables = Exact<{ [key: string]: never }>

export type AdminCreateBackupMutation = { __typename?: 'Mutation'; created: boolean }

export type AdminDeleteBackupMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminDeleteBackupMutation = { __typename?: 'Mutation'; deleted: boolean }

export type AdminFetchBackupMutationVariables = Exact<{
  url: Scalars['String']['input']
}>

export type AdminFetchBackupMutation = { __typename?: 'Mutation'; fetched: boolean }

export type AdminGetBackupQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminGetBackupQuery = { __typename?: 'Query'; item?: any | null }

export type AdminGetBackupsQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetBackupsQuery = { __typename?: 'Query'; items: Array<string> }

export type AdminRestoreBackupMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminRestoreBackupMutation = { __typename?: 'Mutation'; restored: boolean }

export type BotDetailsFragment = {
  __typename?: 'Bot'
  avatarUrl?: string | null
  communityId: string
  createdAt?: Date | null
  developersUrl: string
  id: string
  inviteUrl: string
  name: string
  platform: BotPlatform
  redirectUrl: string
  redirectUrlSet?: boolean | null
  started: boolean
  status: BotStatus
  updatedAt?: Date | null
  verificationUrl: string
  verificationUrlSet?: boolean | null
}

export type BotServerDetailsFragment = {
  __typename?: 'BotServer'
  id: string
  createdAt?: Date | null
  updatedAt?: Date | null
  botId: string
  serverId: string
  adminRoles?: Array<string> | null
  botChannel?: string | null
  dryRun?: boolean | null
  enableSync?: boolean | null
  verbose?: boolean | null
}

export type BotRoleDetailsFragment = {
  __typename?: 'BotRole'
  botId?: string | null
  createdAt?: Date | null
  id: string
  serverId?: string | null
  updatedAt?: Date | null
  serverRoleId?: string | null
  serverRole?: {
    __typename?: 'DiscordRole'
    id: string
    name: string
    managed: boolean
    color: number
    position: number
  } | null
  server?: {
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  } | null
}

export type DiscordServerDetailsFragment = {
  __typename?: 'DiscordServer'
  id: string
  name: string
  icon?: string | null
  permissions?: Array<string> | null
}

export type DiscordChannelDetailsFragment = {
  __typename?: 'DiscordChannel'
  id: string
  name: string
  parentId?: string | null
  type: string
}

export type DiscordRoleDetailsFragment = {
  __typename?: 'DiscordRole'
  id: string
  name: string
  managed: boolean
  color: number
  position: number
}

export type AdminFindManyBotQueryVariables = Exact<{
  input: AdminFindManyBotInput
}>

export type AdminFindManyBotQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'BotPaging'
    data: Array<{
      __typename?: 'Bot'
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      developersUrl: string
      id: string
      inviteUrl: string
      name: string
      platform: BotPlatform
      redirectUrl: string
      redirectUrlSet?: boolean | null
      started: boolean
      status: BotStatus
      updatedAt?: Date | null
      verificationUrl: string
      verificationUrlSet?: boolean | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneBotQueryVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type AdminFindOneBotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    platform: BotPlatform
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type AdminCreateBotMutationVariables = Exact<{
  input: AdminCreateBotInput
}>

export type AdminCreateBotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    platform: BotPlatform
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type AdminUpdateBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
  input: AdminUpdateBotInput
}>

export type AdminUpdateBotMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    platform: BotPlatform
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type AdminDeleteBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type AdminDeleteBotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindOneBotQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserFindOneBotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    platform: BotPlatform
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type UserFindManyBotRolesQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserFindManyBotRolesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'BotRole'
    botId?: string | null
    createdAt?: Date | null
    id: string
    serverId?: string | null
    updatedAt?: Date | null
    serverRoleId?: string | null
    permissions?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    serverRole?: {
      __typename?: 'DiscordRole'
      id: string
      name: string
      managed: boolean
      color: number
      position: number
    } | null
    server?: {
      __typename?: 'DiscordServer'
      id: string
      name: string
      icon?: string | null
      permissions?: Array<string> | null
    } | null
  }> | null
}

export type UserFindOneBotServerQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserFindOneBotServerQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'BotServer'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    botId: string
    serverId: string
    adminRoles?: Array<string> | null
    botChannel?: string | null
    dryRun?: boolean | null
    enableSync?: boolean | null
    verbose?: boolean | null
  } | null
}

export type UserCreateBotMutationVariables = Exact<{
  input: UserCreateBotInput
}>

export type UserCreateBotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    platform: BotPlatform
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type UserUpdateBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
  input: UserUpdateBotInput
}>

export type UserUpdateBotMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    platform: BotPlatform
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type UserTestBotServerConfigMutationVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserTestBotServerConfigMutation = {
  __typename?: 'Mutation'
  tested?: {
    __typename?: 'BotServer'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    botId: string
    serverId: string
    adminRoles?: Array<string> | null
    botChannel?: string | null
    dryRun?: boolean | null
    enableSync?: boolean | null
    verbose?: boolean | null
  } | null
}

export type UserUpdateBotServerMutationVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
  input: UserUpdateBotServerInput
}>

export type UserUpdateBotServerMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'BotServer'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    botId: string
    serverId: string
    adminRoles?: Array<string> | null
    botChannel?: string | null
    dryRun?: boolean | null
    enableSync?: boolean | null
    verbose?: boolean | null
  } | null
}

export type UserDeleteBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserDeleteBotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserStartBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserStartBotMutation = { __typename?: 'Mutation'; started?: boolean | null }

export type UserStopBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserStopBotMutation = { __typename?: 'Mutation'; stopped?: boolean | null }

export type UserLeaveBotServerMutationVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserLeaveBotServerMutation = { __typename?: 'Mutation'; left?: boolean | null }

export type UserSyncBotServerMutationVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserSyncBotServerMutation = { __typename?: 'Mutation'; synced?: boolean | null }

export type UserGetBotChannelsQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserGetBotChannelsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordChannel'
    id: string
    name: string
    parentId?: string | null
    type: string
  }> | null
}

export type UserGetBotRolesQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserGetBotRolesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordRole'
    id: string
    name: string
    managed: boolean
    color: number
    position: number
  }> | null
}

export type UserGetBotServersQueryVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type UserGetBotServersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  }> | null
}

export type UserGetBotServerQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type UserGetBotServerQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  } | null
}

export type CommunityMemberDetailsFragment = {
  __typename?: 'CommunityMember'
  communityId: string
  createdAt?: Date | null
  id: string
  admin: boolean
  updatedAt?: Date | null
  userId: string
  user?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminFindManyCommunityMemberQueryVariables = Exact<{
  input: AdminFindManyCommunityMemberInput
}>

export type AdminFindManyCommunityMemberQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityMemberPaging'
    data: Array<{
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      roles?: Array<{
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      }> | null
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneCommunityMemberQueryVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type AdminFindOneCommunityMemberQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminAddCommunityMemberMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: AdminAddCommunityMemberInput
}>

export type AdminAddCommunityMemberMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminUpdateCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
  input: AdminUpdateCommunityMemberInput
}>

export type AdminUpdateCommunityMemberMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminRemoveCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type AdminRemoveCommunityMemberMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserGetCommunityMemberQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserGetCommunityMemberQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserFindManyCommunityMemberQueryVariables = Exact<{
  input: UserFindManyCommunityMemberInput
}>

export type UserFindManyCommunityMemberQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityMemberPaging'
    data: Array<{
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      roles?: Array<{
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      }> | null
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneCommunityMemberQueryVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type UserFindOneCommunityMemberQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserAddCommunityMemberMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: UserAddCommunityMemberInput
}>

export type UserAddCommunityMemberMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserUpdateCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
  input: UserUpdateCommunityMemberInput
}>

export type UserUpdateCommunityMemberMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserRemoveCommunityMemberMutationVariables = Exact<{
  communityMemberId: Scalars['String']['input']
}>

export type UserRemoveCommunityMemberMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type CommunityDetailsFragment = {
  __typename?: 'Community'
  createdAt?: Date | null
  id: string
  name: string
  enableSync?: boolean | null
  featured?: boolean | null
  avatarUrl?: string | null
  description?: string | null
  websiteUrl?: string | null
  discordUrl?: string | null
  githubUrl?: string | null
  twitterUrl?: string | null
  telegramUrl?: string | null
  updatedAt?: Date | null
  viewUrl: string
}

export type AdminFindManyCommunityQueryVariables = Exact<{
  input: AdminFindManyCommunityInput
}>

export type AdminFindManyCommunityQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityPaging'
    data: Array<{
      __typename?: 'Community'
      createdAt?: Date | null
      id: string
      name: string
      enableSync?: boolean | null
      featured?: boolean | null
      avatarUrl?: string | null
      description?: string | null
      websiteUrl?: string | null
      discordUrl?: string | null
      githubUrl?: string | null
      twitterUrl?: string | null
      telegramUrl?: string | null
      updatedAt?: Date | null
      viewUrl: string
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneCommunityQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminFindOneCommunityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type AdminCreateCommunityMutationVariables = Exact<{
  input: AdminCreateCommunityInput
}>

export type AdminCreateCommunityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type AdminUpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: AdminUpdateCommunityInput
}>

export type AdminUpdateCommunityMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type AdminDeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminDeleteCommunityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AnonGetCommunitiesQueryVariables = Exact<{ [key: string]: never }>

export type AnonGetCommunitiesQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
    }> | null
  }>
}

export type UserGetCommunitiesQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type UserGetCommunitiesQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
    membership?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      roles?: Array<{
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      }> | null
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
    roles?: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }> | null
  }>
}

export type UserFindManyCommunityQueryVariables = Exact<{
  input: UserFindManyCommunityInput
}>

export type UserFindManyCommunityQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityPaging'
    data: Array<{
      __typename?: 'Community'
      createdAt?: Date | null
      id: string
      name: string
      enableSync?: boolean | null
      featured?: boolean | null
      avatarUrl?: string | null
      description?: string | null
      websiteUrl?: string | null
      discordUrl?: string | null
      githubUrl?: string | null
      twitterUrl?: string | null
      telegramUrl?: string | null
      updatedAt?: Date | null
      viewUrl: string
      roles?: Array<{
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneCommunityQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserFindOneCommunityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type UserCreateCommunityMutationVariables = Exact<{
  input: UserCreateCommunityInput
}>

export type UserCreateCommunityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type UserUpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: UserUpdateCommunityInput
}>

export type UserUpdateCommunityMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Community'
    createdAt?: Date | null
    id: string
    name: string
    enableSync?: boolean | null
    featured?: boolean | null
    avatarUrl?: string | null
    description?: string | null
    websiteUrl?: string | null
    discordUrl?: string | null
    githubUrl?: string | null
    twitterUrl?: string | null
    telegramUrl?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type UserDeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserDeleteCommunityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  appLogoUrlDark?: string | null
  appLogoUrlLight?: string | null
  appThemeBackground?: string | null
  appThemeColor?: string | null
  authLinkProviders?: Array<IdentityProvider> | null
  authLoginProviders?: Array<IdentityProvider> | null
  features: Array<AppFeature>
  resolvers: Array<NetworkResolver>
}

export type PagingMetaDetailsFragment = {
  __typename?: 'PagingMeta'
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  nextPage?: number | null
  pageCount?: number | null
  previousPage?: number | null
  totalCount?: number | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type AppConfigQueryVariables = Exact<{ [key: string]: never }>

export type AppConfigQuery = {
  __typename?: 'Query'
  config: {
    __typename?: 'AppConfig'
    appLogoUrlDark?: string | null
    appLogoUrlLight?: string | null
    appThemeBackground?: string | null
    appThemeColor?: string | null
    authLinkProviders?: Array<IdentityProvider> | null
    authLoginProviders?: Array<IdentityProvider> | null
    features: Array<AppFeature>
    resolvers: Array<NetworkResolver>
  }
}

export type AdminTableStatsQueryVariables = Exact<{ [key: string]: never }>

export type AdminTableStatsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'StatRecordGroup'
    name: string
    records: Array<{ __typename?: 'StatRecord'; name: string; value: string }>
  }> | null
}

export type IdentitySummaryFragment = {
  __typename?: 'Identity'
  avatarUrl?: string | null
  id: string
  name: string
  provider: IdentityProvider
  providerId: string
  verified?: boolean | null
}

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  avatarUrl?: string | null
  createdAt?: Date | null
  syncStarted?: Date | null
  syncEnded?: Date | null
  expired?: boolean | null
  id: string
  name: string
  ownerId?: string | null
  profile?: any | null
  provider: IdentityProvider
  providerId: string
  updatedAt?: Date | null
  url?: string | null
  verified?: boolean | null
}

export type IdentityChallengeDetailsFragment = {
  __typename?: 'IdentityChallenge'
  id: string
  createdAt: Date
  updatedAt: Date
  provider: IdentityProvider
  providerId: string
  challenge: string
  signature?: string | null
  blockhash?: string | null
  userAgent: string
  verified: boolean
}

export type IdentityGrantDetailsFragment = {
  __typename?: 'IdentityGrant'
  createdAt?: Date | null
  id: string
  granteeId: string
  provider: IdentityProvider
  providerId: string
  updatedAt?: Date | null
  grantee?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminFindManyIdentityQueryVariables = Exact<{
  input: AdminFindManyIdentityInput
}>

export type AdminFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    syncStarted?: Date | null
    syncEnded?: Date | null
    expired?: boolean | null
    id: string
    name: string
    ownerId?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
    challenges?: Array<{
      __typename?: 'IdentityChallenge'
      id: string
      createdAt: Date
      updatedAt: Date
      provider: IdentityProvider
      providerId: string
      challenge: string
      signature?: string | null
      blockhash?: string | null
      userAgent: string
      verified: boolean
    }> | null
    grants?: Array<{
      __typename?: 'IdentityGrant'
      createdAt?: Date | null
      id: string
      granteeId: string
      provider: IdentityProvider
      providerId: string
      updatedAt?: Date | null
      grantee?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminFindUserByIdentityQueryVariables = Exact<{
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}>

export type AdminFindUserByIdentityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    developer?: boolean | null
    private?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      avatarUrl?: string | null
      id: string
      name: string
      provider: IdentityProvider
      providerId: string
      verified?: boolean | null
    }> | null
  } | null
}

export type AdminCreateIdentityMutationVariables = Exact<{
  input: AdminCreateIdentityInput
}>

export type AdminCreateIdentityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    syncStarted?: Date | null
    syncEnded?: Date | null
    expired?: boolean | null
    id: string
    name: string
    ownerId?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
  } | null
}

export type AdminDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type AdminDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminSetIdentityVerifiedMutationVariables = Exact<{
  identityId: Scalars['String']['input']
  verified: Scalars['Boolean']['input']
}>

export type AdminSetIdentityVerifiedMutation = { __typename?: 'Mutation'; verified?: boolean | null }

export type AdminSyncIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type AdminSyncIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyIdentityQueryVariables = Exact<{
  input: UserFindManyIdentityInput
}>

export type UserFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    syncStarted?: Date | null
    syncEnded?: Date | null
    expired?: boolean | null
    id: string
    name: string
    ownerId?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
    grants?: Array<{
      __typename?: 'IdentityGrant'
      createdAt?: Date | null
      id: string
      granteeId: string
      provider: IdentityProvider
      providerId: string
      updatedAt?: Date | null
      grantee?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }> | null
  }> | null
}

export type UserFindOneIdentityQueryVariables = Exact<{
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}>

export type UserFindOneIdentityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    syncStarted?: Date | null
    syncEnded?: Date | null
    expired?: boolean | null
    id: string
    name: string
    ownerId?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
    grants?: Array<{
      __typename?: 'IdentityGrant'
      createdAt?: Date | null
      id: string
      granteeId: string
      provider: IdentityProvider
      providerId: string
      updatedAt?: Date | null
      grantee?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserUpdateIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
  input: UserUpdateIdentityInput
}>

export type UserUpdateIdentityMutation = {
  __typename?: 'Mutation'
  update?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    syncStarted?: Date | null
    syncEnded?: Date | null
    expired?: boolean | null
    id: string
    name: string
    ownerId?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
  } | null
}

export type UserRefreshIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserRefreshIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type UserRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    blockhash?: string | null
    userAgent: string
    verified: boolean
  } | null
}

export type UserRequestIdentityChallengeCliQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type UserRequestIdentityChallengeCliQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    blockhash?: string | null
    userAgent: string
    verified: boolean
  } | null
}

export type UserVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type UserVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    blockhash?: string | null
    userAgent: string
    verified: boolean
  } | null
}

export type UserVerifyIdentityChallengeCliMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type UserVerifyIdentityChallengeCliMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    blockhash?: string | null
    userAgent: string
    verified: boolean
  } | null
}

export type UserLinkIdentityMutationVariables = Exact<{
  input: LinkIdentityInput
}>

export type UserLinkIdentityMutation = {
  __typename?: 'Mutation'
  linked?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    syncStarted?: Date | null
    syncEnded?: Date | null
    expired?: boolean | null
    id: string
    name: string
    ownerId?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
  } | null
}

export type AnonRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type AnonRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    blockhash?: string | null
    userAgent: string
    verified: boolean
  } | null
}

export type AnonVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type AnonVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    blockhash?: string | null
    userAgent: string
    verified: boolean
  } | null
}

export type UserAddIdentityGrantMutationVariables = Exact<{
  input: UserAddIdentityGrantInput
}>

export type UserAddIdentityGrantMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type UserRemoveIdentityGrantMutationVariables = Exact<{
  input: UserRemoveIdentityGrantInput
}>

export type UserRemoveIdentityGrantMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type LogDetailsFragment = {
  __typename?: 'Log'
  createdAt?: Date | null
  id: string
  message: string
  level: LogLevel
  relatedId?: string | null
  relatedType?: LogRelatedType | null
  communityId?: string | null
  identityProvider?: IdentityProvider | null
  identityProviderId?: string | null
  networkAssetId?: string | null
  botId?: string | null
  userId?: string | null
  roleId?: string | null
  updatedAt?: Date | null
  data?: any | null
  bot?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    platform: BotPlatform
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status: BotStatus
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
  identity?: {
    __typename?: 'Identity'
    avatarUrl?: string | null
    createdAt?: Date | null
    syncStarted?: Date | null
    syncEnded?: Date | null
    expired?: boolean | null
    id: string
    name: string
    ownerId?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt?: Date | null
    url?: string | null
    verified?: boolean | null
  } | null
  networkAsset?: {
    __typename?: 'NetworkAsset'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    resolver: NetworkResolver
    type: NetworkTokenType
    account: string
    balance?: string | null
    name: string
    symbol?: string | null
    program?: string | null
    decimals: number
    mint: string
    burnt?: boolean | null
    owner: string
    group?: string | null
    imageUrl?: string | null
    explorerUrl: string
    metadata?: any | null
    attributes?: any | null
  } | null
  role?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
  user?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyLogQueryVariables = Exact<{
  input: UserFindManyLogInput
}>

export type UserFindManyLogQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'LogPaging'
    data: Array<{
      __typename?: 'Log'
      createdAt?: Date | null
      id: string
      message: string
      level: LogLevel
      relatedId?: string | null
      relatedType?: LogRelatedType | null
      communityId?: string | null
      identityProvider?: IdentityProvider | null
      identityProviderId?: string | null
      networkAssetId?: string | null
      botId?: string | null
      userId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      data?: any | null
      bot?: {
        __typename?: 'Bot'
        avatarUrl?: string | null
        communityId: string
        createdAt?: Date | null
        developersUrl: string
        id: string
        inviteUrl: string
        name: string
        platform: BotPlatform
        redirectUrl: string
        redirectUrlSet?: boolean | null
        started: boolean
        status: BotStatus
        updatedAt?: Date | null
        verificationUrl: string
        verificationUrlSet?: boolean | null
      } | null
      identity?: {
        __typename?: 'Identity'
        avatarUrl?: string | null
        createdAt?: Date | null
        syncStarted?: Date | null
        syncEnded?: Date | null
        expired?: boolean | null
        id: string
        name: string
        ownerId?: string | null
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt?: Date | null
        url?: string | null
        verified?: boolean | null
      } | null
      networkAsset?: {
        __typename?: 'NetworkAsset'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        resolver: NetworkResolver
        type: NetworkTokenType
        account: string
        balance?: string | null
        name: string
        symbol?: string | null
        program?: string | null
        decimals: number
        mint: string
        burnt?: boolean | null
        owner: string
        group?: string | null
        imageUrl?: string | null
        explorerUrl: string
        metadata?: any | null
        attributes?: any | null
      } | null
      role?: {
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      } | null
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneLogQueryVariables = Exact<{
  logId: Scalars['String']['input']
}>

export type UserFindOneLogQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Log'
    createdAt?: Date | null
    id: string
    message: string
    level: LogLevel
    relatedId?: string | null
    relatedType?: LogRelatedType | null
    communityId?: string | null
    identityProvider?: IdentityProvider | null
    identityProviderId?: string | null
    networkAssetId?: string | null
    botId?: string | null
    userId?: string | null
    roleId?: string | null
    updatedAt?: Date | null
    data?: any | null
    bot?: {
      __typename?: 'Bot'
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      developersUrl: string
      id: string
      inviteUrl: string
      name: string
      platform: BotPlatform
      redirectUrl: string
      redirectUrlSet?: boolean | null
      started: boolean
      status: BotStatus
      updatedAt?: Date | null
      verificationUrl: string
      verificationUrlSet?: boolean | null
    } | null
    identity?: {
      __typename?: 'Identity'
      avatarUrl?: string | null
      createdAt?: Date | null
      syncStarted?: Date | null
      syncEnded?: Date | null
      expired?: boolean | null
      id: string
      name: string
      ownerId?: string | null
      profile?: any | null
      provider: IdentityProvider
      providerId: string
      updatedAt?: Date | null
      url?: string | null
      verified?: boolean | null
    } | null
    networkAsset?: {
      __typename?: 'NetworkAsset'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      resolver: NetworkResolver
      type: NetworkTokenType
      account: string
      balance?: string | null
      name: string
      symbol?: string | null
      program?: string | null
      decimals: number
      mint: string
      burnt?: boolean | null
      owner: string
      group?: string | null
      imageUrl?: string | null
      explorerUrl: string
      metadata?: any | null
      attributes?: any | null
    } | null
    role?: {
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    } | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminFindManyLogQueryVariables = Exact<{
  input: AdminFindManyLogInput
}>

export type AdminFindManyLogQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'LogPaging'
    data: Array<{
      __typename?: 'Log'
      createdAt?: Date | null
      id: string
      message: string
      level: LogLevel
      relatedId?: string | null
      relatedType?: LogRelatedType | null
      communityId?: string | null
      identityProvider?: IdentityProvider | null
      identityProviderId?: string | null
      networkAssetId?: string | null
      botId?: string | null
      userId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      data?: any | null
      bot?: {
        __typename?: 'Bot'
        avatarUrl?: string | null
        communityId: string
        createdAt?: Date | null
        developersUrl: string
        id: string
        inviteUrl: string
        name: string
        platform: BotPlatform
        redirectUrl: string
        redirectUrlSet?: boolean | null
        started: boolean
        status: BotStatus
        updatedAt?: Date | null
        verificationUrl: string
        verificationUrlSet?: boolean | null
      } | null
      identity?: {
        __typename?: 'Identity'
        avatarUrl?: string | null
        createdAt?: Date | null
        syncStarted?: Date | null
        syncEnded?: Date | null
        expired?: boolean | null
        id: string
        name: string
        ownerId?: string | null
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt?: Date | null
        url?: string | null
        verified?: boolean | null
      } | null
      networkAsset?: {
        __typename?: 'NetworkAsset'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        resolver: NetworkResolver
        type: NetworkTokenType
        account: string
        balance?: string | null
        name: string
        symbol?: string | null
        program?: string | null
        decimals: number
        mint: string
        burnt?: boolean | null
        owner: string
        group?: string | null
        imageUrl?: string | null
        explorerUrl: string
        metadata?: any | null
        attributes?: any | null
      } | null
      role?: {
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      } | null
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneLogQueryVariables = Exact<{
  logId: Scalars['String']['input']
}>

export type AdminFindOneLogQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Log'
    createdAt?: Date | null
    id: string
    message: string
    level: LogLevel
    relatedId?: string | null
    relatedType?: LogRelatedType | null
    communityId?: string | null
    identityProvider?: IdentityProvider | null
    identityProviderId?: string | null
    networkAssetId?: string | null
    botId?: string | null
    userId?: string | null
    roleId?: string | null
    updatedAt?: Date | null
    data?: any | null
    bot?: {
      __typename?: 'Bot'
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      developersUrl: string
      id: string
      inviteUrl: string
      name: string
      platform: BotPlatform
      redirectUrl: string
      redirectUrlSet?: boolean | null
      started: boolean
      status: BotStatus
      updatedAt?: Date | null
      verificationUrl: string
      verificationUrlSet?: boolean | null
    } | null
    identity?: {
      __typename?: 'Identity'
      avatarUrl?: string | null
      createdAt?: Date | null
      syncStarted?: Date | null
      syncEnded?: Date | null
      expired?: boolean | null
      id: string
      name: string
      ownerId?: string | null
      profile?: any | null
      provider: IdentityProvider
      providerId: string
      updatedAt?: Date | null
      url?: string | null
      verified?: boolean | null
    } | null
    networkAsset?: {
      __typename?: 'NetworkAsset'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      resolver: NetworkResolver
      type: NetworkTokenType
      account: string
      balance?: string | null
      name: string
      symbol?: string | null
      program?: string | null
      decimals: number
      mint: string
      burnt?: boolean | null
      owner: string
      group?: string | null
      imageUrl?: string | null
      explorerUrl: string
      metadata?: any | null
      attributes?: any | null
    } | null
    role?: {
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    } | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminDeleteLogMutationVariables = Exact<{
  logId: Scalars['String']['input']
}>

export type AdminDeleteLogMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminPurgeLogsMutationVariables = Exact<{ [key: string]: never }>

export type AdminPurgeLogsMutation = { __typename?: 'Mutation'; purged?: boolean | null }

export type NetworkAssetDetailsFragment = {
  __typename?: 'NetworkAsset'
  id: string
  createdAt?: Date | null
  updatedAt?: Date | null
  cluster: NetworkCluster
  resolver: NetworkResolver
  type: NetworkTokenType
  account: string
  balance?: string | null
  name: string
  symbol?: string | null
  program?: string | null
  decimals: number
  mint: string
  burnt?: boolean | null
  owner: string
  group?: string | null
  imageUrl?: string | null
  explorerUrl: string
  metadata?: any | null
  attributes?: any | null
}

export type UserFindManyNetworkAssetQueryVariables = Exact<{
  input: UserFindManyNetworkAssetInput
}>

export type UserFindManyNetworkAssetQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkAssetPaging'
    data: Array<{
      __typename?: 'NetworkAsset'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      resolver: NetworkResolver
      type: NetworkTokenType
      account: string
      balance?: string | null
      name: string
      symbol?: string | null
      program?: string | null
      decimals: number
      mint: string
      burnt?: boolean | null
      owner: string
      group?: string | null
      imageUrl?: string | null
      explorerUrl: string
      metadata?: any | null
      attributes?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneNetworkAssetQueryVariables = Exact<{
  account: Scalars['String']['input']
  cluster: NetworkCluster
}>

export type UserFindOneNetworkAssetQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'NetworkAsset'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    resolver: NetworkResolver
    type: NetworkTokenType
    account: string
    balance?: string | null
    name: string
    symbol?: string | null
    program?: string | null
    decimals: number
    mint: string
    burnt?: boolean | null
    owner: string
    group?: string | null
    imageUrl?: string | null
    explorerUrl: string
    metadata?: any | null
    attributes?: any | null
  } | null
}

export type AdminFindManyNetworkAssetQueryVariables = Exact<{
  input: AdminFindManyNetworkAssetInput
}>

export type AdminFindManyNetworkAssetQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkAssetPaging'
    data: Array<{
      __typename?: 'NetworkAsset'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      resolver: NetworkResolver
      type: NetworkTokenType
      account: string
      balance?: string | null
      name: string
      symbol?: string | null
      program?: string | null
      decimals: number
      mint: string
      burnt?: boolean | null
      owner: string
      group?: string | null
      imageUrl?: string | null
      explorerUrl: string
      metadata?: any | null
      attributes?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneNetworkAssetQueryVariables = Exact<{
  networkAssetId: Scalars['String']['input']
}>

export type AdminFindOneNetworkAssetQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'NetworkAsset'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    resolver: NetworkResolver
    type: NetworkTokenType
    account: string
    balance?: string | null
    name: string
    symbol?: string | null
    program?: string | null
    decimals: number
    mint: string
    burnt?: boolean | null
    owner: string
    group?: string | null
    imageUrl?: string | null
    explorerUrl: string
    metadata?: any | null
    attributes?: any | null
  } | null
}

export type AdminCleanupNetworkAssetsMutationVariables = Exact<{
  cluster: NetworkCluster
}>

export type AdminCleanupNetworkAssetsMutation = { __typename?: 'Mutation'; cleanup?: boolean | null }

export type AdminDeleteNetworkAssetMutationVariables = Exact<{
  networkAssetId: Scalars['String']['input']
}>

export type AdminDeleteNetworkAssetMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminSyncNetworkAssetsMutationVariables = Exact<{ [key: string]: never }>

export type AdminSyncNetworkAssetsMutation = { __typename?: 'Mutation'; synced?: boolean | null }

export type AdminVerifyNetworkAssetsMutationVariables = Exact<{ [key: string]: never }>

export type AdminVerifyNetworkAssetsMutation = { __typename?: 'Mutation'; synced?: boolean | null }

export type NetworkTokenDetailsFragment = {
  __typename?: 'NetworkToken'
  id: string
  createdAt?: Date | null
  updatedAt?: Date | null
  cluster: NetworkCluster
  type: NetworkTokenType
  account: string
  program: string
  name: string
  mintList?: Array<string> | null
  vault?: string | null
  symbol?: string | null
  description?: string | null
  imageUrl?: string | null
  metadataUrl?: string | null
  raw?: any | null
}

export type AdminFindManyNetworkTokenQueryVariables = Exact<{
  input: AdminFindManyNetworkTokenInput
}>

export type AdminFindManyNetworkTokenQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkTokenPaging'
    data: Array<{
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      mintList?: Array<string> | null
      vault?: string | null
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneNetworkTokenQueryVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminFindOneNetworkTokenQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    mintList?: Array<string> | null
    vault?: string | null
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminCreateNetworkTokenMutationVariables = Exact<{
  input: AdminCreateNetworkTokenInput
}>

export type AdminCreateNetworkTokenMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    mintList?: Array<string> | null
    vault?: string | null
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminUpdateNetworkTokenMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
  input: AdminUpdateNetworkTokenInput
}>

export type AdminUpdateNetworkTokenMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    mintList?: Array<string> | null
    vault?: string | null
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminUpdateNetworkTokenMetadataMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminUpdateNetworkTokenMetadataMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    mintList?: Array<string> | null
    vault?: string | null
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
}

export type AdminDeleteNetworkTokenMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminDeleteNetworkTokenMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyNetworkTokenQueryVariables = Exact<{
  input: UserFindManyNetworkTokenInput
}>

export type UserFindManyNetworkTokenQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkTokenPaging'
    data: Array<{
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      mintList?: Array<string> | null
      vault?: string | null
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type NetworkDetailsFragment = {
  __typename?: 'Network'
  createdAt?: Date | null
  id: string
  cluster: NetworkCluster
  type: NetworkType
  name: string
  decimals: number
  enableSync?: boolean | null
  endpoint: string
  explorerUrl: string
  symbol: string
  updatedAt?: Date | null
  voters?: Array<string> | null
}

export type AdminFindManyNetworkQueryVariables = Exact<{
  input: AdminFindManyNetworkInput
}>

export type AdminFindManyNetworkQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkPaging'
    data: Array<{
      __typename?: 'Network'
      createdAt?: Date | null
      id: string
      cluster: NetworkCluster
      type: NetworkType
      name: string
      decimals: number
      enableSync?: boolean | null
      endpoint: string
      explorerUrl: string
      symbol: string
      updatedAt?: Date | null
      voters?: Array<string> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminGetVoteIdentitiesQueryVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminGetVoteIdentitiesQuery = { __typename?: 'Query'; items: Array<string> }

export type AdminFindOneNetworkQueryVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminFindOneNetworkQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    cluster: NetworkCluster
    type: NetworkType
    name: string
    decimals: number
    enableSync?: boolean | null
    endpoint: string
    explorerUrl: string
    symbol: string
    updatedAt?: Date | null
    voters?: Array<string> | null
  } | null
}

export type AdminCreateNetworkMutationVariables = Exact<{
  input: AdminCreateNetworkInput
}>

export type AdminCreateNetworkMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    cluster: NetworkCluster
    type: NetworkType
    name: string
    decimals: number
    enableSync?: boolean | null
    endpoint: string
    explorerUrl: string
    symbol: string
    updatedAt?: Date | null
    voters?: Array<string> | null
  } | null
}

export type AdminUpdateNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
  input: AdminUpdateNetworkInput
}>

export type AdminUpdateNetworkMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    cluster: NetworkCluster
    type: NetworkType
    name: string
    decimals: number
    enableSync?: boolean | null
    endpoint: string
    explorerUrl: string
    symbol: string
    updatedAt?: Date | null
    voters?: Array<string> | null
  } | null
}

export type AdminDeleteNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminDeleteNetworkMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserGetTokenMetadataQueryVariables = Exact<{
  cluster: NetworkCluster
  account: Scalars['String']['input']
}>

export type UserGetTokenMetadataQuery = { __typename?: 'Query'; result?: any | null }

export type UserGetTokenAccountsQueryVariables = Exact<{
  cluster: NetworkCluster
  account: Scalars['String']['input']
}>

export type UserGetTokenAccountsQuery = { __typename?: 'Query'; result?: any | null }

export type UserGetEnabledNetworkClustersQueryVariables = Exact<{ [key: string]: never }>

export type UserGetEnabledNetworkClustersQuery = { __typename?: 'Query'; clusters: Array<NetworkCluster> }

export type AdminRefreshVoteIdentitiesMutationVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminRefreshVoteIdentitiesMutation = { __typename?: 'Mutation'; refreshed?: boolean | null }

export type RoleDetailsFragment = {
  __typename?: 'Role'
  createdAt?: Date | null
  id: string
  communityId: string
  name: string
  updatedAt?: Date | null
  viewUrl?: string | null
  conditions?: Array<{
    __typename?: 'RoleCondition'
    createdAt?: Date | null
    id: string
    type: NetworkTokenType
    amount?: string | null
    amountMax?: string | null
    filters?: any | null
    config?: any | null
    tokenId?: string | null
    roleId?: string | null
    updatedAt?: Date | null
    valid?: boolean | null
    token?: {
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      mintList?: Array<string> | null
      vault?: string | null
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    } | null
    asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
  }> | null
  permissions?: Array<{
    __typename?: 'RolePermission'
    createdAt?: Date | null
    id: string
    updatedAt?: Date | null
    botId?: string | null
    roleId?: string | null
    botRole?: {
      __typename?: 'BotRole'
      botId?: string | null
      createdAt?: Date | null
      id: string
      serverId?: string | null
      updatedAt?: Date | null
      serverRoleId?: string | null
      serverRole?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    } | null
  }> | null
  member?: {
    __typename?: 'CommunityMember'
    communityId: string
    createdAt?: Date | null
    id: string
    admin: boolean
    updatedAt?: Date | null
    userId: string
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type RoleConditionDetailsFragment = {
  __typename?: 'RoleCondition'
  createdAt?: Date | null
  id: string
  type: NetworkTokenType
  amount?: string | null
  amountMax?: string | null
  filters?: any | null
  config?: any | null
  tokenId?: string | null
  roleId?: string | null
  updatedAt?: Date | null
  valid?: boolean | null
  token?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt?: Date | null
    updatedAt?: Date | null
    cluster: NetworkCluster
    type: NetworkTokenType
    account: string
    program: string
    name: string
    mintList?: Array<string> | null
    vault?: string | null
    symbol?: string | null
    description?: string | null
    imageUrl?: string | null
    metadataUrl?: string | null
    raw?: any | null
  } | null
  asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
}

export type RolePermissionDetailsFragment = {
  __typename?: 'RolePermission'
  createdAt?: Date | null
  id: string
  updatedAt?: Date | null
  botId?: string | null
  roleId?: string | null
  botRole?: {
    __typename?: 'BotRole'
    botId?: string | null
    createdAt?: Date | null
    id: string
    serverId?: string | null
    updatedAt?: Date | null
    serverRoleId?: string | null
    serverRole?: {
      __typename?: 'DiscordRole'
      id: string
      name: string
      managed: boolean
      color: number
      position: number
    } | null
    server?: {
      __typename?: 'DiscordServer'
      id: string
      name: string
      icon?: string | null
      permissions?: Array<string> | null
    } | null
  } | null
}

export type AdminFindManyRoleQueryVariables = Exact<{
  input: AdminFindManyRoleInput
}>

export type AdminFindManyRoleQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'RolePaging'
    data: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneRoleQueryVariables = Exact<{
  roleId: Scalars['String']['input']
}>

export type AdminFindOneRoleQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
}

export type AdminCreateRoleMutationVariables = Exact<{
  input: AdminCreateRoleInput
}>

export type AdminCreateRoleMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
}

export type AdminUpdateRoleMutationVariables = Exact<{
  roleId: Scalars['String']['input']
  input: AdminUpdateRoleInput
}>

export type AdminUpdateRoleMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
}

export type AdminDeleteRoleMutationVariables = Exact<{
  roleId: Scalars['String']['input']
}>

export type AdminDeleteRoleMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyRoleQueryVariables = Exact<{
  input: UserFindManyRoleInput
}>

export type UserFindManyRoleQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'RolePaging'
    data: Array<{
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneRoleQueryVariables = Exact<{
  roleId: Scalars['String']['input']
}>

export type UserFindOneRoleQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
}

export type UserCreateRoleMutationVariables = Exact<{
  input: UserCreateRoleInput
}>

export type UserCreateRoleMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
}

export type UserCreateRoleConditionMutationVariables = Exact<{
  input: UserCreateRoleConditionInput
}>

export type UserCreateRoleConditionMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'RoleCondition'
    createdAt?: Date | null
    id: string
    type: NetworkTokenType
    amount?: string | null
    amountMax?: string | null
    filters?: any | null
    config?: any | null
    tokenId?: string | null
    roleId?: string | null
    updatedAt?: Date | null
    valid?: boolean | null
    token?: {
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      mintList?: Array<string> | null
      vault?: string | null
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    } | null
    asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
  } | null
}

export type UserCreateRolePermissionMutationVariables = Exact<{
  input: UserCreateRolePermissionInput
}>

export type UserCreateRolePermissionMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'RolePermission'
    createdAt?: Date | null
    id: string
    updatedAt?: Date | null
    botId?: string | null
    roleId?: string | null
    botRole?: {
      __typename?: 'BotRole'
      botId?: string | null
      createdAt?: Date | null
      id: string
      serverId?: string | null
      updatedAt?: Date | null
      serverRoleId?: string | null
      serverRole?: {
        __typename?: 'DiscordRole'
        id: string
        name: string
        managed: boolean
        color: number
        position: number
      } | null
      server?: {
        __typename?: 'DiscordServer'
        id: string
        name: string
        icon?: string | null
        permissions?: Array<string> | null
      } | null
    } | null
  } | null
}

export type UserUpdateRoleMutationVariables = Exact<{
  roleId: Scalars['String']['input']
  input: UserUpdateRoleInput
}>

export type UserUpdateRoleMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
}

export type UserUpdateRoleConditionMutationVariables = Exact<{
  roleConditionId: Scalars['String']['input']
  input: UserUpdateRoleConditionInput
}>

export type UserUpdateRoleConditionMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'RoleCondition'
    createdAt?: Date | null
    id: string
    type: NetworkTokenType
    amount?: string | null
    amountMax?: string | null
    filters?: any | null
    config?: any | null
    tokenId?: string | null
    roleId?: string | null
    updatedAt?: Date | null
    valid?: boolean | null
    token?: {
      __typename?: 'NetworkToken'
      id: string
      createdAt?: Date | null
      updatedAt?: Date | null
      cluster: NetworkCluster
      type: NetworkTokenType
      account: string
      program: string
      name: string
      mintList?: Array<string> | null
      vault?: string | null
      symbol?: string | null
      description?: string | null
      imageUrl?: string | null
      metadataUrl?: string | null
      raw?: any | null
    } | null
    asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
  } | null
}

export type UserDeleteRoleMutationVariables = Exact<{
  roleId: Scalars['String']['input']
}>

export type UserDeleteRoleMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserDeleteRoleConditionMutationVariables = Exact<{
  roleConditionId: Scalars['String']['input']
}>

export type UserDeleteRoleConditionMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserDeleteRolePermissionMutationVariables = Exact<{
  rolePermissionId: Scalars['String']['input']
}>

export type UserDeleteRolePermissionMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserSyncCommunityRolesMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserSyncCommunityRolesMutation = { __typename?: 'Mutation'; result?: any | null }

export type SnapshotDetailsFragment = {
  __typename?: 'Snapshot'
  createdAt?: Date | null
  id: string
  roleId: string
  name: string
  updatedAt?: Date | null
  role?: {
    __typename?: 'Role'
    createdAt?: Date | null
    id: string
    communityId: string
    name: string
    updatedAt?: Date | null
    viewUrl?: string | null
    conditions?: Array<{
      __typename?: 'RoleCondition'
      createdAt?: Date | null
      id: string
      type: NetworkTokenType
      amount?: string | null
      amountMax?: string | null
      filters?: any | null
      config?: any | null
      tokenId?: string | null
      roleId?: string | null
      updatedAt?: Date | null
      valid?: boolean | null
      token?: {
        __typename?: 'NetworkToken'
        id: string
        createdAt?: Date | null
        updatedAt?: Date | null
        cluster: NetworkCluster
        type: NetworkTokenType
        account: string
        program: string
        name: string
        mintList?: Array<string> | null
        vault?: string | null
        symbol?: string | null
        description?: string | null
        imageUrl?: string | null
        metadataUrl?: string | null
        raw?: any | null
      } | null
      asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
    }> | null
    permissions?: Array<{
      __typename?: 'RolePermission'
      createdAt?: Date | null
      id: string
      updatedAt?: Date | null
      botId?: string | null
      roleId?: string | null
      botRole?: {
        __typename?: 'BotRole'
        botId?: string | null
        createdAt?: Date | null
        id: string
        serverId?: string | null
        updatedAt?: Date | null
        serverRoleId?: string | null
        serverRole?: {
          __typename?: 'DiscordRole'
          id: string
          name: string
          managed: boolean
          color: number
          position: number
        } | null
        server?: {
          __typename?: 'DiscordServer'
          id: string
          name: string
          icon?: string | null
          permissions?: Array<string> | null
        } | null
      } | null
    }> | null
    member?: {
      __typename?: 'CommunityMember'
      communityId: string
      createdAt?: Date | null
      id: string
      admin: boolean
      updatedAt?: Date | null
      userId: string
      user?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        private?: boolean | null
        lastLogin?: Date | null
        id: string
        name?: string | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
  } | null
}

export type SnapshotItemDetailsFragment = {
  __typename?: 'SnapshotItem'
  items?: number | null
  balance?: string | null
  owner?: { __typename?: 'SnapshotOwner'; username?: string | null; discordId?: string | null } | null
  assets?: Array<{
    __typename?: 'SnapshotAsset'
    mint?: string | null
    owner?: string | null
    account?: string | null
    balance?: string | null
  }> | null
}

export type UserFindManySnapshotQueryVariables = Exact<{
  input: UserFindManySnapshotInput
}>

export type UserFindManySnapshotQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'SnapshotPaging'
    data: Array<{
      __typename?: 'Snapshot'
      createdAt?: Date | null
      id: string
      roleId: string
      name: string
      updatedAt?: Date | null
      role?: {
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneSnapshotQueryVariables = Exact<{
  snapshotId: Scalars['String']['input']
}>

export type UserFindOneSnapshotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Snapshot'
    createdAt?: Date | null
    id: string
    roleId: string
    name: string
    updatedAt?: Date | null
    data?: Array<{
      __typename?: 'SnapshotItem'
      items?: number | null
      balance?: string | null
      owner?: { __typename?: 'SnapshotOwner'; username?: string | null; discordId?: string | null } | null
      assets?: Array<{
        __typename?: 'SnapshotAsset'
        mint?: string | null
        owner?: string | null
        account?: string | null
        balance?: string | null
      }> | null
    }> | null
    role?: {
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type UserCreateSnapshotMutationVariables = Exact<{
  input: UserCreateSnapshotInput
}>

export type UserCreateSnapshotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Snapshot'
    createdAt?: Date | null
    id: string
    roleId: string
    name: string
    updatedAt?: Date | null
    role?: {
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type UserDeleteSnapshotMutationVariables = Exact<{
  snapshotId: Scalars['String']['input']
}>

export type UserDeleteSnapshotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManySnapshotQueryVariables = Exact<{
  input: AdminFindManySnapshotInput
}>

export type AdminFindManySnapshotQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'SnapshotPaging'
    data: Array<{
      __typename?: 'Snapshot'
      createdAt?: Date | null
      id: string
      roleId: string
      name: string
      updatedAt?: Date | null
      role?: {
        __typename?: 'Role'
        createdAt?: Date | null
        id: string
        communityId: string
        name: string
        updatedAt?: Date | null
        viewUrl?: string | null
        conditions?: Array<{
          __typename?: 'RoleCondition'
          createdAt?: Date | null
          id: string
          type: NetworkTokenType
          amount?: string | null
          amountMax?: string | null
          filters?: any | null
          config?: any | null
          tokenId?: string | null
          roleId?: string | null
          updatedAt?: Date | null
          valid?: boolean | null
          token?: {
            __typename?: 'NetworkToken'
            id: string
            createdAt?: Date | null
            updatedAt?: Date | null
            cluster: NetworkCluster
            type: NetworkTokenType
            account: string
            program: string
            name: string
            mintList?: Array<string> | null
            vault?: string | null
            symbol?: string | null
            description?: string | null
            imageUrl?: string | null
            metadataUrl?: string | null
            raw?: any | null
          } | null
          asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
        }> | null
        permissions?: Array<{
          __typename?: 'RolePermission'
          createdAt?: Date | null
          id: string
          updatedAt?: Date | null
          botId?: string | null
          roleId?: string | null
          botRole?: {
            __typename?: 'BotRole'
            botId?: string | null
            createdAt?: Date | null
            id: string
            serverId?: string | null
            updatedAt?: Date | null
            serverRoleId?: string | null
            serverRole?: {
              __typename?: 'DiscordRole'
              id: string
              name: string
              managed: boolean
              color: number
              position: number
            } | null
            server?: {
              __typename?: 'DiscordServer'
              id: string
              name: string
              icon?: string | null
              permissions?: Array<string> | null
            } | null
          } | null
        }> | null
        member?: {
          __typename?: 'CommunityMember'
          communityId: string
          createdAt?: Date | null
          id: string
          admin: boolean
          updatedAt?: Date | null
          userId: string
          user?: {
            __typename?: 'User'
            avatarUrl?: string | null
            createdAt?: Date | null
            developer?: boolean | null
            private?: boolean | null
            lastLogin?: Date | null
            id: string
            name?: string | null
            profileUrl: string
            role?: UserRole | null
            status?: UserStatus | null
            updatedAt?: Date | null
            username?: string | null
          } | null
        } | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneSnapshotQueryVariables = Exact<{
  snapshotId: Scalars['String']['input']
}>

export type AdminFindOneSnapshotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Snapshot'
    createdAt?: Date | null
    id: string
    roleId: string
    name: string
    updatedAt?: Date | null
    data?: Array<{
      __typename?: 'SnapshotItem'
      items?: number | null
      balance?: string | null
      owner?: { __typename?: 'SnapshotOwner'; username?: string | null; discordId?: string | null } | null
      assets?: Array<{
        __typename?: 'SnapshotAsset'
        mint?: string | null
        owner?: string | null
        account?: string | null
        balance?: string | null
      }> | null
    }> | null
    role?: {
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type AdminCreateSnapshotMutationVariables = Exact<{
  input: AdminCreateSnapshotInput
}>

export type AdminCreateSnapshotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Snapshot'
    createdAt?: Date | null
    id: string
    roleId: string
    name: string
    updatedAt?: Date | null
    role?: {
      __typename?: 'Role'
      createdAt?: Date | null
      id: string
      communityId: string
      name: string
      updatedAt?: Date | null
      viewUrl?: string | null
      conditions?: Array<{
        __typename?: 'RoleCondition'
        createdAt?: Date | null
        id: string
        type: NetworkTokenType
        amount?: string | null
        amountMax?: string | null
        filters?: any | null
        config?: any | null
        tokenId?: string | null
        roleId?: string | null
        updatedAt?: Date | null
        valid?: boolean | null
        token?: {
          __typename?: 'NetworkToken'
          id: string
          createdAt?: Date | null
          updatedAt?: Date | null
          cluster: NetworkCluster
          type: NetworkTokenType
          account: string
          program: string
          name: string
          mintList?: Array<string> | null
          vault?: string | null
          symbol?: string | null
          description?: string | null
          imageUrl?: string | null
          metadataUrl?: string | null
          raw?: any | null
        } | null
        asset?: { __typename?: 'SolanaNetworkAsset'; owner: string; amount: string; accounts: Array<string> } | null
      }> | null
      permissions?: Array<{
        __typename?: 'RolePermission'
        createdAt?: Date | null
        id: string
        updatedAt?: Date | null
        botId?: string | null
        roleId?: string | null
        botRole?: {
          __typename?: 'BotRole'
          botId?: string | null
          createdAt?: Date | null
          id: string
          serverId?: string | null
          updatedAt?: Date | null
          serverRoleId?: string | null
          serverRole?: {
            __typename?: 'DiscordRole'
            id: string
            name: string
            managed: boolean
            color: number
            position: number
          } | null
          server?: {
            __typename?: 'DiscordServer'
            id: string
            name: string
            icon?: string | null
            permissions?: Array<string> | null
          } | null
        } | null
      }> | null
      member?: {
        __typename?: 'CommunityMember'
        communityId: string
        createdAt?: Date | null
        id: string
        admin: boolean
        updatedAt?: Date | null
        userId: string
        user?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          private?: boolean | null
          lastLogin?: Date | null
          id: string
          name?: string | null
          profileUrl: string
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type AdminDeleteSnapshotMutationVariables = Exact<{
  snapshotId: Scalars['String']['input']
}>

export type AdminDeleteSnapshotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserSummaryFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  developer?: boolean | null
  private?: boolean | null
  id: string
  name?: string | null
  profileUrl: string
  role?: UserRole | null
  username?: string | null
}

export type UserDetailsFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  private?: boolean | null
  lastLogin?: Date | null
  id: string
  name?: string | null
  profileUrl: string
  role?: UserRole | null
  status?: UserStatus | null
  updatedAt?: Date | null
  username?: string | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyUserQueryVariables = Exact<{
  input: AdminFindManyUserInput
}>

export type AdminFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
      identities?: Array<{
        __typename?: 'Identity'
        avatarUrl?: string | null
        createdAt?: Date | null
        syncStarted?: Date | null
        syncEnded?: Date | null
        expired?: boolean | null
        id: string
        name: string
        ownerId?: string | null
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt?: Date | null
        url?: string | null
        verified?: boolean | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneUserQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyUserQueryVariables = Exact<{
  input: UserFindManyUserInput
}>

export type UserFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      private?: boolean | null
      lastLogin?: Date | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneUserQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type UserFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      avatarUrl?: string | null
      createdAt?: Date | null
      syncStarted?: Date | null
      syncEnded?: Date | null
      expired?: boolean | null
      id: string
      name: string
      ownerId?: string | null
      profile?: any | null
      provider: IdentityProvider
      providerId: string
      updatedAt?: Date | null
      url?: string | null
      verified?: boolean | null
    }> | null
  } | null
}

export type UserFindOneUserByIdQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type UserFindOneUserByIdQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    private?: boolean | null
    lastLogin?: Date | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export const BotServerDetailsFragmentDoc = gql`
  fragment BotServerDetails on BotServer {
    id
    createdAt
    updatedAt
    botId
    serverId
    adminRoles
    botChannel
    dryRun
    enableSync
    verbose
  }
`
export const DiscordChannelDetailsFragmentDoc = gql`
  fragment DiscordChannelDetails on DiscordChannel {
    id
    name
    parentId
    type
  }
`
export const CommunityDetailsFragmentDoc = gql`
  fragment CommunityDetails on Community {
    createdAt
    id
    name
    enableSync
    featured
    avatarUrl
    description
    websiteUrl
    discordUrl
    githubUrl
    twitterUrl
    telegramUrl
    updatedAt
    viewUrl
  }
`
export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    appLogoUrlDark
    appLogoUrlLight
    appThemeBackground
    appThemeColor
    authLinkProviders
    authLoginProviders
    features
    resolvers
  }
`
export const PagingMetaDetailsFragmentDoc = gql`
  fragment PagingMetaDetails on PagingMeta {
    currentPage
    isFirstPage
    isLastPage
    nextPage
    pageCount
    previousPage
    totalCount
  }
`
export const IdentitySummaryFragmentDoc = gql`
  fragment IdentitySummary on Identity {
    avatarUrl
    id
    name
    provider
    providerId
    verified
  }
`
export const IdentityChallengeDetailsFragmentDoc = gql`
  fragment IdentityChallengeDetails on IdentityChallenge {
    id
    createdAt
    updatedAt
    provider
    providerId
    challenge
    signature
    blockhash
    userAgent
    verified
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    avatarUrl
    createdAt
    developer
    private
    lastLogin
    id
    name
    profileUrl
    role
    status
    updatedAt
    username
  }
`
export const IdentityGrantDetailsFragmentDoc = gql`
  fragment IdentityGrantDetails on IdentityGrant {
    createdAt
    id
    granteeId
    grantee {
      ...UserDetails
    }
    provider
    providerId
    updatedAt
  }
  ${UserDetailsFragmentDoc}
`
export const BotDetailsFragmentDoc = gql`
  fragment BotDetails on Bot {
    avatarUrl
    communityId
    createdAt
    developersUrl
    id
    inviteUrl
    name
    platform
    redirectUrl
    redirectUrlSet
    started
    status
    updatedAt
    verificationUrl
    verificationUrlSet
  }
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    avatarUrl
    createdAt
    syncStarted
    syncEnded
    expired
    id
    name
    ownerId
    profile
    provider
    providerId
    updatedAt
    url
    verified
  }
`
export const NetworkAssetDetailsFragmentDoc = gql`
  fragment NetworkAssetDetails on NetworkAsset {
    id
    createdAt
    updatedAt
    cluster
    resolver
    type
    account
    balance
    name
    symbol
    program
    decimals
    mint
    burnt
    owner
    group
    imageUrl
    explorerUrl
    metadata
    attributes
  }
`
export const NetworkTokenDetailsFragmentDoc = gql`
  fragment NetworkTokenDetails on NetworkToken {
    id
    createdAt
    updatedAt
    cluster
    type
    account
    program
    name
    mintList
    vault
    symbol
    description
    imageUrl
    metadataUrl
    raw
  }
`
export const RoleConditionDetailsFragmentDoc = gql`
  fragment RoleConditionDetails on RoleCondition {
    createdAt
    id
    type
    amount
    amountMax
    filters
    config
    token {
      ...NetworkTokenDetails
    }
    tokenId
    roleId
    asset {
      owner
      amount
      accounts
    }
    updatedAt
    valid
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const DiscordRoleDetailsFragmentDoc = gql`
  fragment DiscordRoleDetails on DiscordRole {
    id
    name
    managed
    color
    position
  }
`
export const DiscordServerDetailsFragmentDoc = gql`
  fragment DiscordServerDetails on DiscordServer {
    id
    name
    icon
    permissions
  }
`
export const BotRoleDetailsFragmentDoc = gql`
  fragment BotRoleDetails on BotRole {
    botId
    createdAt
    id
    serverId
    updatedAt
    serverRoleId
    serverRole {
      ...DiscordRoleDetails
    }
    server {
      ...DiscordServerDetails
    }
  }
  ${DiscordRoleDetailsFragmentDoc}
  ${DiscordServerDetailsFragmentDoc}
`
export const RolePermissionDetailsFragmentDoc = gql`
  fragment RolePermissionDetails on RolePermission {
    createdAt
    id
    updatedAt
    botId
    roleId
    botRole {
      ...BotRoleDetails
    }
  }
  ${BotRoleDetailsFragmentDoc}
`
export const CommunityMemberDetailsFragmentDoc = gql`
  fragment CommunityMemberDetails on CommunityMember {
    communityId
    createdAt
    id
    admin
    updatedAt
    user {
      ...UserDetails
    }
    userId
  }
  ${UserDetailsFragmentDoc}
`
export const RoleDetailsFragmentDoc = gql`
  fragment RoleDetails on Role {
    createdAt
    id
    communityId
    name
    conditions {
      ...RoleConditionDetails
    }
    permissions {
      ...RolePermissionDetails
    }
    member {
      ...CommunityMemberDetails
    }
    updatedAt
    viewUrl
  }
  ${RoleConditionDetailsFragmentDoc}
  ${RolePermissionDetailsFragmentDoc}
  ${CommunityMemberDetailsFragmentDoc}
`
export const LogDetailsFragmentDoc = gql`
  fragment LogDetails on Log {
    createdAt
    id
    message
    level
    relatedId
    relatedType
    communityId
    identityProvider
    identityProviderId
    networkAssetId
    botId
    userId
    roleId
    updatedAt
    data
    bot {
      ...BotDetails
    }
    identity {
      ...IdentityDetails
    }
    networkAsset {
      ...NetworkAssetDetails
    }
    role {
      ...RoleDetails
    }
    user {
      ...UserDetails
    }
  }
  ${BotDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${NetworkAssetDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const NetworkDetailsFragmentDoc = gql`
  fragment NetworkDetails on Network {
    createdAt
    id
    cluster
    type
    name
    decimals
    enableSync
    endpoint
    explorerUrl
    symbol
    updatedAt
    voters
  }
`
export const SnapshotDetailsFragmentDoc = gql`
  fragment SnapshotDetails on Snapshot {
    createdAt
    id
    role {
      ...RoleDetails
    }
    roleId
    name
    updatedAt
  }
  ${RoleDetailsFragmentDoc}
`
export const SnapshotItemDetailsFragmentDoc = gql`
  fragment SnapshotItemDetails on SnapshotItem {
    owner {
      username
      discordId
    }
    items
    balance
    assets {
      mint
      owner
      account
      balance
    }
  }
`
export const UserSummaryFragmentDoc = gql`
  fragment UserSummary on User {
    avatarUrl
    developer
    private
    id
    name
    profileUrl
    role
    username
  }
`
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
      identities {
        ...IdentitySummary
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentitySummaryFragmentDoc}
`
export const AdminCreateBackupDocument = gql`
  mutation adminCreateBackup {
    created: adminCreateBackup
  }
`
export const AdminDeleteBackupDocument = gql`
  mutation adminDeleteBackup($name: String!) {
    deleted: adminDeleteBackup(name: $name)
  }
`
export const AdminFetchBackupDocument = gql`
  mutation adminFetchBackup($url: String!) {
    fetched: adminFetchBackup(url: $url)
  }
`
export const AdminGetBackupDocument = gql`
  query adminGetBackup($name: String!) {
    item: adminGetBackup(name: $name)
  }
`
export const AdminGetBackupsDocument = gql`
  query adminGetBackups {
    items: adminGetBackups
  }
`
export const AdminRestoreBackupDocument = gql`
  mutation adminRestoreBackup($name: String!) {
    restored: adminRestoreBackup(name: $name)
  }
`
export const AdminFindManyBotDocument = gql`
  query adminFindManyBot($input: AdminFindManyBotInput!) {
    paging: adminFindManyBot(input: $input) {
      data {
        ...BotDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${BotDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneBotDocument = gql`
  query adminFindOneBot($botId: String!) {
    item: adminFindOneBot(botId: $botId) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminCreateBotDocument = gql`
  mutation adminCreateBot($input: AdminCreateBotInput!) {
    created: adminCreateBot(input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminUpdateBotDocument = gql`
  mutation adminUpdateBot($botId: String!, $input: AdminUpdateBotInput!) {
    updated: adminUpdateBot(botId: $botId, input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminDeleteBotDocument = gql`
  mutation adminDeleteBot($botId: String!) {
    deleted: adminDeleteBot(botId: $botId)
  }
`
export const UserFindOneBotDocument = gql`
  query userFindOneBot($communityId: String!) {
    item: userFindOneBot(communityId: $communityId) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const UserFindManyBotRolesDocument = gql`
  query userFindManyBotRoles($botId: String!, $serverId: String!) {
    items: userFindManyBotRoles(botId: $botId, serverId: $serverId) {
      ...BotRoleDetails
      permissions {
        ...RoleDetails
      }
    }
  }
  ${BotRoleDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const UserFindOneBotServerDocument = gql`
  query userFindOneBotServer($botId: String!, $serverId: String!) {
    item: userFindOneBotServer(botId: $botId, serverId: $serverId) {
      ...BotServerDetails
    }
  }
  ${BotServerDetailsFragmentDoc}
`
export const UserCreateBotDocument = gql`
  mutation userCreateBot($input: UserCreateBotInput!) {
    created: userCreateBot(input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const UserUpdateBotDocument = gql`
  mutation userUpdateBot($botId: String!, $input: UserUpdateBotInput!) {
    updated: userUpdateBot(botId: $botId, input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const UserTestBotServerConfigDocument = gql`
  mutation userTestBotServerConfig($botId: String!, $serverId: String!) {
    tested: userTestBotServerConfig(botId: $botId, serverId: $serverId) {
      ...BotServerDetails
    }
  }
  ${BotServerDetailsFragmentDoc}
`
export const UserUpdateBotServerDocument = gql`
  mutation userUpdateBotServer($botId: String!, $serverId: String!, $input: UserUpdateBotServerInput!) {
    updated: userUpdateBotServer(botId: $botId, serverId: $serverId, input: $input) {
      ...BotServerDetails
    }
  }
  ${BotServerDetailsFragmentDoc}
`
export const UserDeleteBotDocument = gql`
  mutation userDeleteBot($botId: String!) {
    deleted: userDeleteBot(botId: $botId)
  }
`
export const UserStartBotDocument = gql`
  mutation userStartBot($botId: String!) {
    started: userStartBot(botId: $botId)
  }
`
export const UserStopBotDocument = gql`
  mutation userStopBot($botId: String!) {
    stopped: userStopBot(botId: $botId)
  }
`
export const UserLeaveBotServerDocument = gql`
  mutation userLeaveBotServer($botId: String!, $serverId: String!) {
    left: userLeaveBotServer(botId: $botId, serverId: $serverId)
  }
`
export const UserSyncBotServerDocument = gql`
  mutation userSyncBotServer($botId: String!, $serverId: String!) {
    synced: userSyncBotServer(botId: $botId, serverId: $serverId)
  }
`
export const UserGetBotChannelsDocument = gql`
  query userGetBotChannels($botId: String!, $serverId: String!) {
    items: userGetBotChannels(botId: $botId, serverId: $serverId) {
      ...DiscordChannelDetails
    }
  }
  ${DiscordChannelDetailsFragmentDoc}
`
export const UserGetBotRolesDocument = gql`
  query userGetBotRoles($botId: String!, $serverId: String!) {
    items: userGetBotRoles(botId: $botId, serverId: $serverId) {
      ...DiscordRoleDetails
    }
  }
  ${DiscordRoleDetailsFragmentDoc}
`
export const UserGetBotServersDocument = gql`
  query userGetBotServers($botId: String!) {
    items: userGetBotServers(botId: $botId) {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const UserGetBotServerDocument = gql`
  query userGetBotServer($botId: String!, $serverId: String!) {
    item: userGetBotServer(botId: $botId, serverId: $serverId) {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const AdminFindManyCommunityMemberDocument = gql`
  query adminFindManyCommunityMember($input: AdminFindManyCommunityMemberInput!) {
    paging: adminFindManyCommunityMember(input: $input) {
      data {
        ...CommunityMemberDetails
        roles {
          ...RoleDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneCommunityMemberDocument = gql`
  query adminFindOneCommunityMember($communityMemberId: String!) {
    item: adminFindOneCommunityMember(communityMemberId: $communityMemberId) {
      ...CommunityMemberDetails
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const AdminAddCommunityMemberDocument = gql`
  mutation adminAddCommunityMember($communityId: String!, $input: AdminAddCommunityMemberInput!) {
    created: adminAddCommunityMember(communityId: $communityId, input: $input) {
      ...CommunityMemberDetails
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const AdminUpdateCommunityMemberDocument = gql`
  mutation adminUpdateCommunityMember($communityMemberId: String!, $input: AdminUpdateCommunityMemberInput!) {
    updated: adminUpdateCommunityMember(communityMemberId: $communityMemberId, input: $input) {
      ...CommunityMemberDetails
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const AdminRemoveCommunityMemberDocument = gql`
  mutation adminRemoveCommunityMember($communityMemberId: String!) {
    deleted: adminRemoveCommunityMember(communityMemberId: $communityMemberId)
  }
`
export const UserGetCommunityMemberDocument = gql`
  query userGetCommunityMember($communityId: String!) {
    member: userGetCommunityMember(communityId: $communityId) {
      ...CommunityMemberDetails
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const UserFindManyCommunityMemberDocument = gql`
  query userFindManyCommunityMember($input: UserFindManyCommunityMemberInput!) {
    paging: userFindManyCommunityMember(input: $input) {
      data {
        ...CommunityMemberDetails
        roles {
          ...RoleDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneCommunityMemberDocument = gql`
  query userFindOneCommunityMember($communityMemberId: String!) {
    item: userFindOneCommunityMember(communityMemberId: $communityMemberId) {
      ...CommunityMemberDetails
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const UserAddCommunityMemberDocument = gql`
  mutation userAddCommunityMember($communityId: String!, $input: UserAddCommunityMemberInput!) {
    created: userAddCommunityMember(communityId: $communityId, input: $input) {
      ...CommunityMemberDetails
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const UserUpdateCommunityMemberDocument = gql`
  mutation userUpdateCommunityMember($communityMemberId: String!, $input: UserUpdateCommunityMemberInput!) {
    updated: userUpdateCommunityMember(communityMemberId: $communityMemberId, input: $input) {
      ...CommunityMemberDetails
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const UserRemoveCommunityMemberDocument = gql`
  mutation userRemoveCommunityMember($communityMemberId: String!) {
    deleted: userRemoveCommunityMember(communityMemberId: $communityMemberId)
  }
`
export const AdminFindManyCommunityDocument = gql`
  query adminFindManyCommunity($input: AdminFindManyCommunityInput!) {
    paging: adminFindManyCommunity(input: $input) {
      data {
        ...CommunityDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneCommunityDocument = gql`
  query adminFindOneCommunity($communityId: String!) {
    item: adminFindOneCommunity(communityId: $communityId) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminCreateCommunityDocument = gql`
  mutation adminCreateCommunity($input: AdminCreateCommunityInput!) {
    created: adminCreateCommunity(input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminUpdateCommunityDocument = gql`
  mutation adminUpdateCommunity($communityId: String!, $input: AdminUpdateCommunityInput!) {
    updated: adminUpdateCommunity(communityId: $communityId, input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminDeleteCommunityDocument = gql`
  mutation adminDeleteCommunity($communityId: String!) {
    deleted: adminDeleteCommunity(communityId: $communityId)
  }
`
export const AnonGetCommunitiesDocument = gql`
  query anonGetCommunities {
    items: anonGetCommunities {
      ...CommunityDetails
      roles {
        ...RoleDetails
        member {
          ...CommunityMemberDetails
        }
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
  ${CommunityMemberDetailsFragmentDoc}
`
export const UserGetCommunitiesDocument = gql`
  query userGetCommunities($username: String!) {
    items: userGetCommunities(username: $username) {
      ...CommunityDetails
      membership {
        ...CommunityMemberDetails
        roles {
          ...RoleDetails
        }
      }
      roles {
        ...RoleDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${CommunityMemberDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
`
export const UserFindManyCommunityDocument = gql`
  query userFindManyCommunity($input: UserFindManyCommunityInput!) {
    paging: userFindManyCommunity(input: $input) {
      data {
        ...CommunityDetails
        roles {
          ...RoleDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${RoleDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneCommunityDocument = gql`
  query userFindOneCommunity($communityId: String!) {
    item: userFindOneCommunity(communityId: $communityId) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const UserCreateCommunityDocument = gql`
  mutation userCreateCommunity($input: UserCreateCommunityInput!) {
    created: userCreateCommunity(input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const UserUpdateCommunityDocument = gql`
  mutation userUpdateCommunity($communityId: String!, $input: UserUpdateCommunityInput!) {
    updated: userUpdateCommunity(communityId: $communityId, input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const UserDeleteCommunityDocument = gql`
  mutation userDeleteCommunity($communityId: String!) {
    deleted: userDeleteCommunity(communityId: $communityId)
  }
`
export const UptimeDocument = gql`
  query uptime {
    uptime
  }
`
export const AppConfigDocument = gql`
  query appConfig {
    config: appConfig {
      ...AppConfigDetails
    }
  }
  ${AppConfigDetailsFragmentDoc}
`
export const AdminTableStatsDocument = gql`
  query adminTableStats {
    items: adminTableStats {
      name
      records {
        name
        value
      }
    }
  }
`
export const AdminFindManyIdentityDocument = gql`
  query adminFindManyIdentity($input: AdminFindManyIdentityInput!) {
    items: adminFindManyIdentity(input: $input) {
      ...IdentityDetails
      challenges {
        ...IdentityChallengeDetails
      }
      grants {
        ...IdentityGrantDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityChallengeDetailsFragmentDoc}
  ${IdentityGrantDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminFindUserByIdentityDocument = gql`
  query adminFindUserByIdentity($provider: IdentityProvider!, $providerId: String!) {
    item: adminFindUserByIdentity(provider: $provider, providerId: $providerId) {
      ...UserSummary
      identities {
        ...IdentitySummary
      }
    }
  }
  ${UserSummaryFragmentDoc}
  ${IdentitySummaryFragmentDoc}
`
export const AdminCreateIdentityDocument = gql`
  mutation adminCreateIdentity($input: AdminCreateIdentityInput!) {
    created: adminCreateIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminDeleteIdentityDocument = gql`
  mutation adminDeleteIdentity($identityId: String!) {
    deleted: adminDeleteIdentity(identityId: $identityId)
  }
`
export const AdminSetIdentityVerifiedDocument = gql`
  mutation adminSetIdentityVerified($identityId: String!, $verified: Boolean!) {
    verified: adminSetIdentityVerified(identityId: $identityId, verified: $verified)
  }
`
export const AdminSyncIdentityDocument = gql`
  mutation adminSyncIdentity($identityId: String!) {
    deleted: adminSyncIdentity(identityId: $identityId)
  }
`
export const UserFindManyIdentityDocument = gql`
  query userFindManyIdentity($input: UserFindManyIdentityInput!) {
    items: userFindManyIdentity(input: $input) {
      ...IdentityDetails
      grants {
        ...IdentityGrantDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityGrantDetailsFragmentDoc}
`
export const UserFindOneIdentityDocument = gql`
  query userFindOneIdentity($provider: IdentityProvider!, $providerId: String!) {
    item: userFindOneIdentity(provider: $provider, providerId: $providerId) {
      ...IdentityDetails
      grants {
        ...IdentityGrantDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityGrantDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const UserDeleteIdentityDocument = gql`
  mutation userDeleteIdentity($identityId: String!) {
    deleted: userDeleteIdentity(identityId: $identityId)
  }
`
export const UserUpdateIdentityDocument = gql`
  mutation userUpdateIdentity($identityId: String!, $input: UserUpdateIdentityInput!) {
    update: userUpdateIdentity(identityId: $identityId, input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const UserRefreshIdentityDocument = gql`
  mutation userRefreshIdentity($identityId: String!) {
    deleted: userRefreshIdentity(identityId: $identityId)
  }
`
export const UserRequestIdentityChallengeDocument = gql`
  query userRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: userRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserRequestIdentityChallengeCliDocument = gql`
  query userRequestIdentityChallengeCli($input: RequestIdentityChallengeInput!) {
    challenge: userRequestIdentityChallengeCli(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserVerifyIdentityChallengeDocument = gql`
  mutation userVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: userVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserVerifyIdentityChallengeCliDocument = gql`
  mutation userVerifyIdentityChallengeCli($input: VerifyIdentityChallengeInput!) {
    verified: userVerifyIdentityChallengeCli(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserLinkIdentityDocument = gql`
  mutation userLinkIdentity($input: LinkIdentityInput!) {
    linked: userLinkIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AnonRequestIdentityChallengeDocument = gql`
  query anonRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: anonRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const AnonVerifyIdentityChallengeDocument = gql`
  mutation anonVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: anonVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserAddIdentityGrantDocument = gql`
  mutation userAddIdentityGrant($input: UserAddIdentityGrantInput!) {
    added: userAddIdentityGrant(input: $input)
  }
`
export const UserRemoveIdentityGrantDocument = gql`
  mutation userRemoveIdentityGrant($input: UserRemoveIdentityGrantInput!) {
    removed: userRemoveIdentityGrant(input: $input)
  }
`
export const UserFindManyLogDocument = gql`
  query userFindManyLog($input: UserFindManyLogInput!) {
    paging: userFindManyLog(input: $input) {
      data {
        ...LogDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${LogDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneLogDocument = gql`
  query userFindOneLog($logId: String!) {
    item: userFindOneLog(logId: $logId) {
      ...LogDetails
    }
  }
  ${LogDetailsFragmentDoc}
`
export const AdminFindManyLogDocument = gql`
  query adminFindManyLog($input: AdminFindManyLogInput!) {
    paging: adminFindManyLog(input: $input) {
      data {
        ...LogDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${LogDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneLogDocument = gql`
  query adminFindOneLog($logId: String!) {
    item: adminFindOneLog(logId: $logId) {
      ...LogDetails
    }
  }
  ${LogDetailsFragmentDoc}
`
export const AdminDeleteLogDocument = gql`
  mutation adminDeleteLog($logId: String!) {
    deleted: adminDeleteLog(logId: $logId)
  }
`
export const AdminPurgeLogsDocument = gql`
  mutation adminPurgeLogs {
    purged: adminPurgeLogs
  }
`
export const UserFindManyNetworkAssetDocument = gql`
  query userFindManyNetworkAsset($input: UserFindManyNetworkAssetInput!) {
    paging: userFindManyNetworkAsset(input: $input) {
      data {
        ...NetworkAssetDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkAssetDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneNetworkAssetDocument = gql`
  query userFindOneNetworkAsset($account: String!, $cluster: NetworkCluster!) {
    item: userFindOneNetworkAsset(account: $account, cluster: $cluster) {
      ...NetworkAssetDetails
    }
  }
  ${NetworkAssetDetailsFragmentDoc}
`
export const AdminFindManyNetworkAssetDocument = gql`
  query adminFindManyNetworkAsset($input: AdminFindManyNetworkAssetInput!) {
    paging: adminFindManyNetworkAsset(input: $input) {
      data {
        ...NetworkAssetDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkAssetDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneNetworkAssetDocument = gql`
  query adminFindOneNetworkAsset($networkAssetId: String!) {
    item: adminFindOneNetworkAsset(networkAssetId: $networkAssetId) {
      ...NetworkAssetDetails
    }
  }
  ${NetworkAssetDetailsFragmentDoc}
`
export const AdminCleanupNetworkAssetsDocument = gql`
  mutation adminCleanupNetworkAssets($cluster: NetworkCluster!) {
    cleanup: adminCleanupNetworkAssets(cluster: $cluster)
  }
`
export const AdminDeleteNetworkAssetDocument = gql`
  mutation adminDeleteNetworkAsset($networkAssetId: String!) {
    deleted: adminDeleteNetworkAsset(networkAssetId: $networkAssetId)
  }
`
export const AdminSyncNetworkAssetsDocument = gql`
  mutation adminSyncNetworkAssets {
    synced: adminSyncNetworkAssets
  }
`
export const AdminVerifyNetworkAssetsDocument = gql`
  mutation adminVerifyNetworkAssets {
    synced: adminVerifyNetworkAssets
  }
`
export const AdminFindManyNetworkTokenDocument = gql`
  query adminFindManyNetworkToken($input: AdminFindManyNetworkTokenInput!) {
    paging: adminFindManyNetworkToken(input: $input) {
      data {
        ...NetworkTokenDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneNetworkTokenDocument = gql`
  query adminFindOneNetworkToken($networkTokenId: String!) {
    item: adminFindOneNetworkToken(networkTokenId: $networkTokenId) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminCreateNetworkTokenDocument = gql`
  mutation adminCreateNetworkToken($input: AdminCreateNetworkTokenInput!) {
    created: adminCreateNetworkToken(input: $input) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminUpdateNetworkTokenDocument = gql`
  mutation adminUpdateNetworkToken($networkTokenId: String!, $input: AdminUpdateNetworkTokenInput!) {
    updated: adminUpdateNetworkToken(networkTokenId: $networkTokenId, input: $input) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminUpdateNetworkTokenMetadataDocument = gql`
  mutation adminUpdateNetworkTokenMetadata($networkTokenId: String!) {
    updated: adminUpdateNetworkTokenMetadata(networkTokenId: $networkTokenId) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminDeleteNetworkTokenDocument = gql`
  mutation adminDeleteNetworkToken($networkTokenId: String!) {
    deleted: adminDeleteNetworkToken(networkTokenId: $networkTokenId)
  }
`
export const UserFindManyNetworkTokenDocument = gql`
  query userFindManyNetworkToken($input: UserFindManyNetworkTokenInput!) {
    paging: userFindManyNetworkToken(input: $input) {
      data {
        ...NetworkTokenDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindManyNetworkDocument = gql`
  query adminFindManyNetwork($input: AdminFindManyNetworkInput!) {
    paging: adminFindManyNetwork(input: $input) {
      data {
        ...NetworkDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminGetVoteIdentitiesDocument = gql`
  query adminGetVoteIdentities($networkId: String!) {
    items: adminGetVoteIdentities(networkId: $networkId)
  }
`
export const AdminFindOneNetworkDocument = gql`
  query adminFindOneNetwork($networkId: String!) {
    item: adminFindOneNetwork(networkId: $networkId) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminCreateNetworkDocument = gql`
  mutation adminCreateNetwork($input: AdminCreateNetworkInput!) {
    created: adminCreateNetwork(input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminUpdateNetworkDocument = gql`
  mutation adminUpdateNetwork($networkId: String!, $input: AdminUpdateNetworkInput!) {
    updated: adminUpdateNetwork(networkId: $networkId, input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminDeleteNetworkDocument = gql`
  mutation adminDeleteNetwork($networkId: String!) {
    deleted: adminDeleteNetwork(networkId: $networkId)
  }
`
export const UserGetTokenMetadataDocument = gql`
  query userGetTokenMetadata($cluster: NetworkCluster!, $account: String!) {
    result: userGetTokenMetadata(cluster: $cluster, account: $account)
  }
`
export const UserGetTokenAccountsDocument = gql`
  query userGetTokenAccounts($cluster: NetworkCluster!, $account: String!) {
    result: userGetTokenAccounts(cluster: $cluster, account: $account)
  }
`
export const UserGetEnabledNetworkClustersDocument = gql`
  query userGetEnabledNetworkClusters {
    clusters: userGetEnabledNetworkClusters
  }
`
export const AdminRefreshVoteIdentitiesDocument = gql`
  mutation adminRefreshVoteIdentities($networkId: String!) {
    refreshed: adminRefreshVoteIdentities(networkId: $networkId)
  }
`
export const AdminFindManyRoleDocument = gql`
  query adminFindManyRole($input: AdminFindManyRoleInput!) {
    paging: adminFindManyRole(input: $input) {
      data {
        ...RoleDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${RoleDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneRoleDocument = gql`
  query adminFindOneRole($roleId: String!) {
    item: adminFindOneRole(roleId: $roleId) {
      ...RoleDetails
    }
  }
  ${RoleDetailsFragmentDoc}
`
export const AdminCreateRoleDocument = gql`
  mutation adminCreateRole($input: AdminCreateRoleInput!) {
    created: adminCreateRole(input: $input) {
      ...RoleDetails
    }
  }
  ${RoleDetailsFragmentDoc}
`
export const AdminUpdateRoleDocument = gql`
  mutation adminUpdateRole($roleId: String!, $input: AdminUpdateRoleInput!) {
    updated: adminUpdateRole(roleId: $roleId, input: $input) {
      ...RoleDetails
    }
  }
  ${RoleDetailsFragmentDoc}
`
export const AdminDeleteRoleDocument = gql`
  mutation adminDeleteRole($roleId: String!) {
    deleted: adminDeleteRole(roleId: $roleId)
  }
`
export const UserFindManyRoleDocument = gql`
  query userFindManyRole($input: UserFindManyRoleInput!) {
    paging: userFindManyRole(input: $input) {
      data {
        ...RoleDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${RoleDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneRoleDocument = gql`
  query userFindOneRole($roleId: String!) {
    item: userFindOneRole(roleId: $roleId) {
      ...RoleDetails
      permissions {
        ...RolePermissionDetails
      }
    }
  }
  ${RoleDetailsFragmentDoc}
  ${RolePermissionDetailsFragmentDoc}
`
export const UserCreateRoleDocument = gql`
  mutation userCreateRole($input: UserCreateRoleInput!) {
    created: userCreateRole(input: $input) {
      ...RoleDetails
    }
  }
  ${RoleDetailsFragmentDoc}
`
export const UserCreateRoleConditionDocument = gql`
  mutation userCreateRoleCondition($input: UserCreateRoleConditionInput!) {
    created: userCreateRoleCondition(input: $input) {
      ...RoleConditionDetails
    }
  }
  ${RoleConditionDetailsFragmentDoc}
`
export const UserCreateRolePermissionDocument = gql`
  mutation userCreateRolePermission($input: UserCreateRolePermissionInput!) {
    created: userCreateRolePermission(input: $input) {
      ...RolePermissionDetails
    }
  }
  ${RolePermissionDetailsFragmentDoc}
`
export const UserUpdateRoleDocument = gql`
  mutation userUpdateRole($roleId: String!, $input: UserUpdateRoleInput!) {
    updated: userUpdateRole(roleId: $roleId, input: $input) {
      ...RoleDetails
    }
  }
  ${RoleDetailsFragmentDoc}
`
export const UserUpdateRoleConditionDocument = gql`
  mutation userUpdateRoleCondition($roleConditionId: String!, $input: UserUpdateRoleConditionInput!) {
    updated: userUpdateRoleCondition(roleConditionId: $roleConditionId, input: $input) {
      ...RoleConditionDetails
    }
  }
  ${RoleConditionDetailsFragmentDoc}
`
export const UserDeleteRoleDocument = gql`
  mutation userDeleteRole($roleId: String!) {
    deleted: userDeleteRole(roleId: $roleId)
  }
`
export const UserDeleteRoleConditionDocument = gql`
  mutation userDeleteRoleCondition($roleConditionId: String!) {
    deleted: userDeleteRoleCondition(roleConditionId: $roleConditionId)
  }
`
export const UserDeleteRolePermissionDocument = gql`
  mutation userDeleteRolePermission($rolePermissionId: String!) {
    deleted: userDeleteRolePermission(rolePermissionId: $rolePermissionId)
  }
`
export const UserSyncCommunityRolesDocument = gql`
  mutation userSyncCommunityRoles($communityId: String!) {
    result: userSyncCommunityRoles(communityId: $communityId)
  }
`
export const UserFindManySnapshotDocument = gql`
  query userFindManySnapshot($input: UserFindManySnapshotInput!) {
    paging: userFindManySnapshot(input: $input) {
      data {
        ...SnapshotDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${SnapshotDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneSnapshotDocument = gql`
  query userFindOneSnapshot($snapshotId: String!) {
    item: userFindOneSnapshot(snapshotId: $snapshotId) {
      ...SnapshotDetails
      data {
        ...SnapshotItemDetails
      }
    }
  }
  ${SnapshotDetailsFragmentDoc}
  ${SnapshotItemDetailsFragmentDoc}
`
export const UserCreateSnapshotDocument = gql`
  mutation userCreateSnapshot($input: UserCreateSnapshotInput!) {
    created: userCreateSnapshot(input: $input) {
      ...SnapshotDetails
    }
  }
  ${SnapshotDetailsFragmentDoc}
`
export const UserDeleteSnapshotDocument = gql`
  mutation userDeleteSnapshot($snapshotId: String!) {
    deleted: userDeleteSnapshot(snapshotId: $snapshotId)
  }
`
export const AdminFindManySnapshotDocument = gql`
  query adminFindManySnapshot($input: AdminFindManySnapshotInput!) {
    paging: adminFindManySnapshot(input: $input) {
      data {
        ...SnapshotDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${SnapshotDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneSnapshotDocument = gql`
  query adminFindOneSnapshot($snapshotId: String!) {
    item: adminFindOneSnapshot(snapshotId: $snapshotId) {
      ...SnapshotDetails
      data {
        ...SnapshotItemDetails
      }
    }
  }
  ${SnapshotDetailsFragmentDoc}
  ${SnapshotItemDetailsFragmentDoc}
`
export const AdminCreateSnapshotDocument = gql`
  mutation adminCreateSnapshot($input: AdminCreateSnapshotInput!) {
    created: adminCreateSnapshot(input: $input) {
      ...SnapshotDetails
    }
  }
  ${SnapshotDetailsFragmentDoc}
`
export const AdminDeleteSnapshotDocument = gql`
  mutation adminDeleteSnapshot($snapshotId: String!) {
    deleted: adminDeleteSnapshot(snapshotId: $snapshotId)
  }
`
export const AdminDeleteUserDocument = gql`
  mutation adminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId)
  }
`
export const AdminFindManyUserDocument = gql`
  query adminFindManyUser($input: AdminFindManyUserInput!) {
    paging: adminFindManyUser(input: $input) {
      data {
        ...UserDetails
        identities {
          ...IdentityDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneUserDocument = gql`
  query adminFindOneUser($userId: String!) {
    item: adminFindOneUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminUpdateUserDocument = gql`
  mutation adminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserFindManyUserDocument = gql`
  query userFindManyUser($input: UserFindManyUserInput!) {
    paging: userFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneUserDocument = gql`
  query userFindOneUser($username: String!) {
    item: userFindOneUser(username: $username) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`
export const UserFindOneUserByIdDocument = gql`
  query userFindOneUserById($userId: String!) {
    item: userFindOneUserById(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserUpdateUserDocument = gql`
  mutation userUpdateUser($input: UserUpdateUserInput!) {
    updated: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action()
const LogoutDocumentString = print(LogoutDocument)
const MeDocumentString = print(MeDocument)
const AdminCreateBackupDocumentString = print(AdminCreateBackupDocument)
const AdminDeleteBackupDocumentString = print(AdminDeleteBackupDocument)
const AdminFetchBackupDocumentString = print(AdminFetchBackupDocument)
const AdminGetBackupDocumentString = print(AdminGetBackupDocument)
const AdminGetBackupsDocumentString = print(AdminGetBackupsDocument)
const AdminRestoreBackupDocumentString = print(AdminRestoreBackupDocument)
const AdminFindManyBotDocumentString = print(AdminFindManyBotDocument)
const AdminFindOneBotDocumentString = print(AdminFindOneBotDocument)
const AdminCreateBotDocumentString = print(AdminCreateBotDocument)
const AdminUpdateBotDocumentString = print(AdminUpdateBotDocument)
const AdminDeleteBotDocumentString = print(AdminDeleteBotDocument)
const UserFindOneBotDocumentString = print(UserFindOneBotDocument)
const UserFindManyBotRolesDocumentString = print(UserFindManyBotRolesDocument)
const UserFindOneBotServerDocumentString = print(UserFindOneBotServerDocument)
const UserCreateBotDocumentString = print(UserCreateBotDocument)
const UserUpdateBotDocumentString = print(UserUpdateBotDocument)
const UserTestBotServerConfigDocumentString = print(UserTestBotServerConfigDocument)
const UserUpdateBotServerDocumentString = print(UserUpdateBotServerDocument)
const UserDeleteBotDocumentString = print(UserDeleteBotDocument)
const UserStartBotDocumentString = print(UserStartBotDocument)
const UserStopBotDocumentString = print(UserStopBotDocument)
const UserLeaveBotServerDocumentString = print(UserLeaveBotServerDocument)
const UserSyncBotServerDocumentString = print(UserSyncBotServerDocument)
const UserGetBotChannelsDocumentString = print(UserGetBotChannelsDocument)
const UserGetBotRolesDocumentString = print(UserGetBotRolesDocument)
const UserGetBotServersDocumentString = print(UserGetBotServersDocument)
const UserGetBotServerDocumentString = print(UserGetBotServerDocument)
const AdminFindManyCommunityMemberDocumentString = print(AdminFindManyCommunityMemberDocument)
const AdminFindOneCommunityMemberDocumentString = print(AdminFindOneCommunityMemberDocument)
const AdminAddCommunityMemberDocumentString = print(AdminAddCommunityMemberDocument)
const AdminUpdateCommunityMemberDocumentString = print(AdminUpdateCommunityMemberDocument)
const AdminRemoveCommunityMemberDocumentString = print(AdminRemoveCommunityMemberDocument)
const UserGetCommunityMemberDocumentString = print(UserGetCommunityMemberDocument)
const UserFindManyCommunityMemberDocumentString = print(UserFindManyCommunityMemberDocument)
const UserFindOneCommunityMemberDocumentString = print(UserFindOneCommunityMemberDocument)
const UserAddCommunityMemberDocumentString = print(UserAddCommunityMemberDocument)
const UserUpdateCommunityMemberDocumentString = print(UserUpdateCommunityMemberDocument)
const UserRemoveCommunityMemberDocumentString = print(UserRemoveCommunityMemberDocument)
const AdminFindManyCommunityDocumentString = print(AdminFindManyCommunityDocument)
const AdminFindOneCommunityDocumentString = print(AdminFindOneCommunityDocument)
const AdminCreateCommunityDocumentString = print(AdminCreateCommunityDocument)
const AdminUpdateCommunityDocumentString = print(AdminUpdateCommunityDocument)
const AdminDeleteCommunityDocumentString = print(AdminDeleteCommunityDocument)
const AnonGetCommunitiesDocumentString = print(AnonGetCommunitiesDocument)
const UserGetCommunitiesDocumentString = print(UserGetCommunitiesDocument)
const UserFindManyCommunityDocumentString = print(UserFindManyCommunityDocument)
const UserFindOneCommunityDocumentString = print(UserFindOneCommunityDocument)
const UserCreateCommunityDocumentString = print(UserCreateCommunityDocument)
const UserUpdateCommunityDocumentString = print(UserUpdateCommunityDocument)
const UserDeleteCommunityDocumentString = print(UserDeleteCommunityDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminTableStatsDocumentString = print(AdminTableStatsDocument)
const AdminFindManyIdentityDocumentString = print(AdminFindManyIdentityDocument)
const AdminFindUserByIdentityDocumentString = print(AdminFindUserByIdentityDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const AdminSetIdentityVerifiedDocumentString = print(AdminSetIdentityVerifiedDocument)
const AdminSyncIdentityDocumentString = print(AdminSyncIdentityDocument)
const UserFindManyIdentityDocumentString = print(UserFindManyIdentityDocument)
const UserFindOneIdentityDocumentString = print(UserFindOneIdentityDocument)
const UserDeleteIdentityDocumentString = print(UserDeleteIdentityDocument)
const UserUpdateIdentityDocumentString = print(UserUpdateIdentityDocument)
const UserRefreshIdentityDocumentString = print(UserRefreshIdentityDocument)
const UserRequestIdentityChallengeDocumentString = print(UserRequestIdentityChallengeDocument)
const UserRequestIdentityChallengeCliDocumentString = print(UserRequestIdentityChallengeCliDocument)
const UserVerifyIdentityChallengeDocumentString = print(UserVerifyIdentityChallengeDocument)
const UserVerifyIdentityChallengeCliDocumentString = print(UserVerifyIdentityChallengeCliDocument)
const UserLinkIdentityDocumentString = print(UserLinkIdentityDocument)
const AnonRequestIdentityChallengeDocumentString = print(AnonRequestIdentityChallengeDocument)
const AnonVerifyIdentityChallengeDocumentString = print(AnonVerifyIdentityChallengeDocument)
const UserAddIdentityGrantDocumentString = print(UserAddIdentityGrantDocument)
const UserRemoveIdentityGrantDocumentString = print(UserRemoveIdentityGrantDocument)
const UserFindManyLogDocumentString = print(UserFindManyLogDocument)
const UserFindOneLogDocumentString = print(UserFindOneLogDocument)
const AdminFindManyLogDocumentString = print(AdminFindManyLogDocument)
const AdminFindOneLogDocumentString = print(AdminFindOneLogDocument)
const AdminDeleteLogDocumentString = print(AdminDeleteLogDocument)
const AdminPurgeLogsDocumentString = print(AdminPurgeLogsDocument)
const UserFindManyNetworkAssetDocumentString = print(UserFindManyNetworkAssetDocument)
const UserFindOneNetworkAssetDocumentString = print(UserFindOneNetworkAssetDocument)
const AdminFindManyNetworkAssetDocumentString = print(AdminFindManyNetworkAssetDocument)
const AdminFindOneNetworkAssetDocumentString = print(AdminFindOneNetworkAssetDocument)
const AdminCleanupNetworkAssetsDocumentString = print(AdminCleanupNetworkAssetsDocument)
const AdminDeleteNetworkAssetDocumentString = print(AdminDeleteNetworkAssetDocument)
const AdminSyncNetworkAssetsDocumentString = print(AdminSyncNetworkAssetsDocument)
const AdminVerifyNetworkAssetsDocumentString = print(AdminVerifyNetworkAssetsDocument)
const AdminFindManyNetworkTokenDocumentString = print(AdminFindManyNetworkTokenDocument)
const AdminFindOneNetworkTokenDocumentString = print(AdminFindOneNetworkTokenDocument)
const AdminCreateNetworkTokenDocumentString = print(AdminCreateNetworkTokenDocument)
const AdminUpdateNetworkTokenDocumentString = print(AdminUpdateNetworkTokenDocument)
const AdminUpdateNetworkTokenMetadataDocumentString = print(AdminUpdateNetworkTokenMetadataDocument)
const AdminDeleteNetworkTokenDocumentString = print(AdminDeleteNetworkTokenDocument)
const UserFindManyNetworkTokenDocumentString = print(UserFindManyNetworkTokenDocument)
const AdminFindManyNetworkDocumentString = print(AdminFindManyNetworkDocument)
const AdminGetVoteIdentitiesDocumentString = print(AdminGetVoteIdentitiesDocument)
const AdminFindOneNetworkDocumentString = print(AdminFindOneNetworkDocument)
const AdminCreateNetworkDocumentString = print(AdminCreateNetworkDocument)
const AdminUpdateNetworkDocumentString = print(AdminUpdateNetworkDocument)
const AdminDeleteNetworkDocumentString = print(AdminDeleteNetworkDocument)
const UserGetTokenMetadataDocumentString = print(UserGetTokenMetadataDocument)
const UserGetTokenAccountsDocumentString = print(UserGetTokenAccountsDocument)
const UserGetEnabledNetworkClustersDocumentString = print(UserGetEnabledNetworkClustersDocument)
const AdminRefreshVoteIdentitiesDocumentString = print(AdminRefreshVoteIdentitiesDocument)
const AdminFindManyRoleDocumentString = print(AdminFindManyRoleDocument)
const AdminFindOneRoleDocumentString = print(AdminFindOneRoleDocument)
const AdminCreateRoleDocumentString = print(AdminCreateRoleDocument)
const AdminUpdateRoleDocumentString = print(AdminUpdateRoleDocument)
const AdminDeleteRoleDocumentString = print(AdminDeleteRoleDocument)
const UserFindManyRoleDocumentString = print(UserFindManyRoleDocument)
const UserFindOneRoleDocumentString = print(UserFindOneRoleDocument)
const UserCreateRoleDocumentString = print(UserCreateRoleDocument)
const UserCreateRoleConditionDocumentString = print(UserCreateRoleConditionDocument)
const UserCreateRolePermissionDocumentString = print(UserCreateRolePermissionDocument)
const UserUpdateRoleDocumentString = print(UserUpdateRoleDocument)
const UserUpdateRoleConditionDocumentString = print(UserUpdateRoleConditionDocument)
const UserDeleteRoleDocumentString = print(UserDeleteRoleDocument)
const UserDeleteRoleConditionDocumentString = print(UserDeleteRoleConditionDocument)
const UserDeleteRolePermissionDocumentString = print(UserDeleteRolePermissionDocument)
const UserSyncCommunityRolesDocumentString = print(UserSyncCommunityRolesDocument)
const UserFindManySnapshotDocumentString = print(UserFindManySnapshotDocument)
const UserFindOneSnapshotDocumentString = print(UserFindOneSnapshotDocument)
const UserCreateSnapshotDocumentString = print(UserCreateSnapshotDocument)
const UserDeleteSnapshotDocumentString = print(UserDeleteSnapshotDocument)
const AdminFindManySnapshotDocumentString = print(AdminFindManySnapshotDocument)
const AdminFindOneSnapshotDocumentString = print(AdminFindOneSnapshotDocument)
const AdminCreateSnapshotDocumentString = print(AdminCreateSnapshotDocument)
const AdminDeleteSnapshotDocumentString = print(AdminDeleteSnapshotDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const AdminFindManyUserDocumentString = print(AdminFindManyUserDocument)
const AdminFindOneUserDocumentString = print(AdminFindOneUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const UserFindManyUserDocumentString = print(UserFindManyUserDocument)
const UserFindOneUserDocumentString = print(UserFindOneUserDocument)
const UserFindOneUserByIdDocumentString = print(UserFindOneUserByIdDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LogoutMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LogoutMutation>(LogoutDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'logout',
        'mutation',
        variables,
      )
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
        variables,
      )
    },
    adminCreateBackup(
      variables?: AdminCreateBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateBackupMutation>(AdminCreateBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateBackup',
        'mutation',
        variables,
      )
    },
    adminDeleteBackup(
      variables: AdminDeleteBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteBackupMutation>(AdminDeleteBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteBackup',
        'mutation',
        variables,
      )
    },
    adminFetchBackup(
      variables: AdminFetchBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFetchBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFetchBackupMutation>(AdminFetchBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFetchBackup',
        'mutation',
        variables,
      )
    },
    adminGetBackup(
      variables: AdminGetBackupQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetBackupQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetBackupQuery>(AdminGetBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetBackup',
        'query',
        variables,
      )
    },
    adminGetBackups(
      variables?: AdminGetBackupsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetBackupsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetBackupsQuery>(AdminGetBackupsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetBackups',
        'query',
        variables,
      )
    },
    adminRestoreBackup(
      variables: AdminRestoreBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRestoreBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRestoreBackupMutation>(AdminRestoreBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRestoreBackup',
        'mutation',
        variables,
      )
    },
    adminFindManyBot(
      variables: AdminFindManyBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyBotQuery>(AdminFindManyBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyBot',
        'query',
        variables,
      )
    },
    adminFindOneBot(
      variables: AdminFindOneBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneBotQuery>(AdminFindOneBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneBot',
        'query',
        variables,
      )
    },
    adminCreateBot(
      variables: AdminCreateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateBotMutation>(AdminCreateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateBot',
        'mutation',
        variables,
      )
    },
    adminUpdateBot(
      variables: AdminUpdateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateBotMutation>(AdminUpdateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateBot',
        'mutation',
        variables,
      )
    },
    adminDeleteBot(
      variables: AdminDeleteBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteBotMutation>(AdminDeleteBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteBot',
        'mutation',
        variables,
      )
    },
    userFindOneBot(
      variables: UserFindOneBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneBotQuery>(UserFindOneBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneBot',
        'query',
        variables,
      )
    },
    userFindManyBotRoles(
      variables: UserFindManyBotRolesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyBotRolesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyBotRolesQuery>(UserFindManyBotRolesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyBotRoles',
        'query',
        variables,
      )
    },
    userFindOneBotServer(
      variables: UserFindOneBotServerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneBotServerQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneBotServerQuery>(UserFindOneBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneBotServer',
        'query',
        variables,
      )
    },
    userCreateBot(
      variables: UserCreateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateBotMutation>(UserCreateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateBot',
        'mutation',
        variables,
      )
    },
    userUpdateBot(
      variables: UserUpdateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateBotMutation>(UserUpdateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateBot',
        'mutation',
        variables,
      )
    },
    userTestBotServerConfig(
      variables: UserTestBotServerConfigMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserTestBotServerConfigMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserTestBotServerConfigMutation>(UserTestBotServerConfigDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userTestBotServerConfig',
        'mutation',
        variables,
      )
    },
    userUpdateBotServer(
      variables: UserUpdateBotServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateBotServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateBotServerMutation>(UserUpdateBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateBotServer',
        'mutation',
        variables,
      )
    },
    userDeleteBot(
      variables: UserDeleteBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteBotMutation>(UserDeleteBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteBot',
        'mutation',
        variables,
      )
    },
    userStartBot(
      variables: UserStartBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserStartBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserStartBotMutation>(UserStartBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userStartBot',
        'mutation',
        variables,
      )
    },
    userStopBot(
      variables: UserStopBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserStopBotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserStopBotMutation>(UserStopBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userStopBot',
        'mutation',
        variables,
      )
    },
    userLeaveBotServer(
      variables: UserLeaveBotServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserLeaveBotServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserLeaveBotServerMutation>(UserLeaveBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userLeaveBotServer',
        'mutation',
        variables,
      )
    },
    userSyncBotServer(
      variables: UserSyncBotServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserSyncBotServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserSyncBotServerMutation>(UserSyncBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userSyncBotServer',
        'mutation',
        variables,
      )
    },
    userGetBotChannels(
      variables: UserGetBotChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotChannelsQuery>(UserGetBotChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotChannels',
        'query',
        variables,
      )
    },
    userGetBotRoles(
      variables: UserGetBotRolesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotRolesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotRolesQuery>(UserGetBotRolesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotRoles',
        'query',
        variables,
      )
    },
    userGetBotServers(
      variables: UserGetBotServersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotServersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotServersQuery>(UserGetBotServersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotServers',
        'query',
        variables,
      )
    },
    userGetBotServer(
      variables: UserGetBotServerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetBotServerQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetBotServerQuery>(UserGetBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetBotServer',
        'query',
        variables,
      )
    },
    adminFindManyCommunityMember(
      variables: AdminFindManyCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCommunityMemberQuery>(AdminFindManyCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCommunityMember',
        'query',
        variables,
      )
    },
    adminFindOneCommunityMember(
      variables: AdminFindOneCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCommunityMemberQuery>(AdminFindOneCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCommunityMember',
        'query',
        variables,
      )
    },
    adminAddCommunityMember(
      variables: AdminAddCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddCommunityMemberMutation>(AdminAddCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddCommunityMember',
        'mutation',
        variables,
      )
    },
    adminUpdateCommunityMember(
      variables: AdminUpdateCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCommunityMemberMutation>(AdminUpdateCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCommunityMember',
        'mutation',
        variables,
      )
    },
    adminRemoveCommunityMember(
      variables: AdminRemoveCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveCommunityMemberMutation>(AdminRemoveCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveCommunityMember',
        'mutation',
        variables,
      )
    },
    userGetCommunityMember(
      variables: UserGetCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetCommunityMemberQuery>(UserGetCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetCommunityMember',
        'query',
        variables,
      )
    },
    userFindManyCommunityMember(
      variables: UserFindManyCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyCommunityMemberQuery>(UserFindManyCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyCommunityMember',
        'query',
        variables,
      )
    },
    userFindOneCommunityMember(
      variables: UserFindOneCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneCommunityMemberQuery>(UserFindOneCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneCommunityMember',
        'query',
        variables,
      )
    },
    userAddCommunityMember(
      variables: UserAddCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserAddCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserAddCommunityMemberMutation>(UserAddCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userAddCommunityMember',
        'mutation',
        variables,
      )
    },
    userUpdateCommunityMember(
      variables: UserUpdateCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateCommunityMemberMutation>(UserUpdateCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateCommunityMember',
        'mutation',
        variables,
      )
    },
    userRemoveCommunityMember(
      variables: UserRemoveCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRemoveCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRemoveCommunityMemberMutation>(UserRemoveCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRemoveCommunityMember',
        'mutation',
        variables,
      )
    },
    adminFindManyCommunity(
      variables: AdminFindManyCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCommunityQuery>(AdminFindManyCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCommunity',
        'query',
        variables,
      )
    },
    adminFindOneCommunity(
      variables: AdminFindOneCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCommunityQuery>(AdminFindOneCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCommunity',
        'query',
        variables,
      )
    },
    adminCreateCommunity(
      variables: AdminCreateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateCommunityMutation>(AdminCreateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateCommunity',
        'mutation',
        variables,
      )
    },
    adminUpdateCommunity(
      variables: AdminUpdateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCommunityMutation>(AdminUpdateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCommunity',
        'mutation',
        variables,
      )
    },
    adminDeleteCommunity(
      variables: AdminDeleteCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCommunityMutation>(AdminDeleteCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCommunity',
        'mutation',
        variables,
      )
    },
    anonGetCommunities(
      variables?: AnonGetCommunitiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonGetCommunitiesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonGetCommunitiesQuery>(AnonGetCommunitiesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonGetCommunities',
        'query',
        variables,
      )
    },
    userGetCommunities(
      variables: UserGetCommunitiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetCommunitiesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetCommunitiesQuery>(UserGetCommunitiesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetCommunities',
        'query',
        variables,
      )
    },
    userFindManyCommunity(
      variables: UserFindManyCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyCommunityQuery>(UserFindManyCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyCommunity',
        'query',
        variables,
      )
    },
    userFindOneCommunity(
      variables: UserFindOneCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneCommunityQuery>(UserFindOneCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneCommunity',
        'query',
        variables,
      )
    },
    userCreateCommunity(
      variables: UserCreateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateCommunityMutation>(UserCreateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateCommunity',
        'mutation',
        variables,
      )
    },
    userUpdateCommunity(
      variables: UserUpdateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateCommunityMutation>(UserUpdateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateCommunity',
        'mutation',
        variables,
      )
    },
    userDeleteCommunity(
      variables: UserDeleteCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteCommunityMutation>(UserDeleteCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteCommunity',
        'mutation',
        variables,
      )
    },
    uptime(
      variables?: UptimeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UptimeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UptimeQuery>(UptimeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'uptime',
        'query',
        variables,
      )
    },
    appConfig(
      variables?: AppConfigQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AppConfigQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AppConfigQuery>(AppConfigDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'appConfig',
        'query',
        variables,
      )
    },
    adminTableStats(
      variables?: AdminTableStatsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminTableStatsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminTableStatsQuery>(AdminTableStatsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminTableStats',
        'query',
        variables,
      )
    },
    adminFindManyIdentity(
      variables: AdminFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyIdentityQuery>(AdminFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyIdentity',
        'query',
        variables,
      )
    },
    adminFindUserByIdentity(
      variables: AdminFindUserByIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindUserByIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindUserByIdentityQuery>(AdminFindUserByIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindUserByIdentity',
        'query',
        variables,
      )
    },
    adminCreateIdentity(
      variables: AdminCreateIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIdentityMutation>(AdminCreateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIdentity',
        'mutation',
        variables,
      )
    },
    adminDeleteIdentity(
      variables: AdminDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIdentityMutation>(AdminDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIdentity',
        'mutation',
        variables,
      )
    },
    adminSetIdentityVerified(
      variables: AdminSetIdentityVerifiedMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminSetIdentityVerifiedMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminSetIdentityVerifiedMutation>(AdminSetIdentityVerifiedDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminSetIdentityVerified',
        'mutation',
        variables,
      )
    },
    adminSyncIdentity(
      variables: AdminSyncIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminSyncIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminSyncIdentityMutation>(AdminSyncIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminSyncIdentity',
        'mutation',
        variables,
      )
    },
    userFindManyIdentity(
      variables: UserFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyIdentityQuery>(UserFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyIdentity',
        'query',
        variables,
      )
    },
    userFindOneIdentity(
      variables: UserFindOneIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneIdentityQuery>(UserFindOneIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneIdentity',
        'query',
        variables,
      )
    },
    userDeleteIdentity(
      variables: UserDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteIdentityMutation>(UserDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteIdentity',
        'mutation',
        variables,
      )
    },
    userUpdateIdentity(
      variables: UserUpdateIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateIdentityMutation>(UserUpdateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateIdentity',
        'mutation',
        variables,
      )
    },
    userRefreshIdentity(
      variables: UserRefreshIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRefreshIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRefreshIdentityMutation>(UserRefreshIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRefreshIdentity',
        'mutation',
        variables,
      )
    },
    userRequestIdentityChallenge(
      variables: UserRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRequestIdentityChallengeQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRequestIdentityChallengeQuery>(UserRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRequestIdentityChallenge',
        'query',
        variables,
      )
    },
    userRequestIdentityChallengeCli(
      variables: UserRequestIdentityChallengeCliQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRequestIdentityChallengeCliQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRequestIdentityChallengeCliQuery>(
            UserRequestIdentityChallengeCliDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'userRequestIdentityChallengeCli',
        'query',
        variables,
      )
    },
    userVerifyIdentityChallenge(
      variables: UserVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserVerifyIdentityChallengeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserVerifyIdentityChallengeMutation>(UserVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userVerifyIdentityChallenge',
        'mutation',
        variables,
      )
    },
    userVerifyIdentityChallengeCli(
      variables: UserVerifyIdentityChallengeCliMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserVerifyIdentityChallengeCliMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserVerifyIdentityChallengeCliMutation>(
            UserVerifyIdentityChallengeCliDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'userVerifyIdentityChallengeCli',
        'mutation',
        variables,
      )
    },
    userLinkIdentity(
      variables: UserLinkIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserLinkIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserLinkIdentityMutation>(UserLinkIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userLinkIdentity',
        'mutation',
        variables,
      )
    },
    anonRequestIdentityChallenge(
      variables: AnonRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonRequestIdentityChallengeQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonRequestIdentityChallengeQuery>(AnonRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonRequestIdentityChallenge',
        'query',
        variables,
      )
    },
    anonVerifyIdentityChallenge(
      variables: AnonVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonVerifyIdentityChallengeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonVerifyIdentityChallengeMutation>(AnonVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonVerifyIdentityChallenge',
        'mutation',
        variables,
      )
    },
    userAddIdentityGrant(
      variables: UserAddIdentityGrantMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserAddIdentityGrantMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserAddIdentityGrantMutation>(UserAddIdentityGrantDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userAddIdentityGrant',
        'mutation',
        variables,
      )
    },
    userRemoveIdentityGrant(
      variables: UserRemoveIdentityGrantMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRemoveIdentityGrantMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRemoveIdentityGrantMutation>(UserRemoveIdentityGrantDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRemoveIdentityGrant',
        'mutation',
        variables,
      )
    },
    userFindManyLog(
      variables: UserFindManyLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyLogQuery>(UserFindManyLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyLog',
        'query',
        variables,
      )
    },
    userFindOneLog(
      variables: UserFindOneLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneLogQuery>(UserFindOneLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneLog',
        'query',
        variables,
      )
    },
    adminFindManyLog(
      variables: AdminFindManyLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyLogQuery>(AdminFindManyLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyLog',
        'query',
        variables,
      )
    },
    adminFindOneLog(
      variables: AdminFindOneLogQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneLogQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneLogQuery>(AdminFindOneLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneLog',
        'query',
        variables,
      )
    },
    adminDeleteLog(
      variables: AdminDeleteLogMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteLogMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteLogMutation>(AdminDeleteLogDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteLog',
        'mutation',
        variables,
      )
    },
    adminPurgeLogs(
      variables?: AdminPurgeLogsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminPurgeLogsMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminPurgeLogsMutation>(AdminPurgeLogsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminPurgeLogs',
        'mutation',
        variables,
      )
    },
    userFindManyNetworkAsset(
      variables: UserFindManyNetworkAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyNetworkAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyNetworkAssetQuery>(UserFindManyNetworkAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyNetworkAsset',
        'query',
        variables,
      )
    },
    userFindOneNetworkAsset(
      variables: UserFindOneNetworkAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneNetworkAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneNetworkAssetQuery>(UserFindOneNetworkAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneNetworkAsset',
        'query',
        variables,
      )
    },
    adminFindManyNetworkAsset(
      variables: AdminFindManyNetworkAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyNetworkAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyNetworkAssetQuery>(AdminFindManyNetworkAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyNetworkAsset',
        'query',
        variables,
      )
    },
    adminFindOneNetworkAsset(
      variables: AdminFindOneNetworkAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneNetworkAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneNetworkAssetQuery>(AdminFindOneNetworkAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneNetworkAsset',
        'query',
        variables,
      )
    },
    adminCleanupNetworkAssets(
      variables: AdminCleanupNetworkAssetsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCleanupNetworkAssetsMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCleanupNetworkAssetsMutation>(AdminCleanupNetworkAssetsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCleanupNetworkAssets',
        'mutation',
        variables,
      )
    },
    adminDeleteNetworkAsset(
      variables: AdminDeleteNetworkAssetMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteNetworkAssetMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkAssetMutation>(AdminDeleteNetworkAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetworkAsset',
        'mutation',
        variables,
      )
    },
    adminSyncNetworkAssets(
      variables?: AdminSyncNetworkAssetsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminSyncNetworkAssetsMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminSyncNetworkAssetsMutation>(AdminSyncNetworkAssetsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminSyncNetworkAssets',
        'mutation',
        variables,
      )
    },
    adminVerifyNetworkAssets(
      variables?: AdminVerifyNetworkAssetsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminVerifyNetworkAssetsMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminVerifyNetworkAssetsMutation>(AdminVerifyNetworkAssetsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminVerifyNetworkAssets',
        'mutation',
        variables,
      )
    },
    adminFindManyNetworkToken(
      variables: AdminFindManyNetworkTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyNetworkTokenQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyNetworkTokenQuery>(AdminFindManyNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyNetworkToken',
        'query',
        variables,
      )
    },
    adminFindOneNetworkToken(
      variables: AdminFindOneNetworkTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneNetworkTokenQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneNetworkTokenQuery>(AdminFindOneNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneNetworkToken',
        'query',
        variables,
      )
    },
    adminCreateNetworkToken(
      variables: AdminCreateNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateNetworkTokenMutation>(AdminCreateNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateNetworkToken',
        'mutation',
        variables,
      )
    },
    adminUpdateNetworkToken(
      variables: AdminUpdateNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkTokenMutation>(AdminUpdateNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateNetworkToken',
        'mutation',
        variables,
      )
    },
    adminUpdateNetworkTokenMetadata(
      variables: AdminUpdateNetworkTokenMetadataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateNetworkTokenMetadataMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkTokenMetadataMutation>(
            AdminUpdateNetworkTokenMetadataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminUpdateNetworkTokenMetadata',
        'mutation',
        variables,
      )
    },
    adminDeleteNetworkToken(
      variables: AdminDeleteNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkTokenMutation>(AdminDeleteNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetworkToken',
        'mutation',
        variables,
      )
    },
    userFindManyNetworkToken(
      variables: UserFindManyNetworkTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyNetworkTokenQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyNetworkTokenQuery>(UserFindManyNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyNetworkToken',
        'query',
        variables,
      )
    },
    adminFindManyNetwork(
      variables: AdminFindManyNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyNetworkQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyNetworkQuery>(AdminFindManyNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyNetwork',
        'query',
        variables,
      )
    },
    adminGetVoteIdentities(
      variables: AdminGetVoteIdentitiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetVoteIdentitiesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetVoteIdentitiesQuery>(AdminGetVoteIdentitiesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetVoteIdentities',
        'query',
        variables,
      )
    },
    adminFindOneNetwork(
      variables: AdminFindOneNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneNetworkQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneNetworkQuery>(AdminFindOneNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneNetwork',
        'query',
        variables,
      )
    },
    adminCreateNetwork(
      variables: AdminCreateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateNetworkMutation>(AdminCreateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateNetwork',
        'mutation',
        variables,
      )
    },
    adminUpdateNetwork(
      variables: AdminUpdateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkMutation>(AdminUpdateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateNetwork',
        'mutation',
        variables,
      )
    },
    adminDeleteNetwork(
      variables: AdminDeleteNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkMutation>(AdminDeleteNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetwork',
        'mutation',
        variables,
      )
    },
    userGetTokenMetadata(
      variables: UserGetTokenMetadataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetTokenMetadataQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetTokenMetadataQuery>(UserGetTokenMetadataDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetTokenMetadata',
        'query',
        variables,
      )
    },
    userGetTokenAccounts(
      variables: UserGetTokenAccountsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetTokenAccountsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetTokenAccountsQuery>(UserGetTokenAccountsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetTokenAccounts',
        'query',
        variables,
      )
    },
    userGetEnabledNetworkClusters(
      variables?: UserGetEnabledNetworkClustersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetEnabledNetworkClustersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetEnabledNetworkClustersQuery>(
            UserGetEnabledNetworkClustersDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'userGetEnabledNetworkClusters',
        'query',
        variables,
      )
    },
    adminRefreshVoteIdentities(
      variables: AdminRefreshVoteIdentitiesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRefreshVoteIdentitiesMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRefreshVoteIdentitiesMutation>(AdminRefreshVoteIdentitiesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRefreshVoteIdentities',
        'mutation',
        variables,
      )
    },
    adminFindManyRole(
      variables: AdminFindManyRoleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyRoleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyRoleQuery>(AdminFindManyRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyRole',
        'query',
        variables,
      )
    },
    adminFindOneRole(
      variables: AdminFindOneRoleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneRoleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneRoleQuery>(AdminFindOneRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneRole',
        'query',
        variables,
      )
    },
    adminCreateRole(
      variables: AdminCreateRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateRoleMutation>(AdminCreateRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateRole',
        'mutation',
        variables,
      )
    },
    adminUpdateRole(
      variables: AdminUpdateRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateRoleMutation>(AdminUpdateRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateRole',
        'mutation',
        variables,
      )
    },
    adminDeleteRole(
      variables: AdminDeleteRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteRoleMutation>(AdminDeleteRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteRole',
        'mutation',
        variables,
      )
    },
    userFindManyRole(
      variables: UserFindManyRoleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyRoleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyRoleQuery>(UserFindManyRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyRole',
        'query',
        variables,
      )
    },
    userFindOneRole(
      variables: UserFindOneRoleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneRoleQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneRoleQuery>(UserFindOneRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneRole',
        'query',
        variables,
      )
    },
    userCreateRole(
      variables: UserCreateRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateRoleMutation>(UserCreateRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateRole',
        'mutation',
        variables,
      )
    },
    userCreateRoleCondition(
      variables: UserCreateRoleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateRoleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateRoleConditionMutation>(UserCreateRoleConditionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateRoleCondition',
        'mutation',
        variables,
      )
    },
    userCreateRolePermission(
      variables: UserCreateRolePermissionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateRolePermissionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateRolePermissionMutation>(UserCreateRolePermissionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateRolePermission',
        'mutation',
        variables,
      )
    },
    userUpdateRole(
      variables: UserUpdateRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateRoleMutation>(UserUpdateRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateRole',
        'mutation',
        variables,
      )
    },
    userUpdateRoleCondition(
      variables: UserUpdateRoleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateRoleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateRoleConditionMutation>(UserUpdateRoleConditionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateRoleCondition',
        'mutation',
        variables,
      )
    },
    userDeleteRole(
      variables: UserDeleteRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteRoleMutation>(UserDeleteRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteRole',
        'mutation',
        variables,
      )
    },
    userDeleteRoleCondition(
      variables: UserDeleteRoleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteRoleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteRoleConditionMutation>(UserDeleteRoleConditionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteRoleCondition',
        'mutation',
        variables,
      )
    },
    userDeleteRolePermission(
      variables: UserDeleteRolePermissionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteRolePermissionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteRolePermissionMutation>(UserDeleteRolePermissionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteRolePermission',
        'mutation',
        variables,
      )
    },
    userSyncCommunityRoles(
      variables: UserSyncCommunityRolesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserSyncCommunityRolesMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserSyncCommunityRolesMutation>(UserSyncCommunityRolesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userSyncCommunityRoles',
        'mutation',
        variables,
      )
    },
    userFindManySnapshot(
      variables: UserFindManySnapshotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManySnapshotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManySnapshotQuery>(UserFindManySnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManySnapshot',
        'query',
        variables,
      )
    },
    userFindOneSnapshot(
      variables: UserFindOneSnapshotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneSnapshotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneSnapshotQuery>(UserFindOneSnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneSnapshot',
        'query',
        variables,
      )
    },
    userCreateSnapshot(
      variables: UserCreateSnapshotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateSnapshotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateSnapshotMutation>(UserCreateSnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateSnapshot',
        'mutation',
        variables,
      )
    },
    userDeleteSnapshot(
      variables: UserDeleteSnapshotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteSnapshotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteSnapshotMutation>(UserDeleteSnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteSnapshot',
        'mutation',
        variables,
      )
    },
    adminFindManySnapshot(
      variables: AdminFindManySnapshotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManySnapshotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManySnapshotQuery>(AdminFindManySnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManySnapshot',
        'query',
        variables,
      )
    },
    adminFindOneSnapshot(
      variables: AdminFindOneSnapshotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneSnapshotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneSnapshotQuery>(AdminFindOneSnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneSnapshot',
        'query',
        variables,
      )
    },
    adminCreateSnapshot(
      variables: AdminCreateSnapshotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateSnapshotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateSnapshotMutation>(AdminCreateSnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateSnapshot',
        'mutation',
        variables,
      )
    },
    adminDeleteSnapshot(
      variables: AdminDeleteSnapshotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteSnapshotMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteSnapshotMutation>(AdminDeleteSnapshotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteSnapshot',
        'mutation',
        variables,
      )
    },
    adminDeleteUser(
      variables: AdminDeleteUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteUserMutation>(AdminDeleteUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteUser',
        'mutation',
        variables,
      )
    },
    adminFindManyUser(
      variables: AdminFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyUserQuery>(AdminFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyUser',
        'query',
        variables,
      )
    },
    adminFindOneUser(
      variables: AdminFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneUserQuery>(AdminFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneUser',
        'query',
        variables,
      )
    },
    adminUpdateUser(
      variables: AdminUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateUserMutation>(AdminUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateUser',
        'mutation',
        variables,
      )
    },
    userFindManyUser(
      variables: UserFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyUserQuery>(UserFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyUser',
        'query',
        variables,
      )
    },
    userFindOneUser(
      variables: UserFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneUserQuery>(UserFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneUser',
        'query',
        variables,
      )
    },
    userFindOneUserById(
      variables: UserFindOneUserByIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneUserByIdQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneUserByIdQuery>(UserFindOneUserByIdDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneUserById',
        'query',
        variables,
      )
    },
    userUpdateUser(
      variables: UserUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateUserMutation>(UserUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateUser',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>
}>

type definedNonNullAny = {}

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v))

export const AppFeatureSchema = z.nativeEnum(AppFeature)

export const BotPlatformSchema = z.nativeEnum(BotPlatform)

export const BotStatusSchema = z.nativeEnum(BotStatus)

export const IdentityProviderSchema = z.nativeEnum(IdentityProvider)

export const LogLevelSchema = z.nativeEnum(LogLevel)

export const LogRelatedTypeSchema = z.nativeEnum(LogRelatedType)

export const NetworkClusterSchema = z.nativeEnum(NetworkCluster)

export const NetworkResolverSchema = z.nativeEnum(NetworkResolver)

export const NetworkTokenTypeSchema = z.nativeEnum(NetworkTokenType)

export const NetworkTypeSchema = z.nativeEnum(NetworkType)

export const UserRoleSchema = z.nativeEnum(UserRole)

export const UserStatusSchema = z.nativeEnum(UserStatus)

export function AdminAddCommunityMemberInputSchema(): z.ZodObject<Properties<AdminAddCommunityMemberInput>> {
  return z.object({
    admin: z.boolean(),
    userId: z.string(),
  })
}

export function AdminCreateBotInputSchema(): z.ZodObject<Properties<AdminCreateBotInput>> {
  return z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    communityId: z.string(),
    platform: BotPlatformSchema,
    token: z.string(),
  })
}

export function AdminCreateCommunityInputSchema(): z.ZodObject<Properties<AdminCreateCommunityInput>> {
  return z.object({
    name: z.string(),
  })
}

export function AdminCreateIdentityInputSchema(): z.ZodObject<Properties<AdminCreateIdentityInput>> {
  return z.object({
    ownerId: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function AdminCreateNetworkInputSchema(): z.ZodObject<Properties<AdminCreateNetworkInput>> {
  return z.object({
    cluster: NetworkClusterSchema,
    endpoint: z.string(),
    name: z.string(),
  })
}

export function AdminCreateNetworkTokenInputSchema(): z.ZodObject<Properties<AdminCreateNetworkTokenInput>> {
  return z.object({
    account: z.string(),
    cluster: NetworkClusterSchema,
  })
}

export function AdminCreateRoleInputSchema(): z.ZodObject<Properties<AdminCreateRoleInput>> {
  return z.object({
    communityId: z.string(),
    name: z.string(),
  })
}

export function AdminCreateSnapshotInputSchema(): z.ZodObject<Properties<AdminCreateSnapshotInput>> {
  return z.object({
    roleId: z.string(),
  })
}

export function AdminFindManyBotInputSchema(): z.ZodObject<Properties<AdminFindManyBotInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyCommunityInputSchema(): z.ZodObject<Properties<AdminFindManyCommunityInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyCommunityMemberInputSchema(): z.ZodObject<Properties<AdminFindManyCommunityMemberInput>> {
  return z.object({
    admin: z.boolean().nullish(),
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyIdentityInputSchema(): z.ZodObject<Properties<AdminFindManyIdentityInput>> {
  return z.object({
    ownerId: z.string().nullish(),
    provider: IdentityProviderSchema.nullish(),
  })
}

export function AdminFindManyLogInputSchema(): z.ZodObject<Properties<AdminFindManyLogInput>> {
  return z.object({
    botId: z.string().nullish(),
    communityId: z.string().nullish(),
    identityProvider: IdentityProviderSchema.nullish(),
    identityProviderId: z.string().nullish(),
    level: LogLevelSchema.nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    relatedId: z.string().nullish(),
    relatedType: LogRelatedTypeSchema.nullish(),
    roleId: z.string().nullish(),
    search: z.string().nullish(),
    userId: z.string().nullish(),
  })
}

export function AdminFindManyNetworkAssetInputSchema(): z.ZodObject<Properties<AdminFindManyNetworkAssetInput>> {
  return z.object({
    cluster: NetworkClusterSchema,
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    type: NetworkTokenTypeSchema.nullish(),
  })
}

export function AdminFindManyNetworkInputSchema(): z.ZodObject<Properties<AdminFindManyNetworkInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyNetworkTokenInputSchema(): z.ZodObject<Properties<AdminFindManyNetworkTokenInput>> {
  return z.object({
    cluster: NetworkClusterSchema,
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyRoleInputSchema(): z.ZodObject<Properties<AdminFindManyRoleInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManySnapshotInputSchema(): z.ZodObject<Properties<AdminFindManySnapshotInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    roleId: z.string().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyUserInputSchema(): z.ZodObject<Properties<AdminFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    role: UserRoleSchema.nullish(),
    search: z.string().nullish(),
    status: UserStatusSchema.nullish(),
  })
}

export function AdminUpdateBotInputSchema(): z.ZodObject<Properties<AdminUpdateBotInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    clientId: z.string().nullish(),
    clientSecret: z.string().nullish(),
    communityId: z.string().nullish(),
    name: z.string().nullish(),
    token: z.string().nullish(),
  })
}

export function AdminUpdateCommunityInputSchema(): z.ZodObject<Properties<AdminUpdateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    description: z.string().nullish(),
    discordUrl: z.string().nullish(),
    enableSync: z.boolean().nullish(),
    featured: z.boolean().nullish(),
    githubUrl: z.string().nullish(),
    name: z.string().nullish(),
    telegramUrl: z.string().nullish(),
    twitterUrl: z.string().nullish(),
    websiteUrl: z.string().nullish(),
  })
}

export function AdminUpdateCommunityMemberInputSchema(): z.ZodObject<Properties<AdminUpdateCommunityMemberInput>> {
  return z.object({
    admin: z.boolean(),
  })
}

export function AdminUpdateNetworkInputSchema(): z.ZodObject<Properties<AdminUpdateNetworkInput>> {
  return z.object({
    enableSync: z.boolean().nullish(),
    endpoint: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function AdminUpdateNetworkTokenInputSchema(): z.ZodObject<Properties<AdminUpdateNetworkTokenInput>> {
  return z.object({
    name: z.string().nullish(),
    vault: z.string().nullish(),
  })
}

export function AdminUpdateRoleInputSchema(): z.ZodObject<Properties<AdminUpdateRoleInput>> {
  return z.object({
    name: z.string().nullish(),
  })
}

export function AdminUpdateUserInputSchema(): z.ZodObject<Properties<AdminUpdateUserInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    developer: z.boolean().nullish(),
    name: z.string().nullish(),
    private: z.boolean().nullish(),
    role: UserRoleSchema.nullish(),
    status: UserStatusSchema.nullish(),
    username: z.string().nullish(),
  })
}

export function LinkIdentityInputSchema(): z.ZodObject<Properties<LinkIdentityInput>> {
  return z.object({
    name: z.string().nullish(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function RequestIdentityChallengeInputSchema(): z.ZodObject<Properties<RequestIdentityChallengeInput>> {
  return z.object({
    name: z.string().nullish(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function UserAddCommunityMemberInputSchema(): z.ZodObject<Properties<UserAddCommunityMemberInput>> {
  return z.object({
    admin: z.boolean(),
    userId: z.string(),
  })
}

export function UserAddIdentityGrantInputSchema(): z.ZodObject<Properties<UserAddIdentityGrantInput>> {
  return z.object({
    granteeId: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function UserCreateBotInputSchema(): z.ZodObject<Properties<UserCreateBotInput>> {
  return z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    communityId: z.string(),
    platform: BotPlatformSchema,
    token: z.string(),
  })
}

export function UserCreateCommunityInputSchema(): z.ZodObject<Properties<UserCreateCommunityInput>> {
  return z.object({
    name: z.string(),
  })
}

export function UserCreateRoleConditionInputSchema(): z.ZodObject<Properties<UserCreateRoleConditionInput>> {
  return z.object({
    roleId: z.string(),
    tokenId: z.string(),
  })
}

export function UserCreateRoleInputSchema(): z.ZodObject<Properties<UserCreateRoleInput>> {
  return z.object({
    communityId: z.string(),
    name: z.string(),
  })
}

export function UserCreateRolePermissionInputSchema(): z.ZodObject<Properties<UserCreateRolePermissionInput>> {
  return z.object({
    botId: z.string(),
    roleId: z.string(),
    serverId: z.string(),
    serverRoleId: z.string(),
  })
}

export function UserCreateSnapshotInputSchema(): z.ZodObject<Properties<UserCreateSnapshotInput>> {
  return z.object({
    roleId: z.string(),
  })
}

export function UserFindManyCommunityInputSchema(): z.ZodObject<Properties<UserFindManyCommunityInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    withRoles: z.boolean().nullish(),
  })
}

export function UserFindManyCommunityMemberInputSchema(): z.ZodObject<Properties<UserFindManyCommunityMemberInput>> {
  return z.object({
    admin: z.boolean().nullish(),
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManyIdentityInputSchema(): z.ZodObject<Properties<UserFindManyIdentityInput>> {
  return z.object({
    provider: IdentityProviderSchema.nullish(),
    username: z.string(),
  })
}

export function UserFindManyLogInputSchema(): z.ZodObject<Properties<UserFindManyLogInput>> {
  return z.object({
    botId: z.string().nullish(),
    communityId: z.string().nullish(),
    identityProvider: IdentityProviderSchema.nullish(),
    identityProviderId: z.string().nullish(),
    level: LogLevelSchema.nullish(),
    limit: z.number().nullish(),
    networkAssetId: z.string().nullish(),
    page: z.number().nullish(),
    relatedId: z.string().nullish(),
    relatedType: LogRelatedTypeSchema.nullish(),
    roleId: z.string().nullish(),
    search: z.string().nullish(),
    userId: z.string().nullish(),
  })
}

export function UserFindManyNetworkAssetInputSchema(): z.ZodObject<Properties<UserFindManyNetworkAssetInput>> {
  return z.object({
    cluster: NetworkClusterSchema.nullish(),
    group: z.string().nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    type: NetworkTokenTypeSchema.nullish(),
    username: z.string(),
  })
}

export function UserFindManyNetworkTokenInputSchema(): z.ZodObject<Properties<UserFindManyNetworkTokenInput>> {
  return z.object({
    cluster: NetworkClusterSchema.nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    type: NetworkTokenTypeSchema.nullish(),
    username: z.string().nullish(),
  })
}

export function UserFindManyRoleInputSchema(): z.ZodObject<Properties<UserFindManyRoleInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManySnapshotInputSchema(): z.ZodObject<Properties<UserFindManySnapshotInput>> {
  return z.object({
    communityId: z.string(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    roleId: z.string().nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManyUserInputSchema(): z.ZodObject<Properties<UserFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserRemoveIdentityGrantInputSchema(): z.ZodObject<Properties<UserRemoveIdentityGrantInput>> {
  return z.object({
    granteeId: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function UserUpdateBotInputSchema(): z.ZodObject<Properties<UserUpdateBotInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    clientId: z.string().nullish(),
    clientSecret: z.string().nullish(),
    name: z.string().nullish(),
    token: z.string().nullish(),
  })
}

export function UserUpdateBotServerInputSchema(): z.ZodObject<Properties<UserUpdateBotServerInput>> {
  return z.object({
    adminRoles: z.array(z.string()).nullish(),
    botChannel: z.string().nullish(),
    dryRun: z.boolean().nullish(),
    enableSync: z.boolean().nullish(),
    verbose: z.boolean().nullish(),
  })
}

export function UserUpdateCommunityInputSchema(): z.ZodObject<Properties<UserUpdateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    description: z.string().nullish(),
    discordUrl: z.string().nullish(),
    enableSync: z.boolean().nullish(),
    githubUrl: z.string().nullish(),
    name: z.string().nullish(),
    telegramUrl: z.string().nullish(),
    twitterUrl: z.string().nullish(),
    websiteUrl: z.string().nullish(),
  })
}

export function UserUpdateCommunityMemberInputSchema(): z.ZodObject<Properties<UserUpdateCommunityMemberInput>> {
  return z.object({
    admin: z.boolean(),
  })
}

export function UserUpdateIdentityInputSchema(): z.ZodObject<Properties<UserUpdateIdentityInput>> {
  return z.object({
    name: z.string().nullish(),
  })
}

export function UserUpdateRoleConditionInputSchema(): z.ZodObject<Properties<UserUpdateRoleConditionInput>> {
  return z.object({
    amount: z.string().nullish(),
    amountMax: z.string().nullish(),
    config: definedNonNullAnySchema.nullish(),
    filters: definedNonNullAnySchema.nullish(),
  })
}

export function UserUpdateRoleInputSchema(): z.ZodObject<Properties<UserUpdateRoleInput>> {
  return z.object({
    name: z.string().nullish(),
  })
}

export function UserUpdateUserInputSchema(): z.ZodObject<Properties<UserUpdateUserInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    developer: z.boolean().nullish(),
    name: z.string().nullish(),
    private: z.boolean().nullish(),
  })
}

export function VerifyIdentityChallengeInputSchema(): z.ZodObject<Properties<VerifyIdentityChallengeInput>> {
  return z.object({
    challenge: z.string(),
    message: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
    signature: z.string(),
  })
}
