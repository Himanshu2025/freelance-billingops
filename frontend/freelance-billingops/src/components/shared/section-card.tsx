import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/cn'

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="min-w-0">
          <CardTitle className="truncate">{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

