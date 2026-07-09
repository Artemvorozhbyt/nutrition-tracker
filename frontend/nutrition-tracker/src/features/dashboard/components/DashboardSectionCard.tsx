import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

export const DashboardSectionCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)'
      : '#ffffff',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 20,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 4px 24px rgba(0,0,0,0.35)'
      : '0 4px 24px rgba(15,118,110,0.08)',
}))
