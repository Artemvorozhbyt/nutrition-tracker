
import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import {
  useCalculateDailyGoalsMutation,
  useDailyGoalsQuery,
  useUpdateDailyGoalsMutation,
} from '../hooks/useDailyGoals'

import type { DailyGoalsDto } from '../api/dailyGoals'

const initialGoals: DailyGoalsDto = {
  calories: 2000,
  protein: 120,
  fat: 65,
  carbs: 250,
}

const fields: {
  key: keyof DailyGoalsDto
  label: string
  unit: string
}[] = [
  { key: 'calories', label: 'Calories', unit: 'kcal' },
  { key: 'protein', label: 'Protein', unit: 'g' },
  { key: 'fat', label: 'Fat', unit: 'g' },
  { key: 'carbs', label: 'Carbs', unit: 'g' },
]

export function GoalsPage() {
  const goalsQuery = useDailyGoalsQuery()
  const updateMutation = useUpdateDailyGoalsMutation()
  const calculateMutation = useCalculateDailyGoalsMutation()
  const [goals, setGoals] = useState<DailyGoalsDto>(initialGoals)
  const [activityLevel, setActivityLevel] = useState(2)
  useEffect(() => {
    if (goalsQuery.data) {
      setGoals(goalsQuery.data)
    }
  }, [goalsQuery.data])

  const handleChange = (key: keyof DailyGoalsDto, value: string) => {
    setGoals((current) => ({
      ...current,
      [key]: value === '' ? 0 : Number(value),
    }))
  }

  const handleSave = () => {
    updateMutation.mutate(goals)
  }
  
  const handleCalculate = async () => {
    try {
        const calculatedGoals =
            await calculateMutation.mutateAsync(activityLevel)
        setGoals(calculatedGoals)
    } catch {
        // Error is displayed below.
   }
  }

  if (goalsQuery.isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (goalsQuery.isError && goalsQuery.error.message.includes('404')) {
    return (
      <Stack spacing={2} sx={{ maxWidth: 700, mx: 'auto' }}>
        <Alert severity="info">
          Your daily goals have not been created yet. Set your targets below.
        </Alert>
        <GoalsForm
          activityLevel={activityLevel}
          onActivityLevelChange={setActivityLevel}
          onCalculate={handleCalculate}
          isCalculating={calculateMutation.isPending}
          goals={goals}
          onChange={handleChange}
          onSave={handleSave}
          isSaving={updateMutation.isPending}
        />
        {updateMutation.isSuccess && (
          <Alert severity="success">Daily goals saved successfully.</Alert>
        )}
        {updateMutation.isError && (
          <Alert severity="error">{updateMutation.error.message}</Alert>
        )}
        {calculateMutation.isError && (
        <Alert severity="error">
            {calculateMutation.error.message}
        </Alert>
        )}
      </Stack>
    )
  }

  if (goalsQuery.isError) {
    return <Alert severity="error">{goalsQuery.error.message}</Alert>
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Daily Goals
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Set your daily calorie and macronutrient targets.
        </Typography>
      </Box>

      <GoalsForm
        activityLevel={activityLevel}
        onActivityLevelChange={setActivityLevel}
        onCalculate={handleCalculate}
        isCalculating={calculateMutation.isPending}
        goals={goals}
        onChange={handleChange}
        onSave={handleSave}
        isSaving={updateMutation.isPending}
      />

      {updateMutation.isSuccess && (
        <Alert severity="success">Daily goals saved successfully.</Alert>
      )}
      {updateMutation.isError && (
        <Alert severity="error">{updateMutation.error.message}</Alert>
      )}
    </Stack>
  )
}

function GoalsForm({
  goals,
  onChange,
  onSave,
  isSaving,
  onCalculate,
  isCalculating,
  activityLevel,
  onActivityLevelChange,
  
}: {
  goals: DailyGoalsDto
  onChange: (key: keyof DailyGoalsDto, value: string) => void
  onSave: () => void
  isSaving: boolean
  onCalculate: () => void
  isCalculating: boolean
  activityLevel: number
  onActivityLevelChange: (value: number) => void
}) {
  return (
    <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Your daily targets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Values are used to track your daily nutrition progress.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
                <TextField
          select
          fullWidth
          label="Your activity level"
          value={activityLevel}
          onChange={(event) =>
            onActivityLevelChange(Number(event.target.value))
          }
          helperText="Choose your usual physical activity level"
        >
          <MenuItem value={1}>
            Sedentary — little or no exercise
          </MenuItem>
          <MenuItem value={2}>
            Lightly active — exercise 1–3 days/week
          </MenuItem>
          <MenuItem value={3}>
            Moderately active — exercise 3–5 days/week
          </MenuItem>
          <MenuItem value={4}>
            Very active — exercise 6–7 days/week
          </MenuItem>
          <MenuItem value={5}>
            Extremely active — intense training or physical work
          </MenuItem>
        </TextField>
            
          {fields.map((field) => (
            <TextField
              key={field.key}
              fullWidth
              type="number"
              label={field.label}
              value={goals[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
              slotProps={{
                htmlInput: { min: 0, step: 1 },
              }}
              helperText={field.unit}
            />
          ))}
        </Box>
        <Button
            variant="outlined"
            size="large"
            onClick={onCalculate}
            disabled={isCalculating || isSaving}
            >
            {isCalculating ? 'Calculating...' : 'Calculate from profile'}
        </Button> 
        <Button
          variant="contained"
          size="large"
          onClick={onSave}
          disabled={isSaving || fields.some((field) => goals[field.key] <= 0)}
        >
          {isSaving ? 'Saving...' : 'Save goals'}
        </Button>
      </Stack>
    </Paper>
  )
}
