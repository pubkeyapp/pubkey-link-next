import { Switch } from '@mantine/core'
import { User, UserUpdateUserInput } from '@pubkey-link/sdk'
import { toastInfo } from '@pubkey-ui/core'

export function UserUiTogglePrivateMode({
  user,
  updateUser,
}: {
  user: User
  updateUser: (input: UserUpdateUserInput) => Promise<User | boolean>
}) {
  return (
    <Switch
      label="Private Profile"
      description="Private Profile hides your profile from other users."
      checked={user?.private ?? false}
      onChange={(e) =>
        updateUser({ private: e.target.checked }).then((res) => {
          if (typeof res === 'boolean') {
            return
          }
          toastInfo(`Private profile ${res.private ? 'enabled' : 'disabled'}`)
        })
      }
    />
  )
}
