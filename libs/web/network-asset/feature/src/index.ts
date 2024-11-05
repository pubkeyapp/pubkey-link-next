import { lazy } from 'react'

export const UserNetworkAssetFeature = lazy(() => import('./lib/user-network-asset-list.feature'))
export const UserNetworkAssetDetailFeature = lazy(() => import('./lib/user-network-asset-detail.feature'))

export const AdminNetworkAssetFeature = lazy(() => import('./lib/admin-network-asset.routes'))

export const NetworkAssetDetailFeature = lazy(() => import('./lib/network-asset-detail-feature'))
