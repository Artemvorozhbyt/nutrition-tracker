import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { AuthPlaceholderPage } from '../pages/AuthPlaceholderPage'
import { FeaturePlaceholderPage } from '../pages/FeaturePlaceholderPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'
import { paths, routeSegments } from './paths'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate replace to={paths.dashboard} />} path={paths.home} />

        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route
              element={<LoginPage />}
              path={routeSegments.login}
            />
            <Route
              element={<AuthPlaceholderPage mode="register" />}
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
              element={
                <FeaturePlaceholderPage
                  description="Search, pagination, create, edit, and delete flows will be wired to the existing product endpoints later."
                  title="Products"
                />
              }
              path={routeSegments.products}
            />
            <Route
              element={
                <FeaturePlaceholderPage
                  description="Meal listing and meal entry workflows are reserved for the backend API shape."
                  title="Meals"
                />
              }
              path={routeSegments.meals}
            />
            <Route
              element={
                <FeaturePlaceholderPage
                  description="Weight history, editing, deletion, and chart data will use the backend contract when supplied."
                  title="Weight"
                />
              }
              path={routeSegments.weight}
            />
            <Route
              element={
                <FeaturePlaceholderPage
                  description="Daily goal viewing and updates will be implemented only against the provided API."
                  title="Goals"
                />
              }
              path={routeSegments.goals}
            />
          </Route>
        </Route>

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}
