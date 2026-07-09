import { Box, Skeleton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'

const SIZE = 180
const STROKE = 14
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

const SvgWrap = styled('svg')({
  transform: 'rotate(-90deg)',
})

type CalorieRingProps = {
  consumed: number
  goal: number
  loading?: boolean
  remaining: number
}

export function CalorieRing({ consumed, goal, loading = false, remaining }: CalorieRingProps) {
  const theme = useTheme()

  if (loading) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton variant="circular" width={SIZE} height={SIZE} />
        <Skeleton width={120} height={24} />
      </Box>
    )
  }

  const pct = goal > 0 ? Math.min(1, consumed / goal) : 0
  const over = consumed > goal
  const dash = C * pct
  const progressColor = over ? theme.palette.error.main : theme.palette.primary.main
  const trackColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ position: 'relative', width: SIZE, height: SIZE }}>
        <SvgWrap width={SIZE} height={SIZE}>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={trackColor}
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={progressColor}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        </SvgWrap>

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            inset: 0,
            justifyContent: 'center',
            position: 'absolute',
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '2rem',
              letterSpacing: '-1px',
              lineHeight: 1,
              color: over ? 'error.main' : 'text.primary',
            }}
          >
            {Math.abs(Math.round(remaining))}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mt: 0.25 }}>
            {over ? 'kcal over' : 'kcal left'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {Math.round(goal)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Goal
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: (t) => `1px solid ${t.palette.divider}`,
            pl: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {Math.round(consumed)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Eaten
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
