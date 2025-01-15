import { Container, Text, Title } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { ReactNode } from 'react'

export function BuyUiLayout({
  children,
  title = 'Buy Tokens on PubKey',
  description,
}: {
  children: ReactNode
  title?: string
  description: string
}) {
  return (
    <Container>
      <UiStack>
        <UiGroup>
          <Title>{title}</Title>
          <WalletMultiButton />
        </UiGroup>
        <Text c="dimmed">{description}</Text>
        {children}
      </UiStack>
    </Container>
  )
}
