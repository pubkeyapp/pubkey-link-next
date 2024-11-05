import { AvatarProps, Group, type GroupProps, Text } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { useUserFindOneIdentity } from '@pubkey-link/web-identity-data-access'
import { UserUiItemById } from '@pubkey-link/web-user-ui'
import { type UiAnchorProps, UiLoader } from '@pubkey-ui/core'

export function IdentityUiItemById({
  provider,
  providerId,
  ...props
}: {
  provider: IdentityProvider
  providerId: string
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  to?: string | null
}) {
  const { query } = useUserFindOneIdentity({ provider, providerId })

  return query.isLoading ? (
    <UiLoader size="xs" type="dots" />
  ) : query.data?.item?.ownerId ? (
    <Group>
      <AppUiDebugModal data={query.data.item} />
      <UserUiItemById userId={query.data.item.ownerId} />
    </Group>
  ) : (
    <Text c="red">User not found</Text>
  )
}
