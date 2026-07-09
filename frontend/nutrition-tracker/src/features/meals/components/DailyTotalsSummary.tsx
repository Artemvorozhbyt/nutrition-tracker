import { Grid, Paper, Typography } from '@mui/material'

type Props = {
  calories: number
  protein: number
  fat: number
  carbs: number
}

export function DailyTotalsSummary({
  calories,
  protein,
  fat,
  carbs,
}: Props) {
  const items = [
    { label: 'Calories', value: calories, color: '#ef4444' },
    { label: 'Protein', value: `${protein} g`, color: '#3b82f6' },
    { label: 'Fat', value: `${fat} g`, color: '#f59e0b' },
    { label: 'Carbs', value: `${carbs} g`, color: '#22c55e' },
  ]

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid key={item.label} size={{ xs: 6, md: 3 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {item.label}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: item.color,
              }}
            >
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}