import { Stack, Typography } from '@mui/material'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function DashboardHeader() {
  return (
    <Stack spacing={0.5}>
      <Typography variant="h1" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
        {getGreeting()} 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
        {formatDate()} &middot; Here&rsquo;s your nutrition summary
      </Typography>
    </Stack>
  )
}
