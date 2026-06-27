import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import { EmptyState } from '../components/feedback/EmptyState'
import { PageShell } from '../components/layout/PageShell'
import { paths } from '../routes/paths'

export function NotFoundPage() {
  return (
    <PageShell>
      <EmptyState
        action={
          <Button component={RouterLink} to={paths.dashboard} variant="contained">
            Go to dashboard
          </Button>
        }
        description="The route you opened does not exist."
        icon={<HomeOutlinedIcon />}
        title="Page not found"
      />
    </PageShell>
  )
}
