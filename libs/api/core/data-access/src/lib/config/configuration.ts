// Remove trailing slashes from the URLs to avoid double slashes
import { LogLevel } from '@ogma/common'

const API_URL = getUrl('API_URL') as string

if (!API_URL) {
  throw new Error('API_URL is not set. Make sure to set it in the .env file')
}
// Infer the WEB URL from the API_URL if it's not set
const WEB_URL = getUrl('WEB_URL') ?? API_URL?.replace('/api', '')

const cookieDomains: string[] = getCookieDomains()

// Infer the cookie domain from the API_URL if it's not set
if (!cookieDomains.length) {
  const { hostname } = new URL(API_URL)
  cookieDomains.push(hostname)
}

const corsOrigins: string[] = getCorsOrigins()

export type Env = 'development' | 'production' | 'test' | 'provision'
export interface ApiCoreConfig {
  // App
  appLogoUrlDark: string
  appLogoUrlLight: string
  appThemeBackground: string
  appThemeColor: string
  // API
  apiUrl: string
  // Discord Authentication
  authDiscordAdminIds: string[]
  authDiscordClientId: string
  authDiscordClientSecret: string
  authDiscordLinkEnabled: boolean
  authDiscordLoginEnabled: boolean
  // Solana Authentication
  authSolanaAdminIds: string[]
  authSolanaLinkEnabled: boolean
  authSolanaLoginEnabled: boolean
  authSolanaRegisterEnabled: boolean
  // Telegram Authentication
  authTelegramLinkEnabled: boolean
  authTelegramLoginEnabled: boolean
  authTelegramBotName: string
  authTelegramBotToken: string

  // Bot
  botAutoStart: boolean
  // Cookies
  cookieDomains: string[]
  cookieName: string
  cookieSecure: boolean
  // CORS
  corsOrigins: string[]
  // Database Provisioning
  databaseProvision: boolean
  // Environment
  environment: Env
  // Feature Flags
  featureAnonCommunities: boolean
  featureBetaDasBurnt: boolean
  featureBetaDasSearch: boolean
  featureCommunityCreate: boolean
  featureCommunitySnapshots: boolean
  featureIdentityCliVerification: boolean
  featureIdentityGrants: boolean
  featurePrivateProfiles: boolean
  featurePubkeyProtocol: boolean
  featureResolverSolanaFungible: boolean
  featureResolverSolanaNonFungible: boolean
  featureResolverSolanaValidator: boolean
  // Host
  host: string
  // Logger
  logColor: boolean
  logJson: boolean
  logLevel: keyof typeof LogLevel
  // JWT
  jwtSecret: string
  // Port
  port: number
  // PubKey Protocol
  pubkeyProtocolCluster?: string
  pubkeyProtocolEndpoint?: string
  pubkeyProtocolFeePayer?: string
  // Redis
  redisUrl: string
  // Solana Endpoints
  solanaCustomEndpoint: string
  solanaDevnetEndpoint: string
  solanaMainnetEndpoint: string
  solanaTestnetEndpoint: string
  // Sync
  syncBotServers: boolean
  syncCommunityRoles: boolean
  syncNetworkAssets: boolean
  // Web URL
  webUrl: string
}

export function configuration(): ApiCoreConfig {
  return {
    appLogoUrlDark: process.env['APP_LOGO_URL_DARK'] as string,
    appLogoUrlLight: process.env['APP_LOGO_URL_LIGHT'] as string,
    appThemeBackground: process.env['APP_THEME_BACKGROUND'] as string,
    appThemeColor: process.env['APP_THEME_COLOR'] as string,
    apiUrl: process.env['API_URL'] as string,
    authDiscordAdminIds: getFromEnvironment('AUTH_DISCORD_ADMIN_IDS'),
    authDiscordClientId: process.env['AUTH_DISCORD_CLIENT_ID'] as string,
    authDiscordClientSecret: process.env['AUTH_DISCORD_CLIENT_SECRET'] as string,
    authDiscordLinkEnabled: process.env['AUTH_DISCORD_LINK_ENABLED'] === 'true',
    authDiscordLoginEnabled: process.env['AUTH_DISCORD_LOGIN_ENABLED'] === 'true',
    authSolanaAdminIds: getFromEnvironment('AUTH_SOLANA_ADMIN_IDS'),
    authSolanaLinkEnabled: process.env['AUTH_SOLANA_LINK_ENABLED'] === 'true',
    authSolanaLoginEnabled: process.env['AUTH_SOLANA_LOGIN_ENABLED'] === 'true',
    authSolanaRegisterEnabled: process.env['AUTH_SOLANA_REGISTER_ENABLED'] === 'true',
    authTelegramLinkEnabled: process.env['AUTH_TELEGRAM_LINK_ENABLED'] === 'true',
    authTelegramLoginEnabled: process.env['AUTH_TELEGRAM_LOGIN_ENABLED'] === 'true',
    authTelegramBotName: process.env['AUTH_TELEGRAM_BOT_NAME'] as string,
    authTelegramBotToken: process.env['AUTH_TELEGRAM_BOT_TOKEN'] as string,
    botAutoStart: process.env['BOT_AUTO_START'] === 'true',
    cookieDomains,
    cookieName: '__session',
    cookieSecure: process.env['COOKIE_SECURE'] === 'true',
    corsOrigins,
    databaseProvision: process.env['DATABASE_PROVISION'] === 'true',
    environment: (process.env['NODE_ENV'] as Env) || 'development',
    featureAnonCommunities: process.env['FEATURE_ANON_COMMUNITIES'] === 'true',
    featureBetaDasBurnt: process.env['FEATURE_BETA_DAS_BURNT'] === 'true',
    featureBetaDasSearch: process.env['FEATURE_BETA_DAS_SEARCH'] === 'true',
    featureCommunityCreate: process.env['FEATURE_COMMUNITY_CREATE'] === 'true',
    featureCommunitySnapshots: process.env['FEATURE_COMMUNITY_SNAPSHOTS'] === 'true',
    featureIdentityCliVerification: process.env['FEATURE_IDENTITY_CLI_VERIFICATION'] === 'true',
    featureIdentityGrants: process.env['FEATURE_IDENTITY_GRANTS'] === 'true',
    featurePrivateProfiles: process.env['FEATURE_PRIVATE_PROFILES'] === 'true',
    featurePubkeyProtocol: process.env['FEATURE_PUBKEY_PROTOCOL'] === 'true',
    featureResolverSolanaFungible: process.env['FEATURE_RESOLVER_SOLANA_FUNGIBLE'] === 'true',
    featureResolverSolanaNonFungible: process.env['FEATURE_RESOLVER_SOLANA_NON_FUNGIBLE'] === 'true',
    featureResolverSolanaValidator: process.env['FEATURE_RESOLVER_SOLANA_VALIDATOR'] === 'true',
    host: process.env['HOST'] as string,
    logColor: process.env['LOG_COLOR'] === 'true',
    logJson: process.env['LOG_JSON'] === 'true',
    logLevel: process.env['LOG_LEVEL'] as keyof typeof LogLevel,
    jwtSecret: process.env['JWT_SECRET'] as string,
    port: parseInt(process.env['PORT'] as string, 10) || 3000,
    pubkeyProtocolCluster: process.env['PUBKEY_PROTOCOL_CLUSTER'] as string,
    pubkeyProtocolEndpoint: process.env['PUBKEY_PROTOCOL_ENDPOINT'] as string,
    pubkeyProtocolFeePayer: process.env['PUBKEY_PROTOCOL_FEE_PAYER'] as string,
    redisUrl: process.env['REDIS_URL'] as string,
    solanaCustomEndpoint: process.env['SOLANA_CUSTOM_ENDPOINT'] as string,
    solanaDevnetEndpoint: process.env['SOLANA_DEVNET_ENDPOINT'] as string,
    solanaMainnetEndpoint: process.env['SOLANA_MAINNET_ENDPOINT'] as string,
    solanaTestnetEndpoint: process.env['SOLANA_TESTNET_ENDPOINT'] as string,
    syncBotServers: process.env['SYNC_BOT_SERVERS'] === 'true',
    syncCommunityRoles: process.env['SYNC_COMMUNITY_ROLES'] === 'true',
    syncNetworkAssets: process.env['SYNC_NETWORK_ASSETS'] === 'true',
    webUrl: WEB_URL,
  }
}

// Get the cookie domains from the ENV
function getCookieDomains() {
  return getFromEnvironment('COOKIE_DOMAINS').filter(Boolean)
}

// Get the origins from the ENV
function getCorsOrigins() {
  return getFromEnvironment('CORS_ORIGINS').filter(Boolean)
}

// Get the values from the ENV
function getFromEnvironment(key: string) {
  return (process.env[key]?.includes(',') ? (process.env[key]?.split(',') as string[]) : [process.env[key]]) as string[]
}

function getUrl(key: string) {
  return process.env[key]?.replace(/\/$/, '')
}
