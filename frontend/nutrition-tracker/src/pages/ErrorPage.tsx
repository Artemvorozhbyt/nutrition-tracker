import { ErrorState } from '../components/feedback/ErrorState'
import { PageShell } from '../components/layout/PageShell'

type ErrorPageProps = {
  description?: string
  onRetry?: () => void
  title?: string
}

export function ErrorPage({ description, onRetry, title }: ErrorPageProps) {
  return (
    <PageShell>
      <ErrorState description={description} onRetry={onRetry} title={title} />
    </PageShell>
  )
}
