import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import { paths } from './paths'

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={paths.login} />
  }

  return <Outlet />
}
