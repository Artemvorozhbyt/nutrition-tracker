import type { ReactNode } from 'react'
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)'
      : 'linear-gradient(145deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 20,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 4px 24px rgba(0,0,0,0.35)'
      : '0 4px 24px rgba(15,118,110,0.08)',
  cursor: 'default',
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 12px 40px rgba(0,0,0,0.5)'
        : '0 12px 40px rgba(15,118,110,0.16)',
  },
}))

const IconWrap = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: 14,
  color: theme.palette.primary.contrastText,
  display: 'inline-flex',
  height: 44,
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  opacity: 0.9,
  width: 44,
  '& svg': {
    fontSize: 22,
  },
}))

const AccentBar = styled('div')(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
  height: 2,
  left: 0,
  opacity: 0.4,
  position: 'absolute',
  right: 0,
  top: 0,
}))

type DashboardKpiCardProps = {
  description: string
  icon: ReactNode
  loading?: boolean
  unit?: string
  value: number | null | undefined
}

function formatValue(value: number | null | undefined, unit?: string): string {
  if (value == null) return '—'
  const rounded = Math.round(value * 10) / 10
  return unit ? `${rounded} ${unit}` : String(rounded)
}

export function DashboardKpiCard({
  description,
  icon,
  loading = false,
  unit,
  value,
}: DashboardKpiCardProps) {
  if (loading) {
    return (
      <StyledCard elevation={0}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 2, mb: 2 }} />
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mt: 0.5 }} />
        </CardContent>
      </StyledCard>
    )
  }

  return (
    <StyledCard elevation={0}>
      <AccentBar />
      <CardContent sx={{ p: 3 }}>
        <IconWrap>{icon}</IconWrap>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.1, mb: 0.5 }}
        >
          {formatValue(value, unit)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  )
}
