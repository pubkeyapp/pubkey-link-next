import { lazy } from 'react'

export const DevAdminRoutes = lazy(() => import('./lib/dev.routes'))
export const DevProfileRoutes = lazy(() => import('./lib/dev-profile.routes'))
