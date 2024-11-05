import { Prisma } from '@prisma/client'
import { UserFindManyNetworkTokenInput } from '../dto/user-find-many-network-token.input'

export function getNetworkTokenWhereUserInput(
  filters: string[] = [],
  input: UserFindManyNetworkTokenInput,
): Prisma.NetworkTokenWhereInput {
  const where: Prisma.NetworkTokenWhereInput = {
    cluster: input.cluster ?? undefined,
    type: input.type ?? undefined,
  }

  if (filters.length) {
    where.account = { in: filters }
  } else if (input.username) {
    where.account = 'none'
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
