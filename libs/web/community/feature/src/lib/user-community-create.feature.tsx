import { UserCreateCommunityInput } from '@pubkey-link/sdk'
import { useUserFindManyCommunity } from '@pubkey-link/web-community-data-access'
import { UserCommunityUiCreateForm } from '@pubkey-link/web-community-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserCommunityCreateFeature() {
  const navigate = useNavigate()
  const { createCommunity } = useUserFindManyCommunity()

  async function submit(input: UserCreateCommunityInput) {
    return createCommunity(input)
      .then((res) => {
        if (res) {
          navigate(`/c/${res?.id}`)
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
        <UserCommunityUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
