import { Button, Group } from '@mantine/core'
import { UserCreateCommunityInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserCommunityUiCreateForm({ submit }: { submit: (res: UserCreateCommunityInput) => Promise<boolean> }) {
  const model: UserCreateCommunityInput = {
    name: '',
  }

  const fields: UiFormField<UserCreateCommunityInput>[] = [formFieldText('name', { label: 'Name', required: true })]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
