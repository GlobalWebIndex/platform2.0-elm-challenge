import { cn } from '@/lib/utils'

export function Cross(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
      className={cn('size-6', props.className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M20.643 3.357 12 12l-8.647 8.647m17.296.002L3.354 3.354"
      />
    </svg>
  )
}
