import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

export const AuthCard = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}))

export const AuthIconSurface = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  display: 'inline-flex',
  height: 56,
  justifyContent: 'center',
  width: 56,
}))
