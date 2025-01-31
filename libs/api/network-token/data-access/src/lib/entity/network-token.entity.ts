import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { NetworkTokenType } from './network-token-type.enum'

@ObjectType()
export class NetworkToken {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => NetworkTokenType)
  type!: NetworkTokenType
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  account!: string
  @Field()
  name!: string
  @Field()
  program!: string
  @Field(() => [String], { nullable: true })
  mintList?: string[]
  @Field({ nullable: true })
  imageUrl?: string | null
  @Field({ nullable: true })
  metadataUrl?: string | null
  @Field({ nullable: true })
  description?: string | null
  @Field({ nullable: true })
  symbol?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  raw?: Prisma.JsonValue | null
}

@ObjectType()
export class NetworkTokenPaging extends PagingResponse<NetworkToken>(NetworkToken) {}
