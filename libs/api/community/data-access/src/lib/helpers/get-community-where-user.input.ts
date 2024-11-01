import { Prisma } from '@prisma/client'

import { UserFindManyCommunityInput } from '../dto/user-find-many-community.input'

export function getCommunityWhereUserInput(input: UserFindManyCommunityInput): Prisma.CommunityWhereInput {
  const where: Prisma.CommunityWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
