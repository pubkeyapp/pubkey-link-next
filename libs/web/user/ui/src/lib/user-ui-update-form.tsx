import { Button, Group } from '@mantine/core'
import { User, UserUpdateUserInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserUiUpdateForm({
  submit,
  user,
}: {
  submit: (res: UserUpdateUserInput) => Promise<boolean>
  user: User
}) {
  const model: UserUpdateUserInput & { username: string } = {
    username: user.username ?? '',
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    name: user.name ?? '',
    private: user.private ?? false,
  }

  const fields: UiFormField<UserUpdateUserInput & { username: string }>[] = [
    formFieldText('username', {
      label: 'Username',
      disabled: true,
      description: 'Your username is synchronized with your Discord identity.',
    }),
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateUserInput).then((res) => !!res)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
