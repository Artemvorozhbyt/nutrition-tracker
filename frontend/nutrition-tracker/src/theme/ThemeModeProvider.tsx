import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import type { PaletteMode } from '@mui/material'
import { safeLocalStorage } from '../utils/storage'
import { createAppTheme } from './createAppTheme'
import { ThemeModeContext } from './ThemeModeContext'
import type { ThemeModeContextValue, ThemePreference } from './ThemeModeContext'

const themePreferenceKey = 'nutrition-tracker.theme-preference'

function readThemePreference(): ThemePreference {
  const storedValue = safeLocalStorage.getItem(themePreferenceKey)

  if (
    storedValue === 'light' ||
    storedValue === 'dark' ||
    storedValue === 'system'
  ) {
    return storedValue
  }

  return 'system'
}

function resolveThemeMode(
  preference: ThemePreference,
  prefersDarkMode: boolean,
): PaletteMode {
  if (preference === 'system') {
    return prefersDarkMode ? 'dark' : 'light'
  }

  return preference
}

type AppThemeProviderProps = {
  children: ReactNode
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [preference, setPreferenceState] =
    useState<ThemePreference>(readThemePreference)

  const mode = resolveThemeMode(preference, prefersDarkMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  const setPreference = useCallback((nextPreference: ThemePreference) => {
    safeLocalStorage.setItem(themePreferenceKey, nextPreference)
    setPreferenceState(nextPreference)
  }, [])

  const toggleMode = useCallback(() => {
    setPreference(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setPreference])

  const contextValue = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      preference,
      setPreference,
      toggleMode,
    }),
    [mode, preference, setPreference, toggleMode],
  )

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
