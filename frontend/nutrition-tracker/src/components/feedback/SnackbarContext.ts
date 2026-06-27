import { createContext } from 'react'
import type { AlertColor } from '@mui/material'

export type ShowSnackbarOptions = {
  autoHideDuration?: number
  message: string
  severity?: AlertColor
}

export type SnackbarContextValue = {
  showSnackbar: (options: ShowSnackbarOptions) => void
}

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined,
)
