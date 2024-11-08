import { Button, Group } from '@mantine/core'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { AppLogo } from '@pubkey-link/web-core-ui'
import { UiAvatar, UiHeader, UiLayout, UiLoader } from '@pubkey-ui/core'
import { IconLogout } from '@tabler/icons-react'
import { ReactNode, Suspense } from 'react'

export function OnboardingLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <UiLayout
      styles={{ root: { height: '100%' }, main: { height: '100%' } }}
      header={
        <UiHeader
          logoSmall={<AppLogo height={28} />}
          logo={<AppLogo height={28} />}
          profile={
            <Group gap="xs">
              <Button variant="light" leftSection={<IconLogout size="0.9rem" stroke={1.5} />} onClick={logout}>
                Logout
              </Button>
              <UiAvatar
                url={user?.avatarUrl}
                name={`${user?.username}`}
                alt={user?.username ?? 'User Avatar'}
                radius={100}
                size={34}
              />
            </Group>
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
