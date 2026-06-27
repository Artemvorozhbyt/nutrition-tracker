import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import type { AlertColor, SnackbarCloseReason } from '@mui/material'
import { SnackbarContext } from './SnackbarContext'
import type { ShowSnackbarOptions, SnackbarContextValue } from './SnackbarContext'

type SnackbarNotification = {
  autoHideDuration: number
  id: number
  message: string
  severity: AlertColor
}

type SnackbarProviderProps = {
  children: ReactNode
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [notification, setNotification] =
    useState<SnackbarNotification | null>(null)

  const showSnackbar = useCallback((options: ShowSnackbarOptions) => {
    setNotification({
      autoHideDuration: options.autoHideDuration ?? 4500,
      id: Date.now(),
      message: options.message,
      severity: options.severity ?? 'info',
    })
  }, [])

  const handleClose = useCallback(
    (_event: Event | React.SyntheticEvent, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return
      }

      setNotification(null)
    },
    [],
  )

  const contextValue = useMemo<SnackbarContextValue>(
    () => ({
      showSnackbar,
    }),
    [showSnackbar],
  )

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={notification?.autoHideDuration}
        key={notification?.id}
        onClose={handleClose}
        open={Boolean(notification)}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.severity ?? 'info'}
          variant="filled"
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
