import { Button, Group } from '@mantine/core'
import { AdminUpdateNetworkTokenInput, NetworkToken } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminNetworkTokenUiUpdateForm({
  submit,
  networkToken,
}: {
  submit: (res: AdminUpdateNetworkTokenInput) => Promise<boolean>
  networkToken: NetworkToken
}) {
  const model: AdminUpdateNetworkTokenInput = {
    name: networkToken.name ?? '',
  }

  const fields: UiFormField<AdminUpdateNetworkTokenInput>[] = [formFieldText('name', { label: 'Name' })]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateNetworkTokenInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
