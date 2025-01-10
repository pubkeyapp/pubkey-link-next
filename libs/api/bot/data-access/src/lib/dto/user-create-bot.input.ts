import { Field, InputType } from '@nestjs/graphql'
import { BotPlatform } from '../entity/bot-platform.enum'

@InputType()
export class UserCreateBotInput {
  @Field()
  token!: string
  @Field()
  clientId!: string
  @Field()
  clientSecret!: string
  @Field()
  communityId!: string
  @Field(() => BotPlatform)
  platform!: BotPlatform
}
