import { Switch } from '@mantine/core'
import { User, UserUpdateUserInput } from '@pubkey-link/sdk'
import { toastInfo } from '@pubkey-ui/core'

export function UserUiToggleDeveloperMode({
  user,
  updateUser,
}: {
  user: User
  updateUser: (input: UserUpdateUserInput) => Promise<User | boolean>
}) {
  return (
    <Switch
      label="Developer Mode"
      description="Developer Mode exposes debug buttons helpful for people developing and testing the platform."
      checked={user?.developer ?? false}
      onChange={(e) =>
        updateUser({ developer: e.target.checked }).then((res) => {
          if (typeof res === 'boolean') {
            return
          }
          toastInfo(`Developer mode ${res.developer ? 'enabled' : 'disabled'}`)
        })
      }
    />
  )
}
