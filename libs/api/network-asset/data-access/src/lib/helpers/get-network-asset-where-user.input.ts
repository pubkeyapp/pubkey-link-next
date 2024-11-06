import { Prisma } from '@prisma/client'
import { UserFindManyNetworkAssetInput } from '../dto/user-find-many-network-asset.input'

export function getNetworkAssetWhereUserInput(
  identities: string[] = [],
  input: UserFindManyNetworkAssetInput,
): Prisma.NetworkAssetWhereInput {
  const where: Prisma.NetworkAssetWhereInput = {
    cluster: input.cluster ?? undefined,
    type: input.type ?? undefined,
    group: input.group ?? undefined,
    owner: { in: identities },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { group: { contains: input.search, mode: 'insensitive' } },
      { owner: { contains: input.search, mode: 'insensitive' } },
      { balance: { contains: input.search, mode: 'insensitive' } },
      { account: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
