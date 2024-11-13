import { NetworkCluster, NetworkTokenType, Prisma } from '@prisma/client'

const cluster = NetworkCluster.SolanaMainnet
const DL_SERVER = '953959331353751632'
const DL_LOGS_DEV = '1186082723064991774'
const DL_ROLE_ONE_OF_US = '1126756485200871465'
const DL_ROLE_BV = '1148950083941961798'
const DL_ROLE_BV_EXPIRED = '1150017837017084005'
const DL_ROLE_HOLDER = '1205617205006434384'
const DL_TOKEN_BV = '9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp'
const DL_TOKEN_NFT = '5FusHaKEKjfKsmQwXNrhFcFABGGxu7iYCdbvyVSRe3Ri'
const DL_TOKEN_FT = 'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a'

const DL_BOT: Prisma.BotCreateWithoutCommunityInput = {
  clientId: process.env['DEANSLIST_BOT_CLIENT_ID'] ?? '',
  clientSecret: process.env['DEANSLIST_BOT_CLIENT_SECRET'] ?? '',
  token: process.env['DEANSLIST_BOT_TOKEN'] ?? '',
  avatarUrl: 'https://cdn.discordapp.com/avatars/1138462172092039258/2d9f621e44433c97e171bb40ec122b6f.png?size=1024',
  id: process.env['DEANSLIST_BOT_CLIENT_ID'] ?? '',
  name: "Dean's List Projects LOCAL",
  permissions: {
    create: [DL_ROLE_ONE_OF_US, DL_ROLE_BV, DL_ROLE_BV_EXPIRED, DL_ROLE_HOLDER].map((serverRoleId) => ({
      id: `${DL_SERVER}-${serverRoleId}`,
      serverId: DL_SERVER,
      serverRoleId,
    })),
  },
}

const DL_CONDITION_NFT: Prisma.RoleConditionCreateWithoutRoleInput = {
  token: { connect: { account_cluster: { cluster, account: DL_TOKEN_NFT } } },
  type: NetworkTokenType.NonFungible,
  amount: '1',
}
const DL_CONDITION_BV: Prisma.RoleConditionCreateWithoutRoleInput = {
  token: { connect: { account_cluster: { cluster, account: DL_TOKEN_BV } } },
  type: NetworkTokenType.NonFungible,
  amount: '1',
  filters: { status: 'active' },
}
const DL_CONDITION_BV_EXP: Prisma.RoleConditionCreateWithoutRoleInput = {
  ...DL_CONDITION_BV,
  filters: { status: 'expired' },
}
const DL_CONDITION_HOLDER_SHRIMP: Prisma.RoleConditionCreateWithoutRoleInput = {
  token: { connect: { account_cluster: { cluster, account: DL_TOKEN_FT } } },
  type: NetworkTokenType.Fungible,
  amount: '1',
  amountMax: '1000000',
}
const DL_CONDITION_HOLDER_DOLPHIN: Prisma.RoleConditionCreateWithoutRoleInput = {
  ...DL_CONDITION_HOLDER_SHRIMP,
  amount: '1000001',
  amountMax: '10000000',
}
const DL_CONDITION_HOLDER_WHALE: Prisma.RoleConditionCreateWithoutRoleInput = {
  ...DL_CONDITION_HOLDER_DOLPHIN,
  amount: '10000001',
  amountMax: '',
}

const LOCAL_TOKEN_FT = 'LoCaPtFUUtfdmZbw82gQoc2LDBipRVCCe3d6nPSpi1G'
const LOCAL_TOKEN_NFT = 'NFTZLSyUZRUJh661TL749KK3z1W1NMDocWMggPAvQai'

const LOCAL_CONDITION_FT: Prisma.RoleConditionCreateWithoutRoleInput = {
  token: { connect: { account_cluster: { cluster: NetworkCluster.SolanaCustom, account: LOCAL_TOKEN_FT } } },
  type: NetworkTokenType.Fungible,
  amount: '42',
}

const LOCAL_CONDITION_NFT: Prisma.RoleConditionCreateWithoutRoleInput = {
  token: { connect: { account_cluster: { cluster: NetworkCluster.SolanaCustom, account: LOCAL_TOKEN_NFT } } },
  type: NetworkTokenType.NonFungible,
  amount: '1',
}

const LOS_SERVER = '1190413756325429268'
const LOS_LEGEND = 'LGNDeXXXaDDeRerwwHfUtPBNz5s6vrn1NMSt9hdaCwx'
const LOS_THE_CHOICE = '8fmefJZapGpyVMDzj4MSYQfR7mTET1oV9hXyu1axCjLE'
const LOS_ROLE_CERTIFIED = '1207141774976614451'

const LOS_BOT: Prisma.BotCreateWithoutCommunityInput = {
  clientId: process.env['LOS_BOT_CLIENT_ID'] ?? '',
  clientSecret: process.env['LOS_BOT_CLIENT_SECRET'] ?? '',
  token: process.env['LOS_BOT_TOKEN'] ?? '',
  avatarUrl: 'https://cdn.discordapp.com/avatars/1208445127832637451/babbe2d94cc9058e7a66a844a7b15eb5.png?size=1024',
  id: process.env['LOS_BOT_CLIENT_ID'] ?? '',
  name: 'Legends of Sol 🅿 Verification',
  permissions: {
    create: [LOS_ROLE_CERTIFIED].map((serverRoleId) => ({
      id: `${LOS_SERVER}-${serverRoleId}`,
      serverId: LOS_SERVER,
      serverRoleId,
    })),
  },
}

const LOS_CONDITION_NFT: Prisma.RoleConditionCreateWithoutRoleInput = {
  type: NetworkTokenType.NonFungible,
  token: { connect: { account_cluster: { cluster, account: LOS_THE_CHOICE } } },
  amount: '1',
}

const LOG_CONDITION_FT: Prisma.RoleConditionCreateWithoutRoleInput = {
  type: NetworkTokenType.Fungible,
  token: { connect: { account_cluster: { cluster, account: LOS_LEGEND } } },
  amount: '1',
}

const PK_SERVER = '1074745933163671562'
const PK_SERVER_LOGS = '1209484932011790366'
const PK_ROLE_DEANSLIST = '1199576114566283294'
const PK_ROLE_DL_BV = '1148913524207263815'
const PK_ROLE_DL_BV_EXPIRED = '1209490186644361246'
const PK_ROLE_DL_HOLDER = '1148913592230477835'

const PK_BOT: Prisma.BotCreateWithoutCommunityInput = {
  clientId: process.env['PUBKEY_BOT_CLIENT_ID'] ?? '',
  clientSecret: process.env['PUBKEY_BOT_CLIENT_SECRET'] ?? '',
  token: process.env['PUBKEY_BOT_TOKEN'] ?? '',
  avatarUrl: 'https://cdn.discordapp.com/avatars/1142411815897288846/279959328ec47debb9cc7db3dff1ab4c.webp',
  id: process.env['PUBKEY_BOT_CLIENT_ID'] ?? '',
  name: 'PubKey Link Yellow',
  status: 'Active',
  permissions: {
    create: [PK_ROLE_DEANSLIST, PK_ROLE_DL_BV, PK_ROLE_DL_BV_EXPIRED, PK_ROLE_DL_HOLDER].map((serverRoleId) => ({
      id: `${PK_SERVER}-${serverRoleId}`,
      serverId: PK_SERVER,
      serverRoleId,
    })),
  },
  servers: {
    create: [
      {
        serverId: PK_SERVER,
        enableSync: true,
        dryRun: true,
        verbose: true,
        botChannel: PK_SERVER_LOGS,
        adminRoles: ['1074745981389770833', '1133792593768103996', '1080885049550966834', '1209487612595666954'],
      },
      {
        serverId: DL_SERVER,
        enableSync: true,
        dryRun: true,
        verbose: true,
        botChannel: DL_LOGS_DEV,
      },
    ],
  },
}

export const provisionCommunities: Prisma.CommunityCreateInput[] = [
  {
    name: 'localhost',
    featured: true,
    enableSync: true,
    members: {
      create: [
        { user: { connect: { id: 'alice' } }, admin: true },
        { user: { connect: { id: 'dave' } }, admin: true },
      ],
    },
    roles: {
      create: [
        { id: 'local-ft-holder', name: 'Local FT Holder', conditions: { create: [LOCAL_CONDITION_FT] } },
        { id: 'local-nft-holder', name: 'Local NFT Holder', conditions: { create: [LOCAL_CONDITION_NFT] } },
      ],
    },
  },
  {
    name: 'PubKey',
    featured: true,
    enableSync: true,
    description: 'Decentralized identities on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    discordUrl: 'https://discord.gg/XxuZQeDPNf',
    githubUrl: 'https://github.com/PubKeyApp',
    telegramUrl: 'https://t.me/beemandev',
    twitterUrl: 'https://twitter.com/PubKeyApp',
    websiteUrl: 'https://app.pubkey.link',
    members: {
      create: [
        { user: { connect: { id: 'alice' } }, admin: true },
        { user: { connect: { id: 'dave' } }, admin: true },
      ],
    },
    bot: { create: PK_BOT.clientId ? PK_BOT : undefined },
    roles: {
      create: [
        {
          id: 'one-of-us-pubkey',
          name: 'ONE OF US',
          conditions: { create: [DL_CONDITION_NFT] },
          permissions: PK_BOT.clientId ? { create: [{ botRoleId: `${PK_SERVER}-${PK_ROLE_DEANSLIST}` }] } : undefined,
        },
        {
          id: 'business-visa-pubkey',
          name: 'BUSINESS VISA',
          conditions: { create: [DL_CONDITION_BV] },
          permissions: PK_BOT.clientId ? { create: [{ botRoleId: `${PK_SERVER}-${PK_ROLE_DL_BV}` }] } : undefined,
        },
        {
          id: 'business-visa-expired-pubkey',
          name: 'BUSINESS VISA (EXPIRED)',
          conditions: { create: [DL_CONDITION_BV_EXP] },
          permissions: PK_BOT.clientId
            ? { create: [{ botRoleId: `${PK_SERVER}-${PK_ROLE_DL_BV_EXPIRED}` }] }
            : undefined,
        },
        {
          id: 'dean-holder-pubkey-shrimp',
          name: '$DEAN SHRIMP',
          conditions: { create: [DL_CONDITION_HOLDER_SHRIMP] },
          permissions: PK_BOT.clientId ? { create: [{ botRoleId: `${PK_SERVER}-${PK_ROLE_DL_HOLDER}` }] } : undefined,
        },
        {
          id: 'dean-holder-pubkey-dolphin',
          name: '$DEAN DOLPHIN',
          conditions: { create: [DL_CONDITION_HOLDER_DOLPHIN] },
          // permissions: PK_BOT.clientId ? { create: [{ botRoleId: `${PK_SERVER}-${PK_ROLE_DL_HOLDER}` }] } : undefined,
        },
        {
          id: 'dean-holder-pubkey-whale',
          name: '$DEAN WHALE',
          conditions: { create: [DL_CONDITION_HOLDER_WHALE] },
          // permissions: PK_BOT.clientId ? { create: [{ botRoleId: `${PK_SERVER}-${PK_ROLE_DL_HOLDER}` }] } : undefined,
        },
      ],
    },
  },
  {
    id: 'deanslist',
    name: "Dean's List",
    featured: true,
    enableSync: true,
    description: 'A DAO turned Network State',
    avatarUrl: 'https://avatars.githubusercontent.com/u/137821488?v=4',
    twitterUrl: 'https://twitter.com/deanslistDAO',
    websiteUrl: 'https://deanslist.services',
    bot: DL_BOT.clientId ? { create: DL_BOT } : undefined,
    roles: {
      create: [
        {
          id: 'one-of-us',
          name: 'One of Us',
          conditions: { create: [DL_CONDITION_NFT] },
          permissions: DL_BOT.clientId ? { create: [{ botRoleId: `${DL_SERVER}-${DL_ROLE_ONE_OF_US}` }] } : undefined,
        },
        {
          id: 'business-visa',
          name: 'Business Visa',
          conditions: { create: [DL_CONDITION_BV] },
          permissions: DL_BOT.clientId ? { create: [{ botRoleId: `${DL_SERVER}-${DL_ROLE_BV}` }] } : undefined,
        },
        {
          id: 'business-visa-expired',
          name: 'Business Visa (Expired)',
          conditions: { create: [DL_CONDITION_BV_EXP] },
          permissions: DL_BOT.clientId ? { create: [{ botRoleId: `${DL_SERVER}-${DL_ROLE_BV_EXPIRED}` }] } : undefined,
        },
        {
          id: 'dean-holder',
          name: 'DEAN Holder',
          conditions: { create: [{ ...DL_CONDITION_HOLDER_SHRIMP, amountMax: '' }] },
          permissions: DL_BOT.clientId ? { create: [{ botRoleId: `${DL_SERVER}-${DL_ROLE_HOLDER}` }] } : undefined,
        },
      ],
    },
    members: {
      create: [
        { user: { connect: { id: 'alice' } }, admin: true },
        { user: { connect: { id: 'bob' } }, admin: false },
      ],
    },
  },
  {
    name: 'Marinade',
    description: 'A DAO with a staking protocol built on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/81361338?v=4',
    websiteUrl: 'https://marinade.finance',
    twitterUrl: 'https://twitter.com/MarinadeFinance',
    githubUrl: 'https://githun.com/marinade-finance',
    members: {
      create: [
        { user: { connect: { id: 'alice' } }, admin: true },
        { user: { connect: { id: 'bob' } }, admin: false },
      ],
    },
    roles: {
      create: [
        {
          name: 'MNDE Holders',
          conditions: {},
        },
        { name: 'MNDE Holders (Shark)' },
        { name: 'MNDE Holders (Whale)' },
      ],
    },
  },
  {
    id: 'legends-of-sol',
    name: 'Legends of SOL',
    featured: true,
    enableSync: true,
    description: 'A digital art project',
    twitterUrl: 'https://twitter.com/Legends_of_SOL',
    githubUrl: 'https://github.com/Legends-of-Sol',
    websiteUrl: 'https://legendsofsol.com',
    discordUrl: 'https://discord.gg/fzjvRCAT4g',
    avatarUrl:
      'https://waq26xbzlmlh6koszuoh5k3ttw4op5fp3teymntjv5drqlkxlepq.arweave.net/sCGvXDlbFn8p0s0cfqtznbjn9K_cyYY2aa9HGC1XWR8',
    members: {
      create: [
        { user: { connect: { id: 'alice' } }, admin: true },
        { user: { connect: { id: 'bob' } }, admin: false },
      ],
    },
    bot: LOS_BOT.clientId ? { create: LOS_BOT } : undefined,
    roles: {
      create: [
        {
          name: 'CERTIFIED LEGENDS',
          conditions: { create: [LOS_CONDITION_NFT] },
          permissions: LOS_BOT.clientId ? { create: { botRoleId: `${LOS_SERVER}-${LOS_ROLE_CERTIFIED}` } } : undefined,
        },
        {
          name: '$LEGEND HOLDER',
          conditions: { create: [LOG_CONDITION_FT] },
        },
      ],
    },
  },
]
