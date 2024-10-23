import { AnchorProvider } from '@coral-xyz/anchor'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import {
  AnchorKeypairWallet,
  getKeypairFromByteArray,
  IdentityProvider,
  ProfileGetByProvider,
  ProfileGetByUsername,
  PUBKEY_PROTOCOL_PROGRAM_ID,
  PubKeyCommunity,
  PubKeyPointer,
  PubKeyProfile,
  PubkeyProtocolSdk,
} from '@pubkey-protocol/sdk'
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { ApiCoreConfigService } from '../config/api-core-config.service'

function isValidProvider(provider: string): boolean {
  return Object.values(IdentityProvider).includes(provider as IdentityProvider)
}

@Injectable()
export class ApiCoreProtocolService implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreProtocolService.name)
  private feePayer: Keypair | undefined
  private connection: Connection | undefined
  private sdk: PubkeyProtocolSdk | undefined

  constructor(private readonly config: ApiCoreConfigService) {}

  async onModuleInit() {
    if (
      !this.config.featurePubkeyProtocol ||
      !this.config.pubkeyProtocolCluster ||
      !this.config.pubkeyProtocolEndpoint ||
      !this.config.pubkeyProtocolFeePayer
    ) {
      return
    }

    this.feePayer = getKeypairFromByteArray(JSON.parse(this.config.pubkeyProtocolFeePayer))
    this.connection = new Connection(this.config.pubkeyProtocolEndpoint, 'confirmed')
    this.logger.verbose(`PubKey Protocol: Endpoint: ${this.config.pubkeyProtocolEndpoint}`)
    const balance = await this.connection.getBalance(this.feePayer.publicKey)
    this.logger.verbose(
      `PubKey Protocol: Fee payer: ${this.feePayer.publicKey}, balance: ${balance / LAMPORTS_PER_SOL}`,
    )
    this.sdk = new PubkeyProtocolSdk({
      connection: this.connection,
      programId: PUBKEY_PROTOCOL_PROGRAM_ID,
      provider: new AnchorProvider(this.connection, new AnchorKeypairWallet(this.feePayer), {
        commitment: this.connection.commitment,
      }),
    })
    this.logger.verbose(`PubKey Protocol: SDK Initialized`)
  }

  private ensureSdk() {
    if (!this.sdk) {
      throw new Error('PubKey SDK not initialized')
    }

    return this.sdk
  }

  async getCommunity(options: { community: string }): Promise<PubKeyCommunity> {
    return this.ensureSdk().communityGet(options)
  }

  async getCommunities(): Promise<PubKeyCommunity[]> {
    return this.ensureSdk().communityGetAll()
  }

  async getProfileByProvider(options: ProfileGetByProvider): Promise<PubKeyProfile | null> {
    if (!isValidProvider(options.provider)) {
      throw new Error(`Invalid provider: ${options.provider}`)
    }
    return this.ensureSdk().profileGetByProviderNullable(options)
  }

  async getProfileByUsername(options: ProfileGetByUsername): Promise<PubKeyProfile | null> {
    return this.ensureSdk().profileGetByUsernameNullable(options)
  }

  async getProfiles(): Promise<PubKeyProfile[]> {
    return this.ensureSdk().profileGetAll()
  }

  getProviders() {
    return Object.values(IdentityProvider)
  }

  async getPointers(): Promise<PubKeyPointer[]> {
    return this.ensureSdk().pointerGetAll()
  }
}
