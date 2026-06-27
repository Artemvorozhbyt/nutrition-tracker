import { createContext } from 'react'
import type { PaletteMode } from '@mui/material'

export type ThemePreference = PaletteMode | 'system'

export type ThemeModeContextValue = {
  mode: PaletteMode
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
  toggleMode: () => void
}

export const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined,
)
