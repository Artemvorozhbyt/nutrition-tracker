import { Box, CardContent, Stack, Typography } from '@mui/material'
import type { DashboardResponse } from '../api/dashboard'
import { MacroRow } from './MacroRow'
import { DashboardSectionCard } from './DashboardSectionCard'

const MACROS = [
  { key: 'consumedProtein', label: 'Protein', shortLabel: 'Protein', color: '#22d3ee' },
  { key: 'consumedCarbs', label: 'Carbohydrates', shortLabel: 'Carbs', color: '#a78bfa' },
  { key: 'consumedFat', label: 'Fat', shortLabel: 'Fat', color: '#fb923c' },
] as const

type MacroKey = (typeof MACROS)[number]['key']

type DashboardMacrosPanelProps = {
  data: DashboardResponse | undefined
  loading: boolean
}

export function DashboardMacrosPanel({ data, loading }: DashboardMacrosPanelProps) {
  return (
    <DashboardSectionCard elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
          Macronutrients
        </Typography>

        <Stack spacing={3}>
          {MACROS.map(({ key, label, color }) => (
            <MacroRow
              key={key}
              loading={loading}
              label={label}
              consumed={data?.[key as MacroKey] ?? 0}
              goal={0}
              color={color}
            />
          ))}
        </Stack>

        {!loading && (
          <Box
            sx={{
              borderTop: (t) => `1px solid ${t.palette.divider}`,
              display: 'flex',
              gap: 3,
              mt: 4,
              pt: 3,
            }}
          >
            {MACROS.map(({ key, shortLabel, color }) => (
              <Box key={key}>
                <Typography
                  variant="h3"
                  sx={{ color, fontWeight: 800, lineHeight: 1 }}
                >
                  {Math.round(data?.[key as MacroKey] ?? 0)}g
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {shortLabel}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </DashboardSectionCard>
  )
}
