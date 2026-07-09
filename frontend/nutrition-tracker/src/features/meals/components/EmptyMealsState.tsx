import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import { Box, Button, Stack, Typography } from '@mui/material'

type Props = {
  onAddClick?: () => void
}

export function EmptyMealsState({ onAddClick }: Props) {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        textAlign: 'center',
        borderRadius: 4,
        bgcolor: 'background.paper',
      }}
    >
      <Stack
        spacing={2}
        sx={{
            alignItems: 'center',
        }}
      >
        <RestaurantOutlinedIcon
          sx={{
            fontSize: 64,
            color: 'primary.main',
            opacity: 0.8,
          }}
        />

        <Typography
          variant="h5"
          sx={{ fontWeight: 700 }}
        >
          No meals yet
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ maxWidth: 350 }}
        >
          Start tracking today's nutrition by adding your first meal.
        </Typography>

        {onAddClick && (
          <Button
            variant="contained"
            onClick={onAddClick}
            sx={{
              mt: 1,
              borderRadius: 3,
              textTransform: 'none',
            }}
          >
            Add first meal
          </Button>
        )}
      </Stack>
    </Box>
  )
}