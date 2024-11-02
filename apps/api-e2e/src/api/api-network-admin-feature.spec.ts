import {
  AdminCreateNetworkInput,
  AdminFindManyNetworkInput,
  AdminUpdateNetworkInput,
  Network,
  NetworkCluster,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

const defaultInput: AdminCreateNetworkInput = {
  endpoint: 'http://localhost:8899',
  cluster: NetworkCluster.SolanaCustom,
  name: uniqueId('network'),
}

// TODO: Figure out how to test this
// We only allow 1 network per cluster so we want to clean up after each test
xdescribe('api-network-feature', () => {
  describe('api-network-admin-resolver', () => {
    let networkId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
      const created = await sdk.adminCreateNetwork({ input: defaultInput }, { cookie: alice })
      networkId = created.data.created.id
    })

    describe('authorized', () => {
      it('should update a network', async () => {
        const input: AdminUpdateNetworkInput = {
          name: uniqueId('network'),
        }

        const res = await sdk.adminUpdateNetwork({ networkId, input }, { cookie: alice })

        const item: Network = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of networks (find all)', async () => {
        const input: AdminFindManyNetworkInput = {}

        const res = await sdk.adminFindManyNetwork({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkId)
      })

      it('should find a list of networks (find new one)', async () => {
        const input: AdminFindManyNetworkInput = {
          search: networkId,
        }

        const res = await sdk.adminFindManyNetwork({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkId)
      })

      it('should find a network by id', async () => {
        const res = await sdk.adminFindOneNetwork({ networkId }, { cookie: alice })

        expect(res.data.item.id).toBe(networkId)
      })

      it('should delete a network', async () => {
        const res = await sdk.adminDeleteNetwork({ networkId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyNetwork({ input: { search: networkId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not create a network', async () => {
        expect.assertions(1)
        const input: AdminCreateNetworkInput = defaultInput

        try {
          await sdk.adminCreateNetwork({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a network', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateNetwork({ networkId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of networks (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyNetwork({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a network by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneNetwork({ networkId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a network', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteNetwork({ networkId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
