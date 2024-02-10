import { NetworkCluster, NetworkTokenType, NetworkType, Prisma } from '@prisma/client'
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getCollectionId } from './helpers/get-collection-id'

const heliusApiKey = process.env['HELIUS_API_KEY'] as string

export const provisionNetworks: Prisma.NetworkCreateInput[] = [
  {
    id: 'solana-devnet',
    name: 'Solana Devnet',
    cluster: NetworkCluster.SolanaDevnet,
    type: NetworkType.Solana,
    endpoint: `https://devnet.helius-rpc.com/?api-key=${heliusApiKey}`,
    tokens: {
      create: [
        {
          account: 'USDpAd229q7g9iByF8L8wvcpHLvymCswqHhryBfYbLg',
          program: TOKEN_2022_PROGRAM_ID.toString(),
          name: 'USDp',
          symbol: 'USDp',
          imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/pubkey-usdp/main/assets/usdp-logo.png',
          metadataUrl: 'https://raw.githubusercontent.com/pubkeyapp/pubkey-usdp/main/assets/usdp-metadata.json',
          type: NetworkTokenType.Fungible,
        },
      ],
    },
  },
  {
    id: 'solana-mainnet',
    name: 'Solana Mainnet',
    cluster: NetworkCluster.SolanaMainnet,
    type: NetworkType.Solana,
    endpoint: `https://mainnet.helius-rpc.com/?api-key=${heliusApiKey}`,
    tokens: {
      create: [
        //     {
        //       account: 'Gvj3urg4ZQYQ4BRQpA8SeAX6GhuvRbvfB3TVVEKeKBnb',
        //       name: 'BONKz',
        //       imageUrl: 'https://arweave.net/yoshlWpmwW6QFMx728x3DsTfh9YZoHUyMaPiSNLXIa0?ext=png',
        //       metadataUrl: 'https://arweave.net/8S2X-1Jw8eRgeydB2AijnySRpV530KsPGRjgnFepyVo',
        //       description: 'BONKz is a 15,000 collection, built FOR the community, BY the community.',
        //       symbol: 'BONKz',
        //     },
        //     {
        //       account: '6mszaj17KSfVqADrQj3o4W3zoLMTykgmV37W4QadCczK',
        //       name: 'Claynosaurz',
        //       imageUrl: 'https://nftstorage.link/ipfs/bafybeiese3bgyfewt2r3dxvgups2blc3rwh2utvidirxgxq527mhcv3ydy',
        //       metadataUrl: 'https://nftstorage.link/ipfs/bafkreihsaaak3rs7ps4plzjwbq6tgpfcbq5wtbldcmvm5z4b7wm57dwrv4',
        //       description: 'Claynosaurz is a collection of 10,000 3D animated NFTs.',
        //       symbol: 'DINO',
        //     },
        {
          type: NetworkTokenType.Fungible,
          account: 'FLUXBmPhT3Fd1EDVFdg46YREqHBeNypn1h4EbnTzWERX',
          program: TOKEN_2022_PROGRAM_ID.toString(),
          name: 'FluxBot',
          symbol: 'FLUXB',
          description: 'FluxBot - #1 Solana Telegram Bot',
          imageUrl: 'https://assets.coingecko.com/coins/images/33018/large/fluxbot.jpeg?1700193761',
          metadataUrl: 'https://bafkreido4e5mbufltt4yva6cpzxsep5pmjjd7jx7kuwzm5vlkor45hm5s4.ipfs.nftstorage.link/',
        },
        {
          type: NetworkTokenType.Fungible,
          account: 'CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo',
          program: TOKEN_2022_PROGRAM_ID.toString(),
          name: 'BonkEarn',
          symbol: 'BERN',
          imageUrl: 'https://assets.coingecko.com/coins/images/32946/large/bonkearn.jpeg?1699927347',
          metadataUrl: 'https://api.npoint.io/6276c0cc3ab046e9b770',
        },
        {
          account: 'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey',
          imageUrl: 'https://assets.coingecko.com/coins/images/18867/large/MNDE.png?1696518327',
          name: 'Marinade',
          program: TOKEN_PROGRAM_ID.toString(),
          symbol: 'MNDE',
          type: NetworkTokenType.Fungible,
        },
        {
          account: 'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a',
          imageUrl: 'https://arweave.net/TWUBda7cjVjugUjlstko7peZ_VOOO9vr1buVZ7eZNtg',
          metadataUrl: 'https://arweave.net/fyBeR-uJLzOshYZVnLVoY01bIQmAzC6u1wWM3tK-vsI',
          name: "Dean's List",
          program: TOKEN_PROGRAM_ID.toString(),
          symbol: 'DEAN',
          type: NetworkTokenType.Fungible,
        },
        {
          account: '5FusHaKEKjfKsmQwXNrhFcFABGGxu7iYCdbvyVSRe3Ri',
          description: 'Service DAO improving the Web3 ecosystem one feedback at a time.',
          imageUrl: 'https://shdw-drive.genesysgo.net/GQfWBgNh4GUM1Y7nRrx8MFiMoxDLcNDCpsptXYxbozAE/collection.png',
          metadataUrl: 'https://shdw-drive.genesysgo.net/GQfWBgNh4GUM1Y7nRrx8MFiMoxDLcNDCpsptXYxbozAE/collection.json',
          name: 'Deanslist',
          vault: 'JiZUwqz0ETakNYOIulut:CjYTP9jJVmCqnmdPf8tyafTHxTQtAjsFckVGZWMwprca',
          program: TOKEN_PROGRAM_ID.toString(),
          symbol: 'DEAN',
          type: NetworkTokenType.NonFungible,
        },
        {
          account: '9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp',
          imageUrl: 'https://updg8.com/imgdata/9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp',
          metadataUrl: 'https://updg8.com/jsondata/9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp',
          name: "Dean's List Business Visa",
          program: TOKEN_PROGRAM_ID.toString(),
          symbol: 'DLBV',
          type: NetworkTokenType.NonFungible,
        },
        //     {
        //       account: 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w',
        //       name: 'Mad Lads',
        //       imageUrl: 'https://madlads-collection.s3.us-west-2.amazonaws.com/_collection.png',
        //       metadataUrl: 'https://madlads-collection.s3.us-west-2.amazonaws.com/_collection.json',
        //       description: 'Fock it.',
        //       symbol: 'MAD',
        //     },
        //     {
        //       account: 'ABFpGsZBHdfsst5HoCdHXfV17eNEP6cQAFqpV3HApUYi',
        //       name: 'Namaste',
        //       imageUrl: 'https://nftstorage.link/ipfs/bafybeidxrfwp54ojypresrtrhujs6i7vzgbfn4j3t4fhvtedrvx3vsge3u',
        //       metadataUrl: 'https://nftstorage.link/ipfs/bafkreid3wbvnuhxdbiwbqaddgsudaysvz77agtsq3cesfjmnktapa34pzm',
        //       description:
        //         "Namaste is a declaration of love, a tribute to life, and a reminder that the most precious things in life are free: love, wisdom, and awareness. Solana Sensei's heartfelt messages are captured in 1,111 unique pieces, with whitelist spots handpicked by Solana Sensei himself.",
        //       symbol: 'LOVE',
        //     },
        //     {
        //       account: 'BuAYoZPVwQw4AfeEpHTx6iGPbQtB27W7tJUjgyLzgiko',
        //       name: 'Quekz',
        //       imageUrl: 'https://arweave.net/PodwZoOW65ZAlLPLP0o8iS_r5R_pePVYYk1gkF27HTY',
        //       metadataUrl: 'https://arweave.net/nv9A1-Jm9knFtZ1tKDO9M0oaNHhvDpEmLtLpomvWx2M',
        //       description: "it's just a duck, quek.",
        //       symbol: 'QKZ',
        //     },
        //     {
        //       account: 'SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W',
        //       name: 'SMB Gen2',
        //       imageUrl: 'https://arweave.net/lZ5FdIVagNoNvI4QFoHhB6Xyn4oVGLV9xOTW32WBC20',
        //       metadataUrl: 'https://arweave.net/2-0Ck8lwBTecPVKO2smJJmaZXFVd5VFqq8cd7WXR0BY',
        //       description:
        //         'SMB is a collection of 5000 randomly generated 24x24 pixels NFTs on the Solana Blockchain. Each SolanaMonkey is unique and comes with different type and attributes varying in rarity.',
        //       symbol: 'SMB',
        //     },
        //     {
        //       account: '8Rt3Ayqth4DAiPnW9MDFi63TiQJHmohfTWLMQFHi4KZH',
        //       name: 'SMB Gen3',
        //       imageUrl: 'https://nftstorage.link/ipfs/bafkreibtf35tniaqma43kvn5upi2e4qlroid56jxfm3nqtwjldrzaxrgtu',
        //       metadataUrl: 'https://bafkreic33udc4zn3tcx75qfmnro4u4ybxaxr7gwtapavukzw44jttygrkq.ipfs.nftstorage.link/',
        //       description:
        //         'SMB Gen3 is a collection of 15,000 visually stunning pixel art Monke NFTs crafted with love and passion. Express your unique web3 identity and join the thriving MonkeDAO community. Showcase your status as a true builder in web3 and be a part of the revolution with Solana Monke Business.',
        //       symbol: 'GEN3',
        //     },
        //     {
        //       account: '46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC',
        //       name: 'Saga genesis token',
        //       imageUrl: 'https://api.underdog-data.com/imgdata/46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC',
        //       metadataUrl: 'https://api.underdog-data.com/jsondata/46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC',
        //       description: ' ',
        //       symbol: 'SAGAGEN',
        //     },
      ].map((c) => ({
        ...c,
        id: getCollectionId(NetworkCluster.SolanaMainnet, c.account),
      })),
    },
  },
  {
    id: 'solana-local',
    name: 'Solana Local',
    cluster: NetworkCluster.SolanaCustom,
    type: NetworkType.Solana,
    endpoint: `http://localhost:8899`,
  },
]
