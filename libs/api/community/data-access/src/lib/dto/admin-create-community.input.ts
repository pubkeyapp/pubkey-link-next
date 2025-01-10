import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateCommunityInput {
  @Field()
  name!: string
}
