import { Button } from '@mantine/core'
import { AdminCreateNetworkTokenInput, NetworkCluster } from '@pubkey-link/sdk'
import { UiAddressInput } from '@pubkey-link/web-core-ui'
import { useUserGetTokenMetadata } from '@pubkey-link/web-network-data-access'
import { useAdminFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { toastError, UiBack, UiCard, UiError, UiGroup, UiLoader, UiPage, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminNetworkTokenCreateFeature({ cluster }: { cluster: NetworkCluster }) {
  const navigate = useNavigate()
  const [account, setAccount] = useState<string>('')
  const { createNetworkToken } = useAdminFindManyNetworkToken({ cluster })

  async function submit(input: AdminCreateNetworkTokenInput) {
    return createNetworkToken(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
        setAccount('')
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Network Token">
      <UiCard>
        <UiStack>
          <UiAddressInput address={account} setAddress={setAccount} />
          {account ? (
            <AdminNetworkTokenUiTokenMetadata
              cluster={cluster}
              account={account}
              onClick={() => submit({ cluster, account })}
            />
          ) : null}
        </UiStack>
      </UiCard>
    </UiPage>
  )
}

function AdminNetworkTokenUiTokenMetadata({
  account,
  cluster,
  onClick,
}: {
  account: string
  cluster: NetworkCluster
  onClick: () => void
}) {
  const query = useUserGetTokenMetadata({ account, cluster })

  return query.isLoading ? (
    <UiLoader />
  ) : query.isError ? (
    <UiError message={query.error.message} />
  ) : query.data ? (
    <UiGroup>
      <NetworkTokenUiItem networkToken={query.data.result} cluster={cluster} />
      <Button onClick={onClick}>Add Token</Button>
    </UiGroup>
  ) : (
    <UiError message="No data" />
  )
}
