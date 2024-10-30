import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { NetworkTokenType } from '../entity/network-token-type.enum'

@InputType()
export class UserFindManyNetworkTokenInput extends PagingInput() {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field(() => NetworkTokenType, { nullable: true })
  type?: NetworkTokenType
  @Field({ nullable: true })
  search?: string
  @Field({ nullable: true })
  username?: string
}
