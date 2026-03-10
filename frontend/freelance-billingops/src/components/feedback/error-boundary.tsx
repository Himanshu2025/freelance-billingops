import * as React from 'react'

import { ErrorState } from '@/components/feedback/error-state'

type Props = {
  children: React.ReactNode
}

type State = {
  error: unknown
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-4">
          <ErrorState
            title="We hit an unexpected error"
            description="Try refreshing. If the issue persists, check the API and environment configuration."
            onRetry={() => window.location.reload()}
          />
        </div>
      )
    }
    return this.props.children
  }
}

