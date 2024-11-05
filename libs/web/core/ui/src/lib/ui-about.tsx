import { Alert, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { ComponentType, ReactNode } from 'react'

export function UiAbout({
  children,
  content,
  icon: Icon = IconInfoCircle,
  title,
}: {
  children?: ReactNode
  content: string | string[]
  icon?: ComponentType<{ size?: number }>
  title: string
}) {
  const lines = Array.isArray(content) ? content : [content]
  return (
    <Alert variant="light" color="gray" title={title} icon={<Icon />}>
      {lines.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
      {children}
    </Alert>
  )
}
