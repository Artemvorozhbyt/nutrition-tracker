import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { ApiClientError } from '../../../api/errors'
import { RhfTextField } from '../../../components/forms/RhfTextField'
import { paths } from '../../../routes/paths'

import { GoalType, Gender } from '../types'
import { useAuth } from '../hooks/useAuth'
import { useRegisterMutation } from '../hooks/useRegisterMutation'
import { registerSchema } from '../validation/registerSchema'
import type { RegisterFormValues } from '../validation/registerSchema'

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

  return 'Registration failed. Please try again.'
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

function normalizeFieldName(
  fieldName: string,
): keyof RegisterFormValues | null {
  const normalized = fieldName.toLowerCase()

  if (normalized.endsWith('firstname')) return 'firstName'
  if (normalized.endsWith('email')) return 'email'
  if (normalized.endsWith('password')) return 'password'
  if (normalized.endsWith('gender')) return 'gender'
  if (normalized.endsWith('age')) return 'age'
  if (normalized.endsWith('height')) return 'height'
  if (normalized.endsWith('weight')) return 'weight'
  if (normalized.endsWith('goal')) return 'goal'

  return null
}

export function RegisterForm() {
  const navigate = useNavigate()

  const { setSession } = useAuth()

  const registerMutation = useRegisterMutation()

  const backendErrorMessage = useMemo(
    () =>
      registerMutation.isError
        ? getMutationErrorMessage(registerMutation.error)
        : undefined,
    [registerMutation.error, registerMutation.isError],
  )

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: Gender.Male,
      age: 18,
      height: 170,
      weight: 70,
      goal: GoalType.MaintainWeight,
    },
  })

  const isLoading =
    registerMutation.isPending || isSubmitting

  useEffect(() => {
    for (const { fieldName, message } of getFieldErrorEntries(
      registerMutation.error,
    )) {
      const normalizedFieldName =
        normalizeFieldName(fieldName)

      if (normalizedFieldName) {
        setError(normalizedFieldName as keyof RegisterFormValues, {
          type: 'server',
          message,
        })
      }
    }
  }, [registerMutation.error, setError])

  const onSubmit = handleSubmit(
    async (values: RegisterFormValues) => {
      try {
        const response =
          await registerMutation.mutateAsync({
            firstName: values.firstName,
            email: values.email,
            password: values.password,
            gender: values.gender,
            age: values.age,
            height: values.height,
            weight: values.weight,
            goal: values.goal,
          })

        setSession({
          tokens: {
            accessToken: response.accessToken,
          },
          user: null,
        })

        navigate(paths.dashboard, {
          replace: true,
        })
      } catch {
        return
      }
    },
  )

  return (
    <AuthCard elevation={0}>
      <Stack
        component="form"
        noValidate
        onSubmit={onSubmit}
        spacing={3}
      >
        <AuthIconSurface>
          <PersonAddAltOutlinedIcon />
        </AuthIconSurface>

        <Stack spacing={1}>
          <Typography component="h1" variant="h1">
            Create account
          </Typography>

          <Typography color="text.secondary">
            Create your Nutrition Tracker account.
          </Typography>
        </Stack>

        {backendErrorMessage ? (
          <Alert severity="error" variant="filled">
            {backendErrorMessage}
          </Alert>
        ) : null}

              <FormFields>
                <RhfTextField
            autoComplete="given-name"
            control={control}
            disabled={isLoading}
            fullWidth
            label="First name"
            name="firstName"
            required
          />

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
            autoComplete="new-password"
            control={control}
            disabled={isLoading}
            fullWidth
            label="Password"
            name="password"
            required
            type="password"
          />

          <RhfTextField
            autoComplete="new-password"
            control={control}
            disabled={isLoading}
            fullWidth
            label="Confirm password"
            name="confirmPassword"
            required
            type="password"
          />

          <RhfTextField
            control={control}
            disabled={isLoading}
            fullWidth
            label="Gender"
            name="gender"
            options={[
              {
                label: 'Male',
                value: Gender.Male,
              },
              {
                label: 'Female',
                value: Gender.Female,
              },
            ]}
            required
          />

          <RhfTextField
            control={control}
            disabled={isLoading}
            fullWidth
            label="Age"
            name="age"
            required
            type="number"
          />

          <RhfTextField
            control={control}
            disabled={isLoading}
            fullWidth
            label="Height (cm)"
            name="height"
            required
            type="number"
          />

          <RhfTextField
            control={control}
            disabled={isLoading}
            fullWidth
            label="Weight (kg)"
            name="weight"
            required
            type="number"
          />

          <RhfTextField
            control={control}
            disabled={isLoading}
            fullWidth
            label="Goal"
            name="goal"
            options={[
              {
                label: 'Lose weight',
                value: GoalType.LoseWeight,
              },
              {
                label: 'Maintain weight',
                value: GoalType.MaintainWeight,
              },
              {
                label: 'Gain weight',
                value: GoalType.GainWeight,
              },
            ]}
            required
          />
        </FormFields>

        <Stack spacing={1.5}>
          <Button
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <SubmitProgress size={18} />
              ) : null
            }
            type="submit"
            variant="contained"
          >
            {isLoading
              ? 'Creating account...'
              : 'Create account'}
          </Button>
        </Stack>
      </Stack>
    </AuthCard>
  )
}