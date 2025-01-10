import { useAdminFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminCommunityDetailOverviewTab({ communityId }: { communityId: string }) {
  const { item, query } = useAdminFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return <UiDebug data={item} open />
}
