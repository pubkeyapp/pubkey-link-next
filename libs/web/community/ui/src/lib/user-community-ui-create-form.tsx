import { Button, Group } from '@mantine/core'
import { UserCreateCommunityInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserCommunityUiCreateForm({ submit }: { submit: (res: UserCreateCommunityInput) => Promise<boolean> }) {
  const model: UserCreateCommunityInput = {
    avatarUrl: '',
    description: '',
    discordUrl: '',
    githubUrl: '',
    name: '',
    telegramUrl: '',
    twitterUrl: '',
    websiteUrl: '',
  }

  const fields: UiFormField<UserCreateCommunityInput>[] = [
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
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
