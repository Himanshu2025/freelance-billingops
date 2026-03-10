import { useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'

import { EmptyState } from '@/components/shared/empty-state'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <EmptyState
      icon={<Compass className="h-5 w-5" />}
      title="Page not found"
      description="This route doesn’t exist (yet). Use the sidebar to navigate."
      action={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button size="sm" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </div>
      }
    />
  )
}

