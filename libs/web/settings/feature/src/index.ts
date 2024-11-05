import { lazy } from 'react'

export const ProfileSettingsUpdateFeature = lazy(() => import('./lib/profile-settings-update-feature'))
export const ProfileSettingsIdentitiesFeature = lazy(() => import('./lib/profile-settings-identities-feature'))
export const SettingsFeature = lazy(() => import('./lib/settings-feature'))
