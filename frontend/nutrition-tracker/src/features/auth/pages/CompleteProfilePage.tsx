import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'
import { apiClient, unwrapApiResponse } from '../../../api/client'
import { paths } from '../../../routes/paths'

type CompleteProfileRequest = {
  firstName: string
  gender: number
  age: number
  height: number
  weight: number
  goal: number
}

export function CompleteProfilePage() {
  const navigate = useNavigate()

  const [form, setForm] = useState<CompleteProfileRequest>({
    firstName: '',
    gender: 1,
    age: 0,
    height: 0,
    weight: 0,
    goal: 2,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateField = (
    field: keyof CompleteProfileRequest,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]:
        field === 'firstName'
          ? value
          : Number(value),
    }))
  }

  const handleSubmit = async () => {
    setError(null)

    if (
      !form.firstName.trim() ||
      form.age <= 0 ||
      form.height <= 0 ||
      form.weight <= 0
    ) {
      setError('Please fill in all profile fields correctly.')
      return
    }

    try {
      setLoading(true)

      await unwrapApiResponse(
        apiClient.put('/profile', form),
      )

      navigate(paths.dashboard, { replace: true })
    } catch {
      setError('Failed to complete profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 500, width: '100%', pt: 8 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">
              Complete your profile
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Tell us a little about yourself so we can calculate your
              daily nutrition goals.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="First name"
            value={form.firstName}
            onChange={(event) =>
              updateField('firstName', event.target.value)
            }
          />

          <TextField
            fullWidth
            select
            label="Gender"
            value={form.gender}
            onChange={(event) =>
              updateField('gender', event.target.value)
            }
          >
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Age"
            type="number"
            value={form.age || ''}
            onChange={(event) =>
              updateField('age', event.target.value)
            }
          />

          <TextField
            fullWidth
            label="Height (cm)"
            type="number"
            value={form.height || ''}
            onChange={(event) =>
              updateField('height', event.target.value)
            }
          />

          <TextField
            fullWidth
            label="Weight (kg)"
            type="number"
            value={form.weight || ''}
            onChange={(event) =>
              updateField('weight', event.target.value)
            }
          />

          <TextField
            fullWidth
            select
            label="Goal"
            value={form.goal}
            onChange={(event) =>
              updateField('goal', event.target.value)
            }
          >
            <MenuItem value={1}>Lose weight</MenuItem>
            <MenuItem value={2}>Maintain weight</MenuItem>
            <MenuItem value={3}>Gain weight</MenuItem>
          </TextField>

          <Button
            disabled={loading}
            fullWidth
            onClick={handleSubmit}
            size="large"
            variant="contained"
          >
            {loading ? 'Saving...' : 'Complete profile'}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}