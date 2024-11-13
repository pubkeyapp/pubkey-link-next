import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { SolanaNetworkAsset } from '@pubkey-link/api-network-data-access'
import { NetworkToken, NetworkTokenType } from '@pubkey-link/api-network-token-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { Role } from './role.entity'

@ObjectType()
export class RoleCondition {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => NetworkTokenType)
  type!: NetworkTokenType
  @Field({ nullable: true })
  amount?: string | null
  @Field({ nullable: true })
  amountMax?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.JsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  filters?: Prisma.JsonValue | null
  @Field({ nullable: true })
  token!: NetworkToken
  role?: Role | null
  @Field({ nullable: true })
  tokenId?: string | null
  @Field({ nullable: true })
  roleId?: string | null
  @Field(() => SolanaNetworkAsset, { nullable: true })
  asset?: SolanaNetworkAsset | null
  @Field({ nullable: true })
  valid?: boolean | null
}
