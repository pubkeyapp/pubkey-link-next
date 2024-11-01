import { AnchorProvider } from '@coral-xyz/anchor'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import {
  PUBKEY_PROFILE_PROGRAM_ID,
  PubKeyIdentityProvider,
  PubKeyPointer,
  PubKeyProfile,
} from '@pubkey-program-library/anchor'
import { AnchorKeypairWallet, GetProfileByUsername, PubKeyProfileSdk } from '@pubkey-program-library/sdk'
import { GetProfileByProvider } from '@pubkey-program-library/sdk/src/lib/pubkey-profile-sdk'
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { ApiCoreConfigService } from '../config/api-core-config.service'

function isValidProvider(provider: string): boolean {
  return Object.values(PubKeyIdentityProvider).includes(provider as PubKeyIdentityProvider)
}

@Injectable()
export class ApiCoreProtocolService implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreProtocolService.name)
  private feePayer: Keypair | undefined
  private connection: Connection | undefined
  private sdk: PubKeyProfileSdk | undefined

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

    this.feePayer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(this.config.pubkeyProtocolFeePayer)))
    this.connection = new Connection(this.config.pubkeyProtocolEndpoint, 'confirmed')
    this.logger.verbose(`PubKey Protocol: Endpoint: ${this.config.pubkeyProtocolEndpoint}`)
    const balance = await this.connection.getBalance(this.feePayer.publicKey)
    this.logger.verbose(
      `PubKey Protocol: Fee payer: ${this.feePayer.publicKey}, balance: ${balance / LAMPORTS_PER_SOL}`,
    )
    this.sdk = new PubKeyProfileSdk({
      connection: this.connection,
      programId: PUBKEY_PROFILE_PROGRAM_ID,
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

  async getProfileByProvider(options: GetProfileByProvider): Promise<PubKeyProfile | null> {
    if (!isValidProvider(options.provider)) {
      throw new Error(`Invalid provider: ${options.provider}`)
    }
    return this.ensureSdk().getProfileByProviderNullable(options)
  }

  async getProfileByUsername(options: GetProfileByUsername): Promise<PubKeyProfile | null> {
    return this.ensureSdk().getProfileByUsernameNullable(options)
  }

  async getProfiles(): Promise<PubKeyProfile[]> {
    return this.ensureSdk().getProfiles()
  }

  getProviders() {
    return Object.values(PubKeyIdentityProvider)
  }

  async getPointers(): Promise<PubKeyPointer[]> {
    return this.ensureSdk().getPointers()
  }
}
