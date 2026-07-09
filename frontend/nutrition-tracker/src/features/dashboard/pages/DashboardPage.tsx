import { Alert, Box, Button, Grid } from '@mui/material'
import {
  DashboardCaloriesPanel,
  DashboardHeader,
  DashboardKpiGrid,
  DashboardMacrosPanel,
} from '../components'
import { useDashboardQuery } from '../hooks/useDashboardQuery'

export function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardQuery()

  if (isError) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Alert
          severity="error"
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={() => void refetch()}>
              Retry
            </Button>
          }
          sx={{ borderRadius: 3 }}
        >
          Failed to load dashboard data. Please try again.
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, sm: 3, md: 4 }, width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <DashboardHeader />
      </Box>

      <Box sx={{ mb: 3 }}>
        <DashboardKpiGrid data={data} loading={isLoading} />
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <DashboardCaloriesPanel data={data} loading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <DashboardMacrosPanel data={data} loading={isLoading} />
        </Grid>
      </Grid>
    </Box>
  )
}
