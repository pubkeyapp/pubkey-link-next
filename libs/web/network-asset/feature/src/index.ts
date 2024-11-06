import { lazy } from 'react'

export const AdminNetworkAssetFeature = lazy(() => import('./lib/admin-network-asset.routes'))
export const NetworkAssetDetailFeature = lazy(() => import('./lib/network-asset-detail-feature'))
export const UserNetworkAssetDetailFeature = lazy(() => import('./lib/user-network-asset-detail.feature'))
export const UserNetworkAssetFeature = lazy(() => import('./lib/user-network-asset-list.feature'))
