
import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import type { Meal } from '../types'

type Props = {
  meal: Meal
}

export function MealCard({ meal }: Props) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            {meal.productName}
          </Typography>

          <Chip
            label={`${meal.grams} g`}
            size="small"
            sx={{ width: 'fit-content' }}
          />

          <Stack
            direction="row"
            spacing={3}
          >
            <Typography>
              🔥 {meal.calories}
            </Typography>

            <Typography>
              🥩 {meal.protein} P
            </Typography>

            <Typography>
              🧈 {meal.fat} F
            </Typography>

            <Typography>
              🍞 {meal.carbs} C
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}