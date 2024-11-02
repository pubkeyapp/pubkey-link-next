import { AdminCreateBotInput, Bot, UserCreateBotInput, UserUpdateBotInput } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCommunityId = 'pubkey'
const defaultInput: AdminCreateBotInput = {
  communityId: defaultCommunityId,
  clientId: 'pubkey',
  clientSecret: 'pubkey',
  token: 'pubkey',
}

// TODO: Figure out how to test this
// The challenge is that we're depending on Discord when creating a bot
// So we need to mock the Discord API when running the tests
xdescribe('api-bot-feature', () => {
  describe('api-bot-user-resolver', () => {
    let botId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
      const created = await sdk.userCreateBot({ input: defaultInput }, { cookie: alice })
      botId = created.data.created.id
    })

    describe('authorized', () => {
      it('should create a bot', async () => {
        const res = await sdk.userCreateBot({ input: defaultInput }, { cookie: alice })

        const item: Bot = res.data.created
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a bot', async () => {
        const createInput: UserCreateBotInput = defaultInput
        const createdRes = await sdk.userCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id
        const input: UserUpdateBotInput = defaultInput

        const res = await sdk.userUpdateBot({ botId, input }, { cookie: alice })

        const item: Bot = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a bot by id', async () => {
        const createInput: UserCreateBotInput = defaultInput
        const createdRes = await sdk.userCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id

        const res = await sdk.userFindOneBot({ communityId: defaultCommunityId }, { cookie: alice })

        expect(res.data.item.id).toBe(botId)
      })

      it('should delete a bot', async () => {
        const createInput: UserCreateBotInput = defaultInput
        const createdRes = await sdk.userCreateBot({ input: createInput }, { cookie: alice })
        const botId = createdRes.data.created.id

        const res = await sdk.userDeleteBot({ botId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindOneBot({ communityId: defaultCommunityId }, { cookie: alice })
        expect(findRes.data.item).toBeNull()
      })
    })

    describe('unauthorized', () => {
      it('should not create a bot', async () => {
        expect.assertions(1)
        const input: UserCreateBotInput = defaultInput

        try {
          await sdk.userCreateBot({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not update a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateBot({ botId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a bot by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneBot({ communityId: defaultCommunityId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteBot({ botId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})
