import type { ReactNode } from 'react'
import { QueryProvider } from './QueryProvider'
import { AuthProvider } from '../../features/auth/context/AuthProvider'
import { SnackbarProvider } from '../../components/feedback/SnackbarProvider'
import { AppThemeProvider } from '../../theme/ThemeModeProvider'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppThemeProvider>
      <SnackbarProvider>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </SnackbarProvider>
    </AppThemeProvider>
  )
}
