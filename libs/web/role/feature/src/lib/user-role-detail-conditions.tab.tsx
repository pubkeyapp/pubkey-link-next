import { Community, Role } from '@pubkey-link/sdk'
import { RoleConditionUiCreateWizard } from '@pubkey-link/web-role-ui'
import { UserRoleConditionListFeature } from './user-role-condition-list.feature'

export function UserRoleDetailConditionsTab({ community, role }: { community: Community; role: Role }) {
  return role.conditions?.length ? (
    <UserRoleConditionListFeature role={role} community={community} />
  ) : (
    <RoleConditionUiCreateWizard role={role} community={community} />
  )
}
