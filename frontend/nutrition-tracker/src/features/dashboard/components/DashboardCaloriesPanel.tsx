import { CardContent, Typography } from '@mui/material'
import type { DashboardResponse } from '../api/dashboard'
import { CalorieRing } from './CalorieRing'
import { DashboardSectionCard } from './DashboardSectionCard'

type DashboardCaloriesPanelProps = {
  data: DashboardResponse | undefined
  loading: boolean
}

export function DashboardCaloriesPanel({ data, loading }: DashboardCaloriesPanelProps) {
  return (
    <DashboardSectionCard elevation={0} sx={{ height: '100%' }}>
      <CardContent
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 280,
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ alignSelf: 'flex-start', fontWeight: 800, mb: 2 }}>
          Calories
        </Typography>
        <CalorieRing
          loading={loading}
          consumed={data?.consumedCalories ?? 0}
          goal={data?.goalCalories ?? 0}
          remaining={data?.remainingCalories ?? 0}
        />
      </CardContent>
    </DashboardSectionCard>
  )
}
