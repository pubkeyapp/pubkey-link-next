import { lazy } from 'react'

export const AdminUserFeature = lazy(() => import('./lib/admin-user.routes'))
export const UserListFeature = lazy(() => import('./lib/user-list.routes'))
export const UserProfileFeature = lazy(() => import('./lib/user-profile.routes'))
export const UserProfileRedirectFeature = lazy(() => import('./lib/user-profile.redirect'))
