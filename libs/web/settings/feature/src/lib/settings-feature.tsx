import { Accordion } from '@mantine/core'
import { UiGrid } from '@pubkey-link/web-core-ui'
import { useUserProfile } from '@pubkey-link/web-user-data-access'
import {
  UserUiProfile,
  UserUiToggleDeveloperMode,
  UserUiTogglePrivateMode,
  UserUiUpdateForm,
} from '@pubkey-link/web-user-ui'
import { UiCardTitle, UiContainer, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { SettingsIdentityDiscordFeature } from './settings-identity-feature'
import { SettingsWalletsFeature } from './settings-wallets-feature'

export default function SettingsFeature() {
  const { updateUser, user, query } = useUserProfile()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found." />
  }

  return (
    <UiContainer>
      <UiStack>
        <UiGrid
          sidebar={
            <UiStack>
              <UserUiProfile user={user} />
            </UiStack>
          }
        >
          <Accordion multiple variant="separated" defaultValue={['profile', 'discord', 'wallets']}>
            <Accordion.Item value="profile">
              <Accordion.Control>
                <UiCardTitle>Profile</UiCardTitle>
              </Accordion.Control>
              <Accordion.Panel>
                <UserUiToggleDeveloperMode
                  user={user}
                  updateUser={(input) => updateUser(input).then((res) => res ?? false)}
                />
                <UserUiTogglePrivateMode
                  user={user}
                  updateUser={(input) => updateUser(input).then((res) => res ?? false)}
                />
                <UserUiUpdateForm user={user} submit={(input) => updateUser(input).then((res) => !!res)} />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="discord">
              <Accordion.Control>
                <UiCardTitle>Discord</UiCardTitle>
              </Accordion.Control>
              <Accordion.Panel>
                <SettingsIdentityDiscordFeature />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="wallets">
              <Accordion.Control>
                <UiCardTitle>Wallets</UiCardTitle>
              </Accordion.Control>
              <Accordion.Panel>
                <SettingsWalletsFeature />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </UiGrid>
      </UiStack>
    </UiContainer>
  )
}
