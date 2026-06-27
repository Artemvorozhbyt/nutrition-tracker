import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router'
import { ApiClientError } from '../../../api/errors'
import { RhfTextField } from '../../../components/forms/RhfTextField'
import { paths } from '../../../routes/paths'
import { useAuth } from '../hooks/useAuth'
import { useLoginMutation } from '../hooks/useLoginMutation'
import { loginSchema } from '../validation/loginSchema'
import type { LoginFormValues } from '../validation/loginSchema'
import { AuthCard, AuthIconSurface } from './AuthCard'

const FormFields = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
}))

const SubmitProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.action.disabled,
}))

function getMutationErrorMessage(error: unknown) {
  if (error instanceof ApiClientError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Login failed. Please try again.'
}

function getFieldErrorEntries(error: unknown) {
  if (!(error instanceof ApiClientError) || !error.fieldErrors) {
    return []
  }

  return Object.entries(error.fieldErrors).flatMap(([fieldName, messages]) =>
    messages.map((message) => ({
      fieldName,
      message,
    })),
  )
}

function normalizeFieldName(fieldName: string): keyof LoginFormValues | null {
  const normalizedFieldName = fieldName.toLowerCase()

  if (normalizedFieldName.endsWith('email')) {
    return 'email'
  }

  if (normalizedFieldName.endsWith('password')) {
    return 'password'
  }

  return null
}

export function LoginForm() {
  const navigate = useNavigate()
  const { setSession } = useAuth()
  const loginMutation = useLoginMutation()
  const backendErrorMessage = useMemo(
    () =>
      loginMutation.isError
        ? getMutationErrorMessage(loginMutation.error)
        : undefined,
    [loginMutation.error, loginMutation.isError],
  )

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const isLoading = loginMutation.isPending || isSubmitting

  useEffect(() => {
    for (const { fieldName, message } of getFieldErrorEntries(loginMutation.error)) {
      const normalizedFieldName = normalizeFieldName(fieldName)

      if (normalizedFieldName) {
        setError(normalizedFieldName, {
          message,
          type: 'server',
        })
      }
    }
  }, [loginMutation.error, setError])

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await loginMutation.mutateAsync(values)

      setSession({
        tokens: {
          accessToken: response.accessToken,
        },
        user: null,
      })

      navigate(paths.dashboard, { replace: true })
    } catch {
      return
    }
  })

  return (
    <AuthCard elevation={0}>
      <Stack component="form" noValidate onSubmit={onSubmit} spacing={3}>
        <AuthIconSurface>
          <LockOutlinedIcon />
        </AuthIconSurface>
        <Stack spacing={1}>
          <Typography component="h1" variant="h1">
            Login
          </Typography>
          <Typography color="text.secondary">
            Sign in with your nutrition tracker account.
          </Typography>
        </Stack>

        {backendErrorMessage ? (
          <Alert severity="error" variant="filled">
            {backendErrorMessage}
          </Alert>
        ) : null}

        <FormFields>
          <RhfTextField
            autoComplete="email"
            control={control}
            disabled={isLoading}
            fullWidth
            label="Email"
            name="email"
            required
            type="email"
          />
          <RhfTextField
            autoComplete="current-password"
            control={control}
            disabled={isLoading}
            fullWidth
            label="Password"
            name="password"
            required
            type="password"
          />
        </FormFields>

        <Stack spacing={1.5}>
          <Button
            disabled={isLoading}
            startIcon={isLoading ? <SubmitProgress size={18} /> : null}
            type="submit"
            variant="contained"
          >
            {isLoading ? 'Signing in' : 'Sign in'}
          </Button>
          <Button
            component={RouterLink}
            disabled={isLoading}
            startIcon={<PersonAddAltOutlinedIcon />}
            to={paths.register}
            variant="outlined"
          >
            Create account
          </Button>
        </Stack>
      </Stack>
    </AuthCard>
  )
}
