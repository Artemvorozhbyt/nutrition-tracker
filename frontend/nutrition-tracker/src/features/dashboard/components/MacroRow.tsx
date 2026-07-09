import { Box, LinearProgress, Skeleton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const MacroBar = styled(LinearProgress)(({ theme }) => ({
  borderRadius: 6,
  height: 8,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 6,
  },
}))

type MacroRowProps = {
  color: string
  consumed: number
  goal: number
  label: string
  loading?: boolean
  unit?: string
}

export function MacroRow({
  color,
  consumed,
  goal,
  label,
  loading = false,
  unit = 'g',
}: MacroRowProps) {
  if (loading) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <Skeleton width={60} height={18} />
          <Skeleton width={80} height={18} />
        </Box>
        <Skeleton variant="rounded" height={8} sx={{ borderRadius: 1 }} />
      </Box>
    )
  }

  const pct = goal > 0 ? Math.min(100, Math.round((consumed / goal) * 100)) : 0

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'baseline',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 0.75,
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              flexShrink: 0,
              height: 8,
              width: 8,
            }}
          />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          <Typography
            component="span"
            variant="body2"
            sx={{ color: 'text.primary', fontWeight: 700 }}
          >
            {Math.round(consumed)}
            {unit}
          </Typography>
          {goal > 0 && <> &middot; {pct}%</>}
        </Typography>
      </Box>
      <MacroBar
        value={pct}
        variant="determinate"
        sx={{ '& .MuiLinearProgress-bar': { backgroundColor: color } }}
      />
    </Box>
  )
}
