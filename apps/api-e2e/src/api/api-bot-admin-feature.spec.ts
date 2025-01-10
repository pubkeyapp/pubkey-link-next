import { AdminCreateBotInput, AdminFindManyBotInput, AdminUpdateBotInput, Bot, BotPlatform } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCommunityId = 'pubkey'
const defaultInput: AdminCreateBotInput = {
  communityId: defaultCommunityId,
  clientId: 'pubkey',
  clientSecret: 'pubkey',
  token: 'pubkey',
  platform: BotPlatform.Discord,
}

// TODO: Figure out how to test this
// The challenge is that we're depending on Discord when creating a bot
// So we need to mock the Discord API when running the tests
xdescribe('api-bot-feature', () => {
  describe('api-bot-admin-resolver', () => {
    let botId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
      const created = await sdk.adminCreateBot({ input: defaultInput }, { cookie: alice })
      botId = created.data.created.id
    })

    describe('authorized', () => {
      it('should create a bot', async () => {
        const input: AdminCreateBotInput = defaultInput

        const res = await sdk.adminCreateBot({ input }, { cookie: alice })

        const item: Bot = res.data.created

        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a bot', async () => {
        const createInput: AdminCreateBotInput = defaultInput
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id
        const input: AdminUpdateBotInput = defaultInput

        const res = await sdk.adminUpdateBot({ botId, input }, { cookie: alice })

        const item: Bot = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of bots (find all)', async () => {
        const createInput: AdminCreateBotInput = defaultInput
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id

        const input: AdminFindManyBotInput = {
          communityId: defaultCommunityId,
        }

        const res = await sdk.adminFindManyBot({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(botId)
      })

      it('should find a list of bots (find new one)', async () => {
        const createInput: AdminCreateBotInput = defaultInput
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id

        const input: AdminFindManyBotInput = {
          communityId: defaultCommunityId,
          search: botId,
        }

        const res = await sdk.adminFindManyBot({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(botId)
      })

      it('should find a bot by id', async () => {
        const createInput: AdminCreateBotInput = defaultInput
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id

        const res = await sdk.adminFindOneBot({ botId }, { cookie: alice })

        expect(res.data.item.id).toBe(botId)
      })

      it('should delete a bot', async () => {
        const createInput: AdminCreateBotInput = defaultInput
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id

        const res = await sdk.adminDeleteBot({ botId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyBot(
          {
            input: {
              communityId: defaultCommunityId,
              search: botId,
            },
          },
          { cookie: alice },
        )
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not create a bot', async () => {
        expect.assertions(1)
        const input: AdminCreateBotInput = defaultInput

        try {
          await sdk.adminCreateBot({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateBot({ botId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of bots (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyBot({ input: { communityId: defaultCommunityId } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a bot by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneBot({ botId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteBot({ botId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
