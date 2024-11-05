import { Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { ComponentType } from 'react'

export function UiEmptyState({
  icon: Icon,
  title,
  message,
}: {
  icon: ComponentType<{ color?: string; size: number }>
  title: string
  message: string
}) {
  return (
    <UiStack align={'center'}>
      <Text c="dimmed" fz="xl" fw="bold">
        <Icon size={48} />
      </Text>
      <Text fz="xl" fw="bold">
        {title}
      </Text>
      <Text fz="lg" c="dimmed">
        {message}
      </Text>
    </UiStack>
  )
}
