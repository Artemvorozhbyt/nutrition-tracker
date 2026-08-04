import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import type { Meal } from '../types'

type Props = {
  meal: Meal
  onDelete: (id: string) => void
  isDeleting?: boolean
}

export function MealCard({
  meal,
  onDelete,
  isDeleting = false,
}: Props) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              {meal.productName}
            </Typography>

            <IconButton
              color="error"
              size="small"
              disabled={isDeleting}
              onClick={() => onDelete(meal.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <Chip
            label={`${meal.grams} g`}
            size="small"
            sx={{
              width: 'fit-content',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
            }}
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
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}