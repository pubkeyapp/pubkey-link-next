import { Button, Group } from '@mantine/core'
import { AdminCreateCommunityInput, NetworkCluster } from '@pubkey-link/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { useDefaultFormCluster } from './use-default-form-cluster'

export function AdminCommunityUiCreateForm({
  clusters = [],
  submit,
}: {
  clusters: NetworkCluster[]
  submit: (res: AdminCreateCommunityInput) => Promise<boolean>
}) {
  const cluster = useDefaultFormCluster(clusters)
  const model: AdminCreateCommunityInput = {
    cluster,
    avatarUrl: '',
    description: '',
    discordUrl: '',
    githubUrl: '',
    name: '',
    telegramUrl: '',
    twitterUrl: '',
    websiteUrl: '',
  }

  const fields: UiFormField<AdminCreateCommunityInput>[] = [
    formFieldSelect('cluster', {
      label: 'Cluster',
      required: true,
      options: clusters?.map((value) => ({ value, label: value })),
    }),
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('description', { label: 'Description' }),
    formFieldText('avatarUrl', { label: 'Avatar Url' }),
    formFieldText('discordUrl', { label: 'Discord Url' }),
    formFieldText('githubUrl', { label: 'Github Url' }),
    formFieldText('telegramUrl', { label: 'Telegram Url' }),
    formFieldText('twitterUrl', { label: 'Twitter Url' }),
    formFieldText('websiteUrl', { label: 'Website Url' }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
