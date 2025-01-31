import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateNetworkTokenInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  enableBuy?: boolean | null
}
