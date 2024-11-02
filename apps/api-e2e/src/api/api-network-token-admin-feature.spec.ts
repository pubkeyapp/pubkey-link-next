import {
  AdminCreateNetworkTokenInput,
  AdminFindManyNetworkTokenInput,
  AdminUpdateNetworkTokenInput,
  NetworkCluster,
  NetworkToken,
} from '@pubkey-link/sdk'
import { Keypair } from '@solana/web3.js'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

const defaultCluster = NetworkCluster.SolanaMainnet
function createNetworkTokenInput(account: string): AdminCreateNetworkTokenInput {
  return { cluster: defaultCluster, account }
}

// TODO: Figure out how we can test this:
//   we need to be able to create a 'token', but our logic checks if that exists on the network
//   ideally we either have a prepared local network or we can create a token on the fly

xdescribe('api-network-token-feature', () => {
  describe('api-network-token-admin-resolver', () => {
    const networkTokenAccount = Keypair.generate().publicKey.toBase58()
    let networkTokenId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
      const created = await sdk.adminCreateNetworkToken(
        { input: createNetworkTokenInput(networkTokenAccount) },
        { cookie: alice },
      )
      networkTokenId = created.data.created.id
    })

    describe('authorized', () => {
      it('should create a network-token', async () => {
        const input: AdminCreateNetworkTokenInput = createNetworkTokenInput(Keypair.generate().publicKey.toBase58())

        const res = await sdk.adminCreateNetworkToken({ input }, { cookie: alice })

        const item: NetworkToken = res.data.created
        expect(item.account).toBe(input.account)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a network-token', async () => {
        const createInput: AdminCreateNetworkTokenInput = createNetworkTokenInput(
          Keypair.generate().publicKey.toString(),
        )
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie: alice })
        const networkTokenId = createdRes.data.created.id
        const input: AdminUpdateNetworkTokenInput = {
          name: uniqueId('name'),
        }

        const res = await sdk.adminUpdateNetworkToken({ networkTokenId, input }, { cookie: alice })

        const item: NetworkToken = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of networkTokens (find all)', async () => {
        const createInput: AdminCreateNetworkTokenInput = createNetworkTokenInput(
          Keypair.generate().publicKey.toString(),
        )
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie: alice })
        const networkTokenId = createdRes.data.created.id

        const input: AdminFindManyNetworkTokenInput = {
          cluster: defaultCluster,
        }

        const res = await sdk.adminFindManyNetworkToken({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkTokenId)
      })

      it('should find a list of networkTokens (find new one)', async () => {
        const createInput: AdminCreateNetworkTokenInput = createNetworkTokenInput(
          Keypair.generate().publicKey.toString(),
        )
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie: alice })
        const networkTokenId = createdRes.data.created.id

        const input: AdminFindManyNetworkTokenInput = {
          cluster: defaultCluster,
          search: networkTokenId,
        }

        const res = await sdk.adminFindManyNetworkToken({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkTokenId)
      })

      it('should find a network-token by id', async () => {
        const createInput: AdminCreateNetworkTokenInput = createNetworkTokenInput(
          Keypair.generate().publicKey.toString(),
        )
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie: alice })
        const networkTokenId = createdRes.data.created.id

        const res = await sdk.adminFindOneNetworkToken({ networkTokenId }, { cookie: alice })

        expect(res.data.item.id).toBe(networkTokenId)
      })

      it('should delete a network-token', async () => {
        const createInput: AdminCreateNetworkTokenInput = createNetworkTokenInput(
          Keypair.generate().publicKey.toString(),
        )
        const createdRes = await sdk.adminCreateNetworkToken({ input: createInput }, { cookie: alice })
        const networkTokenId = createdRes.data.created.id

        const res = await sdk.adminDeleteNetworkToken({ networkTokenId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyNetworkToken(
          {
            input: {
              cluster: defaultCluster,
              search: networkTokenId,
            },
          },
          { cookie: alice },
        )
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not create a network-token', async () => {
        expect.assertions(1)
        const input: AdminCreateNetworkTokenInput = createNetworkTokenInput(Keypair.generate().publicKey.toString())

        try {
          await sdk.adminCreateNetworkToken({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a network-token', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateNetworkToken({ networkTokenId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of networkTokens (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyNetworkToken({ input: { cluster: defaultCluster } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a network-token by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneNetworkToken({ networkTokenId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a network-token', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteNetworkToken({ networkTokenId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
