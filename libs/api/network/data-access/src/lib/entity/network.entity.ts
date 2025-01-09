import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { NetworkCluster } from './network-cluster.enum'
import { NetworkType } from './network-type.enum'

@ObjectType()
export class Network {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field(() => NetworkType)
  type!: NetworkType
  @Field()
  name!: string
  @Field()
  endpoint!: string
  @Field({ nullable: true })
  enableSync?: boolean
  @Field(() => [String], { nullable: true })
  voters?: string[]
}

@ObjectType()
export class NetworkPaging extends PagingResponse<Network>(Network) {}
