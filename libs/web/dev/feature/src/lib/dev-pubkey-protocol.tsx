import { Button, Group } from '@mantine/core'
import { UiIcon } from '@pubkey-link/web-core-ui'
import { toastSuccess, UiCard, UiDebug, UiGridRoute, UiGridRoutes, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconUsersGroup } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { DevPubkeyProtocolLoader } from './dev-pubkey-protocol-loader'
import { DevPubkeyProtocolProvider, useDevPubkeyProtocol } from './dev-pubkey-protocol-provider'

export function DevPubkeyProtocol() {
  const routes: UiGridRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      element: <Dashboard />,
      leftSection: <UiIcon type="dashboard" size={20} />,
    },
    {
      path: 'communities',
      label: 'Communities',
      element: (
        <Page title="Communities">
          <div>FOO</div>
        </Page>
      ),
      leftSection: <IconUsersGroup size={20} />,
    },
  ]
  return (
    <DevPubkeyProtocolLoader
      noConfig={<UiInfo title="No PubKey Protocol config" message="No PubKey Protocol config found in AppConfig." />}
      render={({ sdk, community, signer }) => (
        <DevPubkeyProtocolProvider community={community} sdk={sdk} signer={signer}>
          <UiGridRoutes basePath={`/admin/development/pubkey-protocol`} routes={routes} />
        </DevPubkeyProtocolProvider>
      )}
    />
  )
}

function Page({ children, title }: { children: ReactNode; title: ReactNode }) {
  return <UiCard title={title}>{children}</UiCard>
}

function Dashboard() {
  const { community, isLoading, sdk, signer } = useDevPubkeyProtocol()

  return isLoading ? (
    <UiLoader />
  ) : (
    <Page title="PubKey Protocol">
      <UiIcon type="dashboard" size={20} />
      <UiDebug data={{ community, isLoading, signer }} open />
      <UiStack>
        <Group justify="center">
          <Button onClick={() => toastSuccess('gm!')}>Click me!</Button>
        </Group>
      </UiStack>
    </Page>
  )
}
