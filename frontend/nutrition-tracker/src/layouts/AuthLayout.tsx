import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined'
import { Outlet } from 'react-router'
import { Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const AuthRoot = styled('main')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(320px, 1.1fr)',
  minHeight: '100svh',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}))

const BrandPanel = styled('section')(({ theme }) => ({
  alignItems: 'flex-start',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.primary.main,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(4),
    minHeight: 220,
    padding: theme.spacing(3),
  },
}))

const BrandMark = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.action.hover
      : 'rgba(255, 255, 255, 0.16)',
  borderRadius: theme.shape.borderRadius,
  display: 'inline-flex',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.25, 1.5),
}))

const BrandName = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: 800,
  margin: 0,
}))

const AuthContent = styled('section')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
  },
}))

const AuthSurface = styled('div')(({ theme }) => ({
  maxWidth: 460,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}))

export function AuthLayout() {
  return (
    <AuthRoot>
      <BrandPanel>
        <BrandMark>
          <RestaurantMenuOutlinedIcon />
          <BrandName>Nutrition Tracker</BrandName>
        </BrandMark>
        <Stack spacing={2}>
          <Typography component="h1" variant="h1">
            Practical nutrition tracking for everyday decisions.
          </Typography>
          <Typography variant="body1">
            A focused workspace for meals, products, goals, and progress.
          </Typography>
        </Stack>
      </BrandPanel>
      <AuthContent>
        <AuthSurface>
          <Outlet />
        </AuthSurface>
      </AuthContent>
    </AuthRoot>
  )
}
