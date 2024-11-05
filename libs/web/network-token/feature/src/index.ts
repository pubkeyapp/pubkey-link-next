import { lazy } from 'react'

export const AdminNetworkTokenFeature = lazy(() => import('./lib/admin-network-token.routes'))
export const UserNetworkTokenFeature = lazy(() => import('./lib/user-network-token.routes'))
