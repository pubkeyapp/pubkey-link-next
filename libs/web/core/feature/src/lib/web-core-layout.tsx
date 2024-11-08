import { ActionIcon, Box, Group, Tooltip, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { AppLogo, AppUiHeader, AppUiThemeSwitch } from '@pubkey-link/web-core-ui'
import { UiAvatar, UiLoader } from '@pubkey-ui/core'
import { IconLogout, IconShield } from '@tabler/icons-react'
import { ReactNode, Suspense } from 'react'
import { Link } from 'react-router-dom'

export function WebCoreLayout({ children }: { children: ReactNode }) {
  const { isAdmin, user, logout } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <Box>
      <AppUiHeader
        logoSmall={<AppLogo height={28} />}
        logo={<AppLogo height={28} />}
        opened={opened}
        toggle={toggle}
        links={[]}
        profile={
          <Group gap="xs" wrap="nowrap">
            <AppUiThemeSwitch />
            {isAdmin && (
              <Tooltip label={'Admin Dashboard'} withArrow position="top">
                <ActionIcon component={Link} to="/admin" variant="light" size="lg">
                  <IconShield />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label={'Logout'} withArrow position="top">
              <ActionIcon onClick={logout} variant="light" size="lg">
                <IconLogout />
              </ActionIcon>
            </Tooltip>
            <UnstyledButton component={Link} to={user?.profileUrl ?? ''}>
              <UiAvatar
                url={user?.avatarUrl}
                name={`${user?.username}`}
                alt={user?.username ?? 'User Avatar'}
                radius={100}
                size={34}
              />
            </UnstyledButton>
          </Group>
        }
      />

      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </Box>
  )
}
