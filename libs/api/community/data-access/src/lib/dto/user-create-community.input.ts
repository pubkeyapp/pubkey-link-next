import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateCommunityInput {
  @Field()
  name!: string
}
