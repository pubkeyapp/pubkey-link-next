import { Button, Group } from '@mantine/core'
import { AdminCreateCommunityInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommunityUiCreateForm({
  submit,
}: {
  submit: (res: AdminCreateCommunityInput) => Promise<boolean>
}) {
  const model: AdminCreateCommunityInput = {
    name: '',
  }

  const fields: UiFormField<AdminCreateCommunityInput>[] = [formFieldText('name', { label: 'Name', required: true })]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
