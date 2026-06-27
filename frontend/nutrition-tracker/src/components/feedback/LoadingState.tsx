import { Card, CardContent, Skeleton, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

const LoadingCard = styled(Card)(({ theme }) => ({
  minHeight: 260,
  padding: theme.spacing(1),
}))

export function LoadingState() {
  return (
    <LoadingCard>
      <CardContent>
        <Stack spacing={2}>
          <Skeleton height={32} variant="rounded" width="42%" />
          <Skeleton height={18} variant="rounded" width="68%" />
          <Skeleton height={18} variant="rounded" width="54%" />
          <Skeleton height={128} variant="rounded" />
        </Stack>
      </CardContent>
    </LoadingCard>
  )
}
