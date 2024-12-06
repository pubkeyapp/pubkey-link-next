import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevAddressInput } from './dev-address-input'
import { DevBackup } from './dev-backup'
import { DevConditionWizard } from './dev-condition-wizard'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'
import { DevPubkeyProtocol } from './dev-pubkey-protocol'
import { DevTokenMetadata } from './dev-token-metadata'
import { DevUserAutocomplete } from './dev-user-autocomplete'

export default function DevRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        tabs={[
          { path: 'new', label: 'New', element: <DevNew /> },
          { path: 'pubkey-protocol', label: 'PubKey Protocol', element: <DevPubkeyProtocol /> },
          { path: 'address-input', label: 'Address Input', element: <DevAddressInput /> },
          { path: 'backup', label: 'Backup', element: <DevBackup /> },
          { path: 'condition-wizard', label: 'Condition Wizard', element: <DevConditionWizard /> },
          { path: 'identity-wizard', label: 'Identity Wizard', element: <DevIdentityWizard /> },
          { path: 'metadata', label: 'Metadata', element: <DevTokenMetadata /> },
          { path: 'user-autocomplete', label: 'User Autocomplete', element: <DevUserAutocomplete /> },
        ]}
      />
    </UiContainer>
  )
}
