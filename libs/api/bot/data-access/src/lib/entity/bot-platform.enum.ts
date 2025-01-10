import { registerEnumType } from '@nestjs/graphql'
import { BotPlatform } from '@prisma/client'

export { BotPlatform }

registerEnumType(BotPlatform, { name: 'BotPlatform' })
