import { Accordion, Grid, NavLink } from '@mantine/core'
import { Community, Role } from '@pubkey-link/sdk'
import { useAdminFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { useAdminFindManyRole, useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import {
  RoleConditionUiCreateWizard,
  RoleConditionUiItem,
  RoleConditionUiPanel,
  RoleUiItem,
} from '@pubkey-link/web-role-ui'
import { UiCard, UiCardTitle, UiError, UiInfo, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { Link, useLocation, useParams, useRoutes } from 'react-router-dom'

export function DevConditionWizardDetail() {
  const { communityId } = useParams() as { communityId: string }
  const { item: community } = useAdminFindOneCommunity({ communityId })
  const { items: roles, query } = useAdminFindManyRole({ communityId })

  if (!community) {
    return <UiError message={`Community ${communityId} not found`} />
  }

  return (
    <UiStack>
      <UiCard>
        <CommunityUiItem community={community} />
      </UiCard>
      {query.isLoading ? (
        <UiLoader />
      ) : query.data ? (
        <DevConditionWizardDetailGrid community={community} roles={roles} />
      ) : (
        <UiWarning title="No communities found" message="Please create a community first." />
      )}
    </UiStack>
  )
}

export function DevConditionWizardDetailGrid({ community, roles }: { community: Community; roles: Role[] }) {
  const { pathname } = useLocation()
  const routes = useRoutes([
    { path: '', element: <UiInfo message="Select a role to continue" /> },
    { path: ':roleId', element: <RoleDetails community={community} /> },
  ])

  return (
    <Grid>
      <Grid.Col span={3}>
        <UiCard>
          <UiStack>
            {roles.map((role) => (
              <NavLink
                active={pathname.includes('/' + role.id)}
                component={Link}
                key={role.id}
                label={<RoleUiItem role={role} />}
                to={role.id}
                variant="light"
              />
            ))}
          </UiStack>
        </UiCard>
      </Grid.Col>
      <Grid.Col span={9}>{routes}</Grid.Col>
    </Grid>
  )
}

function RoleDetails({ community }: { community: Community }) {
  const { roleId } = useParams() as { roleId: string }
  const { item: role, query } = useUserFindOneRole({ roleId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!role) {
    return <UiError message={`Role ${roleId} not found`} />
  }

  return (
    <UiStack>
      <UiCard>
        <UiCardTitle>Conditions</UiCardTitle>
      </UiCard>
      <RoleConditionUiCreateWizard role={role} community={community} />
      {role.conditions?.length ? (
        <Accordion multiple variant="separated">
          {role.conditions.map((condition) => (
            <Accordion.Item key={condition.id} value={condition.id}>
              <Accordion.Control>
                <RoleConditionUiItem type={condition.type} />
              </Accordion.Control>
              <Accordion.Panel>
                <RoleConditionUiPanel condition={condition} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <UiInfo message="No conditions found" />
      )}
    </UiStack>
  )
}
