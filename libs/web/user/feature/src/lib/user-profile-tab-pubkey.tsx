import { UiCard, UiDebug, UiStack } from '@pubkey-ui/core'

export default function UserProfileTabPubkey({ username }: { username: string }) {
  return (
    <UiCard title="Work in Progress">
      <UiStack>
        <UiDebug data={{ username }} open />
      </UiStack>
    </UiCard>
  )
}
