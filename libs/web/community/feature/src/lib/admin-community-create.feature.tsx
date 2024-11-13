import { AdminCreateCommunityInput } from '@pubkey-link/sdk'
import { useAdminFindManyCommunity } from '@pubkey-link/web-community-data-access'
import { AdminCommunityUiCreateForm } from '@pubkey-link/web-community-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminCommunityCreateFeature() {
  const navigate = useNavigate()
  const { createCommunity } = useAdminFindManyCommunity()

  async function submit(input: AdminCreateCommunityInput) {
    return createCommunity(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/communities/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }
  return (
    <UiPage leftAction={<UiBack />} title="Create Community">
      <UiCard>
        <AdminCommunityUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
