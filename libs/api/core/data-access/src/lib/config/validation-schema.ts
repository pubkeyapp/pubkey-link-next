import * as Joi from 'joi'

export const validationSchema = Joi.object({
  // App
  APP_LOGO_URL_DARK: Joi.string(),
  APP_LOGO_URL_LIGHT: Joi.string(),
  APP_THEME_BACKGROUND: Joi.string().default(''),
  APP_THEME_COLOR: Joi.string().default('blue'),
  // API
  API_URL: Joi.string().required().error(new Error(`API_URL is required.`)),
  // Discord Authentication
  AUTH_DISCORD_ADMIN_IDS: Joi.string(),
  AUTH_DISCORD_CLIENT_ID: Joi.string(),
  AUTH_DISCORD_CLIENT_SECRET: Joi.string(),
  AUTH_DISCORD_LINK_ENABLED: Joi.boolean().default(false),
  AUTH_DISCORD_LOGIN_ENABLED: Joi.boolean().default(true),
  // Solana Authentication
  AUTH_SOLANA_ADMIN_IDS: Joi.string(),
  AUTH_SOLANA_LINK_ENABLED: Joi.boolean().default(true),
  AUTH_SOLANA_LOGIN_ENABLED: Joi.boolean().default(false),
  AUTH_SOLANA_REGISTER_ENABLED: Joi.boolean().default(false),
  // Bot
  BOT_AUTO_START: Joi.boolean().default(true),
  CLOAK_MASTER_KEY: Joi.string().required().error(new Error(`CLOAK_MASTER_KEY is required.`)),
  CLOAK_KEYCHAIN: Joi.string().required().error(new Error(`CLOAK_KEYCHAIN is required.`)),
  COOKIE_NAME: Joi.string().default('__session'),
  COOKIE_SECURE: Joi.boolean().default(true),
  DATABASE_PROVISION: Joi.boolean().default(false),
  DATABASE_URL: Joi.string(),
  // Features
  FEATURE_ANON_COMMUNITIES: Joi.boolean().default(true),
  FEATURE_BETA_DAS_BURNT: Joi.boolean().default(false),
  FEATURE_BETA_DAS_SEARCH: Joi.boolean().default(false),
  FEATURE_COMMUNITY_CREATE: Joi.boolean().default(true),
  FEATURE_COMMUNITY_SNAPSHOTS: Joi.boolean().default(false),
  FEATURE_IDENTITY_CLI_VERIFICATION: Joi.boolean().default(false),
  FEATURE_IDENTITY_GRANTS: Joi.boolean().default(false),
  FEATURE_PRIVATE_PROFILES: Joi.boolean().default(false),
  FEATURE_PUBKEY_PROTOCOL: Joi.boolean().default(false),
  FEATURE_RESOLVER_SOLANA_FUNGIBLE: Joi.boolean().default(true),
  FEATURE_RESOLVER_SOLANA_NON_FUNGIBLE: Joi.boolean().default(true),
  FEATURE_RESOLVER_SOLANA_VALIDATOR: Joi.boolean().default(false),
  FEATURE_VERIFY_NETWORK_ASSETS: Joi.boolean().default(false),
  GRAPHQL_PLAYGROUND: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().required(),
  HOST: Joi.string().default('0.0.0.0'),
  LOG_COLOR: Joi.boolean().default('true'),
  LOG_JSON: Joi.boolean().default(process.env['NODE_ENV'] === 'production'),
  LOG_LEVEL: Joi.string()
    .equal('ALL', 'SILLY', 'FINE', 'VERBOSE', 'DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR', 'FATAL', 'OFF')
    .default('INFO'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().default(3000),
  REDIS_URL: Joi.string().required().error(new Error(`REDIS_URL is required.`)),
  // Solana endpoints
  SOLANA_CUSTOM_ENDPOINT: Joi.string(),
  SOLANA_DEVNET_ENDPOINT: Joi.string(),
  SOLANA_MAINNET_ENDPOINT: Joi.string(),
  SOLANA_TESTNET_ENDPOINT: Joi.string(),
  SYNC_BOT_SERVERS: Joi.boolean().default(true),
  SYNC_NETWORK_ASSETS: Joi.boolean().default(true),
  SYNC_COMMUNITY_ROLES: Joi.boolean().default(true),
})
