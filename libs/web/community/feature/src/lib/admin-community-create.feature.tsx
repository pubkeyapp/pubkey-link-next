import { AdminCreateCommunityInput, NetworkCluster } from '@pubkey-link/sdk'
import { useAdminFindManyCommunity } from '@pubkey-link/web-community-data-access'
import { AdminCommunityUiCreateForm } from '@pubkey-link/web-community-ui'
import { useUserGetEnabledNetworkClusters } from '@pubkey-link/web-network-data-access'
import { toastError, UiAlert, UiBack, UiCard, UiLoader, UiPage } from '@pubkey-ui/core'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminCommunityCreateFeature() {
  const navigate = useNavigate()
  const { createCommunity } = useAdminFindManyCommunity()
  const clusterQuery = useUserGetEnabledNetworkClusters()
  const clusters: NetworkCluster[] = useMemo(() => clusterQuery?.data?.clusters ?? [], [clusterQuery.data])

  async function submit(input: AdminCreateCommunityInput) {
    return createCommunity(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/communities/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }
  return (
    <UiPage leftAction={<UiBack />} title="Create Community">
      <UiCard>
        {clusterQuery.isLoading ? (
          <UiLoader />
        ) : clusters.length ? (
          <AdminCommunityUiCreateForm clusters={clusters} submit={submit} />
        ) : (
          <UiAlert message="No clusters enabled" />
        )}
      </UiCard>
    </UiPage>
  )
}
