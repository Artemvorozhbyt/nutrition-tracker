import AddIcon from '@mui/icons-material/Add'
import {
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { MealCard } from './MealCard'
import type { Meal, MealType as MealTypeValue } from '../types'

type Props = {
  mealType: MealTypeValue
  meals: Meal[]
  onDelete: (id: string) => void
  deletingMealId: string | null
  onAddMeal: (mealType: MealTypeValue) => void
}

const TITLES: Record<MealTypeValue, string> = {
  1: '☀ Breakfast',
  2: '🍗 Lunch',
  3: '🌙 Dinner',
  4: '🍎 Snack',
}

export function MealTypeSection({
  mealType,
  meals,
  onDelete,
  deletingMealId,
  onAddMeal,
}: Props) {
  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            {TITLES[mealType]} ({meals.length})
          </Typography>

          <Tooltip title={`Add to ${TITLES[mealType]}`}>
            <IconButton
              color="primary"
              onClick={() => onAddMeal(mealType)}
              aria-label={`Add meal to ${TITLES[mealType]}`}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider />
      </Stack>

      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onDelete={onDelete}
          isDeleting={deletingMealId === meal.id}
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