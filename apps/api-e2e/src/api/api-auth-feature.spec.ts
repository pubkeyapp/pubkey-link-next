import { UserRole, UserStatus } from '@pubkey-link/sdk'
import { alice, bob } from '../fixtures'
import { getUserCookie } from '../support'

describe('api-auth-feature', () => {
  describe('api-auth-resolver', () => {
    describe('authorized', () => {
      it('should log in using alice (Admin)', async () => {
        const { user } = await getUserCookie(alice)
        delete user.createdAt
        delete user.updatedAt

        expect(user.id).toBe('alice')
        expect(user.username).toBe('alice')
        expect(user.name).toBe('alice')
        expect(user.role).toBe(UserRole.Admin)
        expect(user.status).toBe(UserStatus.Active)
        expect(user.developer).toBe(true)
        expect(user.profileUrl).toBe('/u/alice')
        expect(user.avatarUrl).toBeNull()
      })
      it('should log in using bob (User)', async () => {
        const { user } = await getUserCookie(bob)
        delete user.createdAt
        delete user.updatedAt

        expect(user.id).toBe('bob')
        expect(user.username).toBe('bob')
        expect(user.name).toBe('bob')
        expect(user.role).toBe(UserRole.User)
        expect(user.status).toBe(UserStatus.Active)
        expect(user.developer).toBe(false)
        expect(user.profileUrl).toBe('/u/bob')
        expect(user.avatarUrl).toBeNull()
      })
    })
  })
})
