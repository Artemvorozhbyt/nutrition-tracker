import type { ReactNode } from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const EmptyStateRoot = styled(Paper)(({ theme }) => ({
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  justifyContent: 'center',
  minHeight: 260,
  padding: theme.spacing(5),
  textAlign: 'center',
}))

const EmptyStateIcon = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  display: 'inline-flex',
  height: 56,
  justifyContent: 'center',
  width: 56,
}))

type EmptyStateProps = {
  action?: ReactNode
  description?: string
  icon?: ReactNode
  title: string
}

export function EmptyState({
  action,
  description,
  icon,
  title,
}: EmptyStateProps) {
  return (
    <EmptyStateRoot elevation={0}>
      {icon ? <EmptyStateIcon>{icon}</EmptyStateIcon> : null}
      <Stack spacing={0.75}>
        <Typography component="h2" variant="h3">
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary" variant="body1">
            {description}
          </Typography>
        ) : null}
      </Stack>
      {action}
    </EmptyStateRoot>
  )
}
