import type { ReactNode } from 'react'
import { styled } from '@mui/material/styles'

const PageShellRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  marginInline: 'auto',
  maxWidth: 1200,
  padding: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2.5),
    padding: theme.spacing(3, 2),
  },
}))

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return <PageShellRoot>{children}</PageShellRoot>
}
