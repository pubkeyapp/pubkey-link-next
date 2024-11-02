import { AdminCreateRoleInput, AdminFindManyRoleInput, AdminUpdateRoleInput, Role } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

const defaultCommunityId = 'pubkey'

describe('api-role-feature', () => {
  describe('api-role-admin-resolver', () => {
    const roleName = uniqueId('acme-role')
    let roleId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
      const created = await sdk.adminCreateRole(
        {
          input: {
            communityId: defaultCommunityId,
            name: roleName,
          },
        },
        { cookie: alice },
      )
      roleId = created.data.created.id
    })

    describe('authorized', () => {
      it('should create a role', async () => {
        const input: AdminCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }

        const res = await sdk.adminCreateRole({ input }, { cookie: alice })

        const item: Role = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a role', async () => {
        const createInput: AdminCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.adminCreateRole({ input: createInput }, { cookie: alice })
        const roleId = createdRes.data.created.id
        const input: AdminUpdateRoleInput = {
          name: uniqueId('role'),
        }

        const res = await sdk.adminUpdateRole({ roleId, input }, { cookie: alice })

        const item: Role = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of roles (find all)', async () => {
        const input: AdminFindManyRoleInput = {
          communityId: defaultCommunityId,
        }

        const res = await sdk.adminFindManyRole({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
      })

      it('should find a list of roles (find new one)', async () => {
        const createInput: AdminCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.adminCreateRole({ input: createInput }, { cookie: alice })
        const roleId = createdRes.data.created.id

        const input: AdminFindManyRoleInput = {
          communityId: defaultCommunityId,
          search: roleId,
        }

        const res = await sdk.adminFindManyRole({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(roleId)
      })

      it('should find a role by id', async () => {
        const createInput: AdminCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.adminCreateRole({ input: createInput }, { cookie: alice })
        const roleId = createdRes.data.created.id

        const res = await sdk.adminFindOneRole({ roleId }, { cookie: alice })

        expect(res.data.item.id).toBe(roleId)
      })

      it('should delete a role', async () => {
        const createInput: AdminCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.adminCreateRole({ input: createInput }, { cookie: alice })
        const roleId = createdRes.data.created.id

        const res = await sdk.adminDeleteRole({ roleId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyRole(
          {
            input: {
              communityId: defaultCommunityId,
              search: roleId,
            },
          },
          { cookie: alice },
        )
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not create a role', async () => {
        expect.assertions(1)
        const input: AdminCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }

        try {
          await sdk.adminCreateRole({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a role', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateRole({ roleId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of roles (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyRole(
            {
              input: {
                communityId: defaultCommunityId,
              },
            },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a role by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneRole({ roleId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a role', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteRole({ roleId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
