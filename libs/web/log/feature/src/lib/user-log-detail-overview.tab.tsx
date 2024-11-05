import { useUserFindOneLog } from '@pubkey-link/web-log-data-access'
import { UserUiItemById } from '@pubkey-link/web-user-ui'
import { UiCard, UiError, UiInfoItems, UiInfoTable, UiLoader } from '@pubkey-ui/core'

export function UserLogDetailOverviewTab({ logId }: { logId: string }) {
  const { item, query } = useUserFindOneLog({ logId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Log not found." />
  }
  const items: UiInfoItems = []
  if (item.identity?.ownerId) {
    items.unshift(['Identity Owner', <UserUiItemById userId={item.identity.ownerId} />])
  }
  if (item.userId) {
    items.unshift(['User', <UserUiItemById userId={item.userId} />])
  }

  return (
    <UiCard p={0}>
      <UiInfoTable items={items.filter(Boolean)} />
    </UiCard>
  )
}
