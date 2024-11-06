import { Route, Routes } from 'react-router-dom'
import { UserListFeature } from './user-list-feature'

export default function UserListRoutes() {
  return (
    <Routes>
      <Route index element={<UserListFeature />} />
    </Routes>
  )
}
