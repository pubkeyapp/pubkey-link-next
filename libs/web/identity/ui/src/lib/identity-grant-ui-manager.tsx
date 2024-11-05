import { Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Identity, User, UserAddIdentityGrantInput, UserRemoveIdentityGrantInput } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { useUserFindManyUser } from '@pubkey-link/web-user-data-access'
import { UserUiAutocomplete } from '@pubkey-link/web-user-ui'
import { UiInfo, UiStack } from '@pubkey-ui/core'
import { IdentityGrantUiTable } from './identity-grant-ui-table'

export function IdentityGrantUiManager({
  item,
  addGrant,
  removeGrant,
}: {
  item: Identity
  addGrant: (input: UserAddIdentityGrantInput) => Promise<void>
  removeGrant: (input: UserRemoveIdentityGrantInput) => Promise<void>
}) {
  const { items, query, setSearch } = useUserFindManyUser({ limit: 10 })
  const hideUsers = [item.ownerId, ...(item.grants?.map((m) => m.granteeId) ?? [])]

  const users: User[] = items.map((item) => item) as User[]
  const filtered = users.filter((user) => !hideUsers.includes(user.id))
  const form = useForm<UserAddIdentityGrantInput>({
    initialValues: {
      provider: item.provider,
      providerId: item.providerId,
      granteeId: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit(addGrant)}>
      <UiStack>
        {item.grants?.length ? (
          <IdentityGrantUiTable removeGrant={removeGrant} grants={item.grants} />
        ) : (
          <UiInfo message="No grants found." />
        )}
        <UserUiAutocomplete
          label="Search for users to grant access to this identity."
          items={filtered}
          isLoading={query.isLoading}
          setSearch={setSearch}
          select={(user) => {
            if (user?.id) {
              form.setFieldValue('granteeId', user?.id)
            }
          }}
        />
        <Group justify="flex-end">
          <AppUiDebugModal data={item} />
          <Button type="submit" mt="md">
            Save
          </Button>
        </Group>
      </UiStack>
    </form>
  )
}
