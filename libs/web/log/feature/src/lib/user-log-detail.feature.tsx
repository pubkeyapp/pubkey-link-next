import { Group } from '@mantine/core'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { useUserFindOneLog } from '@pubkey-link/web-log-data-access'
import { UiBack, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserLogDetailOverviewTab } from './user-log-detail-overview.tab'

export function UserLogDetailFeature() {
  const { logId } = useParams<{ logId: string }>() as { logId: string }
  const { item, query } = useUserFindOneLog({ logId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Log not found." />
  }

  return (
    <UiPage
      title={<Group>{item.message}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <AppUiDebugModal data={item} />
        </Group>
      }
    >
      <UserLogDetailOverviewTab logId={logId} />
    </UiPage>
  )
}
