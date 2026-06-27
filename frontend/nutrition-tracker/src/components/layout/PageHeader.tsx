import type { ReactNode } from 'react'
import { Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const PageHeaderRoot = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
  flexDirection: 'row',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))

const PageHeaderCopy = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.75),
}))

type PageHeaderProps = {
  action?: ReactNode
  description?: string
  title: string
}

export function PageHeader({ action, description, title }: PageHeaderProps) {
  return (
    <PageHeaderRoot>
      <PageHeaderCopy>
        <Typography component="h1" variant="h1">
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary" variant="body1">
            {description}
          </Typography>
        ) : null}
      </PageHeaderCopy>
      {action}
    </PageHeaderRoot>
  )
}
