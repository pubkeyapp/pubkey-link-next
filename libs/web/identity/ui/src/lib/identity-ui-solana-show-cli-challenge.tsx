import { Box, Card, Text } from '@mantine/core'
import { UiCopy, UiGroup, UiStack } from '@pubkey-ui/core'

export function IdentityUiSolanaShowCliChallenge({ challenge }: { challenge: string }) {
  const message = `solana sign-offchain-message \\
  ${challenge} \\
  -k ~/path/to/validator-keypair.json`
  return (
    <UiStack>
      <UiGroup>
        <Text>Run the following command to sign the message.</Text>
        <UiCopy text={message} tooltip="Copy command" />
      </UiGroup>
      <Card withBorder>
        <Box component="pre" my={0} py={0}>
          {message}
        </Box>
      </Card>
    </UiStack>
  )
}
