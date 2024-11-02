import { AdminFindManyNetworkAssetInput, NetworkCluster } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCluster = NetworkCluster.SolanaMainnet
// TODO: Figure out how to test this
// We depend on Solana Network state to be able to test this

xdescribe('api-network-asset-feature', () => {
  describe('api-network-asset-admin-resolver', () => {
    let networkAssetId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
    })

    describe('authorized', () => {
      it('should find a list of networkAssets (find all)', async () => {
        const input: AdminFindManyNetworkAssetInput = {
          cluster: defaultCluster,
        }

        const res = await sdk.adminFindManyNetworkAsset({ input }, { cookie: alice })
        networkAssetId = res.data.paging.data[0].id ?? 'test'
        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(networkAssetId)
      })

      it('should find a list of networkAssets (find new one)', async () => {
        const input: AdminFindManyNetworkAssetInput = {
          cluster: defaultCluster,
          search: networkAssetId,
        }

        const res = await sdk.adminFindManyNetworkAsset({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(networkAssetId)
      })

      it('should find a network-asset by id', async () => {
        const res = await sdk.adminFindOneNetworkAsset({ networkAssetId }, { cookie: alice })

        expect(res.data.item.id).toBe(networkAssetId)
      })

      it('should delete a network-asset', async () => {
        const res = await sdk.adminDeleteNetworkAsset({ networkAssetId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyNetworkAsset(
          { input: { cluster: defaultCluster, search: networkAssetId } },
          { cookie: alice },
        )
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not find a list of networkAssets (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyNetworkAsset(
            {
              input: {
                cluster: defaultCluster,
              },
            },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a network-asset by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneNetworkAsset({ networkAssetId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a network-asset', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteNetworkAsset({ networkAssetId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
