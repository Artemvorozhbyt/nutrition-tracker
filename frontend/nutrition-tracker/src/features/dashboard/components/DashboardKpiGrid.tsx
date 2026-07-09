import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined'
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import { Grid } from '@mui/material'
import type { ReactNode } from 'react'
import type { DashboardResponse } from '../api/dashboard'
import { DashboardKpiCard } from './DashboardKpiCard'

type KpiCardDef = {
  description: string
  icon: ReactNode
  unit?: string
  value: number | null | undefined
}

function buildCards(data: DashboardResponse | undefined): KpiCardDef[] {
  const weightDiff = data?.weightDifference ?? null
  const weightIcon =
    weightDiff != null && weightDiff < 0 ? (
      <TrendingDownOutlinedIcon />
    ) : (
      <TrendingUpOutlinedIcon />
    )

  return [
    {
      description: 'Current weight',
      icon: <MonitorWeightOutlinedIcon />,
      unit: 'kg',
      value: data?.currentWeight,
    },
    {
      description: 'Weight change',
      icon: weightIcon,
      unit: 'kg',
      value: weightDiff != null ? Math.abs(weightDiff) : null,
    },
    {
      description: 'Calorie goal',
      icon: <FlagOutlinedIcon />,
      unit: 'kcal',
      value: data?.goalCalories,
    },
    {
      description: 'Calories consumed',
      icon: <LocalFireDepartmentOutlinedIcon />,
      unit: 'kcal',
      value: data?.consumedCalories,
    },
    {
      description: 'Calories remaining',
      icon: <LocalFireDepartmentOutlinedIcon />,
      unit: 'kcal',
      value: data?.remainingCalories,
    },
    {
      description: 'Meals logged today',
      icon: <RestaurantOutlinedIcon />,
      value: data?.mealsToday,
    },
  ]
}

type DashboardKpiGridProps = {
  data: DashboardResponse | undefined
  loading: boolean
}

export function DashboardKpiGrid({ data, loading }: DashboardKpiGridProps) {
  const cards = buildCards(data)

  return (
    <Grid container spacing={2.5}>
      {cards.map((card, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
          <DashboardKpiCard loading={loading} {...card} />
        </Grid>
      ))}
    </Grid>
  )
}
