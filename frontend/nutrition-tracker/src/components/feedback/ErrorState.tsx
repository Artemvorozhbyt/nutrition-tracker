import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import type { ReactNode } from 'react'
import { Button } from '@mui/material'
import { EmptyState } from './EmptyState'

type ErrorStateProps = {
  actionLabel?: string
  description?: string
  onRetry?: () => void
  title?: string
}

export function ErrorState({
  actionLabel = 'Try again',
  description = 'Something went wrong while loading this section.',
  onRetry,
  title = 'Unable to load data',
}: ErrorStateProps) {
  const action: ReactNode = onRetry ? (
    <Button color="primary" onClick={onRetry} variant="contained">
      {actionLabel}
    </Button>
  ) : null

  return (
    <EmptyState
      action={action}
      description={description}
      icon={<ErrorOutlineOutlinedIcon />}
      title={title}
    />
  )
}
