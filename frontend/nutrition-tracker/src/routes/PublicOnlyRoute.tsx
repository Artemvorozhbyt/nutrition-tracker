import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import { paths } from './paths'

export function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate replace to={paths.dashboard} />
  }

  return <Outlet />
}
