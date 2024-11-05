import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { IconBug } from '@tabler/icons-react'
import { AppUiDebug } from './app-ui-debug'

export function handleDebugModalClick({ data, title }: { data: string | unknown; title?: string }) {
  return modals.open({
    size: 'lg',
    title: title ?? 'Debug',
    children: <AppUiDebug data={data} open hideButton />,
  })
}

export function AppUiDebugModal({
  data,
  title,
  ...props
}: ActionIconProps & { data: string | unknown; title?: string }) {
  const { user } = useAuth()
  if (!user?.developer) {
    return null
  }
  return (
    <Tooltip label="Show debug data">
      <ActionIcon
        color="brand"
        variant="light"
        size="sm"
        onClick={() => handleDebugModalClick({ data, title })}
        {...props}
      >
        <IconBug size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
