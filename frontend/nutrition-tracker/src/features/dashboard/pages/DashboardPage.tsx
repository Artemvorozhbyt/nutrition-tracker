import { Alert, CircularProgress, Stack, Typography } from '@mui/material'
import { useDashboardQuery } from '../hooks/useDashboardQuery'

export function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboardQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error instanceof Error ? error.message : 'Failed to load dashboard.'}
      </Alert>
    )
  }
  if (!data) {
    return null
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Dashboard</Typography>

      <Typography>
        Current Weight: {data.currentWeight}
      </Typography>

      <Typography>
        Goal Calories: {data.goalCalories}
      </Typography>

      <Typography>
        Consumed Calories: {data.consumedCalories}
      </Typography>

      <Typography>
        Remaining Calories: {data.remainingCalories}
      </Typography>

      <Typography>
        Meals Today: {data.mealsToday}
      </Typography>
    </Stack>
  )
}