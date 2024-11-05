import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAdminFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { AdminIdentityUiTable, AuthUiIdentityCreateForm } from '@pubkey-link/web-identity-ui'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminUserDetailFeatureIdentities({ userId }: { userId: string }) {
  const { items, createIdentity, deleteIdentity, query, setIdentityVerified, syncIdentity } = useAdminFindManyIdentity({
    ownerId: userId,
  })

  if (query.isLoading) return <UiLoader />

  return (
    <UiStack>
      {items?.length ? (
        <AdminIdentityUiTable
          identities={items ?? []}
          deleteIdentity={deleteIdentity}
          setIdentityVerified={setIdentityVerified}
          syncIdentity={syncIdentity}
        />
      ) : (
        <UiInfo message="No identities found." />
      )}
      <Group justify="right">
        <Button
          onClick={() => {
            modals.open({
              title: 'Add Identity',
              children: <AuthUiIdentityCreateForm submit={createIdentity} />,
            })
          }}
        >
          Add Identity
        </Button>
      </Group>
    </UiStack>
  )
}
