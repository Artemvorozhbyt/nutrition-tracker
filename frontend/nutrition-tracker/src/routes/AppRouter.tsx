
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { CompleteProfilePage } from '../features/auth/pages/CompleteProfilePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'
import { paths, routeSegments } from './paths'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { ProductsPage } from '../features/products/pages/ProductsPage'
import { MealsPage } from '../features/meals/pages/MealsPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { WeightPage } from '../features/weight/pages/WeightPage'
import { GoogleCallbackPage } from '../features/auth/pages/GoogleCallbackPage'
import { GoalsPage } from '../features/goals/pages/GoalsPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Navigate replace to={paths.dashboard} />}
          path={paths.home}
        />

        {/* Google callback must not be inside PublicOnlyRoute */}
        <Route
          element={<GoogleCallbackPage />}
          path={routeSegments.googleCallback}
        />

        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route
              element={<LoginPage />}
              path={routeSegments.login}
            />
            <Route
              element={<RegisterPage />}
              path={routeSegments.register}
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route
              element={<DashboardPage />}
              path={routeSegments.dashboard}
            />
            <Route
              element={<ProductsPage />}
              path={routeSegments.products}
            />
            <Route
              element={<MealsPage />}
              path={routeSegments.meals}
            />
            <Route
              element={<WeightPage />}
              path={routeSegments.weight}
            />
            <Route element={<GoalsPage />} path={routeSegments.goals} />
          </Route>

          <Route
            element={<CompleteProfilePage />}
            path={routeSegments.completeProfile}
          />
        </Route>

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}
                                                          