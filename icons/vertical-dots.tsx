import { cn } from '@/lib/utils'

export function VerticalDots(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
      className={cn('size-6', props.className)}
    >
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  )
}
