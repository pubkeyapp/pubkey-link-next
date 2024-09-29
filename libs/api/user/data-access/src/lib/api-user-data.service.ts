import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { PubKeyIdentityProvider } from '@pubkey-program-library/anchor'
import { UserPaging } from './entity/user.entity'

@Injectable()
export class ApiUserDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.UserUncheckedCreateInput) {
    return this.core.data.user.create({ data: input })
  }

  async delete(userId: string) {
    await this.findOne(userId)
    const deleted = await this.core.data.user.delete({ where: { id: userId } })
    return !!deleted
  }

  async findMany({ limit = 10, page = 1, ...input }: Prisma.UserFindManyArgs & PagingInputFields): Promise<UserPaging> {
    return this.core.data.user
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(userId: string) {
    const found = await this.core.data.user.findUnique({ where: { id: userId }, include: { identities: true } })
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async findOneByUsername(username: string) {
    const found = await this.core.data.user.findUnique({
      where: { username },
      include: {
        identities: {
          orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
          select: {
            id: true,
            name: true,
            profile: true,
            provider: true,
            providerId: true,
            verified: true,
          },
        },
      },
    })
    if (!found) {
      throw new Error(`User ${username} not found`)
    }
    return found
  }

  async update(userId: string, input: Prisma.UserUpdateInput) {
    return this.core.data.user.update({ where: { id: userId }, data: input })
  }

  async ensureUsername(username: string): Promise<boolean> {
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (exists) {
      throw new Error(`User ${username} already exists`)
    }
    return true
  }

  async verify(userId: string) {
    const found = await this.findOne(userId)
    if (!found.identities.length) {
      throw new Error(`Can't verify a user without identities`)
    }
    let foundPubkeyProfile = null
    for (const identity of found.identities) {
      console.log(`Checking ${identity.provider} ${identity.providerId}`)
      foundPubkeyProfile = await this.core.protocol.getProfileByProvider({
        provider: identity.provider as PubKeyIdentityProvider,
        providerId: identity.providerId,
      })
      if (foundPubkeyProfile) {
        console.log(`We found one, we break!`)
        break
      }
    }
    if (foundPubkeyProfile) {
      if (found.pubkeyProfile !== foundPubkeyProfile.publicKey.toString()) {
        const updated = await this.core.data.user.update({
          where: { id: found.id },
          data: { pubkeyProfile: foundPubkeyProfile.publicKey.toString() },
        })

        console.log(`Updated ${updated.username}, attached pubkey profile ${updated.pubkeyProfile}`)
      }
    }
    return true
  }
}
