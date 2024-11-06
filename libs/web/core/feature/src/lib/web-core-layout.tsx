import { ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { AppLogo, UiHeaderProfile } from '@pubkey-link/web-core-ui'
import { UiHeader, UiHeaderLink, UiLayout, UiLoader } from '@pubkey-ui/core'
import { IconBug, IconSettings } from '@tabler/icons-react'
import { ReactNode, Suspense, useMemo } from 'react'
import { Link } from 'react-router-dom'

export function WebCoreLayout({ children }: { children: ReactNode }) {
  const { isAdmin, isDeveloper, user } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  const links: UiHeaderLink[] = useMemo(() => {
    const items: UiHeaderLink[] = [
      { link: `/u`, label: 'Profile' },
      { link: '/c', label: 'Communities' },
    ]
    if (isAdmin) {
      items.push({ link: '/admin', label: 'Admin' })
    }
    return items
  }, [isAdmin, user])
  return (
    <UiLayout
      header={
        <UiHeader
          logoSmall={<AppLogo height={28} />}
          logo={<AppLogo height={28} />}
          opened={opened}
          toggle={toggle}
          links={links}
          profile={
            <Group gap="xs">
              {isAdmin && isDeveloper && (
                <ActionIcon component={Link} to="/admin/development" variant="light" size="lg">
                  <IconBug />
                </ActionIcon>
              )}
              <ActionIcon component={Link} to="/settings" variant="light" size="lg">
                <IconSettings />
              </ActionIcon>
              <UiHeaderProfile />
            </Group>
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
