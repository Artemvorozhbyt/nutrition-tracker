import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import { EmptyState } from '../components/feedback/EmptyState'
import { PageHeader } from '../components/layout/PageHeader'
import { PageShell } from '../components/layout/PageShell'

type FeaturePlaceholderPageProps = {
  description: string
  title: string
}

export function FeaturePlaceholderPage({
  description,
  title,
}: FeaturePlaceholderPageProps) {
  return (
    <PageShell>
      <PageHeader description={description} title={title} />
      <EmptyState
        description="No API requests are wired for this area yet."
        icon={<InsightsOutlinedIcon />}
        title="Ready for the backend contract"
      />
    </PageShell>
  )
}
