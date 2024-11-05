import { Button, Group } from '@mantine/core'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { useUserFindOneSnapshot } from '@pubkey-link/web-snapshot-data-access'
import { SnapshotUiItem } from '@pubkey-link/web-snapshot-ui'
import { UiBack, UiError, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { downloadJson } from './download-json'
import { UserSnapshotDetailOverviewTab } from './user-snapshot-detail-overview.tab'
import { UserSnapshotDetailSnapshotTab } from './user-snapshot-detail-snapshot.tab'

export function UserSnapshotDetailFeature() {
  const { snapshotId } = useParams<{ snapshotId: string }>() as { snapshotId: string }
  const { item, query } = useUserFindOneSnapshot({ snapshotId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Snapshot not found." />
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <SnapshotUiItem snapshot={item} />
        </Group>
        <Group>
          <AppUiDebugModal data={item} />
          <Button variant="light" onClick={() => downloadJson(item.name, item.data)}>
            Download JSON
          </Button>
        </Group>
      </UiGroup>
      <UiTabRoutes
        tabs={[
          { path: 'overview', label: 'Overview', element: <UserSnapshotDetailOverviewTab snapshotId={snapshotId} /> },
          { path: 'snapshot', label: 'Snapshot', element: <UserSnapshotDetailSnapshotTab snapshotId={snapshotId} /> },
        ]}
      />
    </UiStack>
  )
}
