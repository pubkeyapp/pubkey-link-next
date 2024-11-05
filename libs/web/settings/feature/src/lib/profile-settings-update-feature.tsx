import { UserUpdateUserInput } from '@pubkey-link/sdk'
import { useUserProfile } from '@pubkey-link/web-user-data-access'
import { UserUiToggleDeveloperMode, UserUiTogglePrivateMode, UserUiUpdateForm } from '@pubkey-link/web-user-ui'
import { UiCard, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'

export default function ProfileSettingsUpdateFeature() {
  const { isLoading, updateUser, user } = useUserProfile()

  if (isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }

  function submit(input: UserUpdateUserInput) {
    return updateUser(input).then((res) => !!res)
  }
  return (
    <UiCard title="Settings">
      <UiStack>
        <UserUiToggleDeveloperMode user={user} updateUser={(input) => updateUser(input).then((res) => res ?? false)} />
        <UserUiTogglePrivateMode user={user} updateUser={(input) => updateUser(input).then((res) => res ?? false)} />
        <UserUiUpdateForm user={user} submit={(input) => updateUser(input).then((res) => !!res)} />
      </UiStack>
    </UiCard>
  )
}
