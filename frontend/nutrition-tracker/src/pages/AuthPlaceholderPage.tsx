import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import type { ReactNode } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import { AuthCard, AuthIconSurface } from '../features/auth/components/AuthCard'
import { paths } from '../routes/paths'

type AuthMode = 'login' | 'register'

const copyByMode: Record<
  AuthMode,
  {
    icon: ReactNode
    primaryActionLabel: string
    primaryActionTo: string
    title: string
  }
> = {
  login: {
    icon: <LockOutlinedIcon />,
    primaryActionLabel: 'Create account',
    primaryActionTo: paths.register,
    title: 'Login',
  },
  register: {
    icon: <PersonAddAltOutlinedIcon />,
    primaryActionLabel: 'Back to login',
    primaryActionTo: paths.login,
    title: 'Register',
  },
}

type AuthPlaceholderPageProps = {
  mode: AuthMode
}

export function AuthPlaceholderPage({ mode }: AuthPlaceholderPageProps) {
  const copy = copyByMode[mode]

  return (
    <AuthCard elevation={0}>
      <Stack spacing={3}>
        <AuthIconSurface>{copy.icon}</AuthIconSurface>
        <Stack spacing={1}>
          <Typography component="h1" variant="h1">
            {copy.title}
          </Typography>
          <Typography color="text.secondary">
            The authentication form will be connected after the backend API
            contract is provided.
          </Typography>
        </Stack>
        <Button component={RouterLink} to={copy.primaryActionTo} variant="outlined">
          {copy.primaryActionLabel}
        </Button>
      </Stack>
    </AuthCard>
  )
}
