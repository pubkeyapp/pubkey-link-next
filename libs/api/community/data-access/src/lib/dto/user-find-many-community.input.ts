import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api-core-data-access'

@InputType()
export class UserFindManyCommunityInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
  @Field({ nullable: true })
  withRoles?: boolean
}
