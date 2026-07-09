import { Divider, Stack, Typography } from '@mui/material'
import { MealCard } from './MealCard'
import type { Meal, MealType } from '../types'

type Props = {
  mealType: MealType
  meals: Meal[]
}

const TITLES: Record<MealType, string> = {
  Breakfast: '☀ Breakfast',
  Lunch: '🍗 Lunch',
  Dinner: '🌙 Dinner',
  Snack: '🍎 Snack',
}

export function MealTypeSection({
  mealType,
  meals,
}: Props) {
  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700 }}
        >
          {TITLES[mealType]} ({meals.length})
        </Typography>

        <Divider />
      </Stack>

      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
        />
      ))}

      {meals.length === 0 && (
        <Typography
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          No meals yet
        </Typography>
      )}
    </Stack>
  )
}