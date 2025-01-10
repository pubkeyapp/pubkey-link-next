import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { BotPlatform, getEnumOptions, UserCreateBotInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'

export function UserBotUiCreateForm({ submit }: { submit: (res: UserCreateBotInput) => Promise<boolean> }) {
  const form = useForm<UserCreateBotInput>({
    initialValues: {
      clientId: '',
      clientSecret: '',
      communityId: '',
      token: '',
      platform: BotPlatform.Discord,
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput
          required
          label="Client ID"
          description="Copy the CLIENT ID value from the OAuth2 section of your app."
          placeholder="123456789987654321"
          {...form.getInputProps('clientId')}
        />
        <TextInput
          required
          label="Client Secret"
          description="Copy the CLIENT SECRET value from OAuth2 section of your app."
          placeholder="ABCDEFGHIJKL-MNOPQRSTUVWXYZ"
          {...form.getInputProps('clientSecret')}
        />
        <TextInput
          required
          label="Token"
          description="Copy the TOKEN value from the Bot section of your app."
          placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ.12345.ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          {...form.getInputProps('token')}
        />

        <Select
          required
          label="Platform"
          placeholder="Select a platform"
          data={getEnumOptions(BotPlatform)}
          {...form.getInputProps('platform')}
        />

        <Group justify="right">
          <Button disabled={!form.isValid()} type="submit">
            Create
          </Button>
        </Group>
      </UiStack>
    </form>
  )
}
