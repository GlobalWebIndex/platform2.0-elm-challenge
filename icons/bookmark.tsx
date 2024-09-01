import { cn } from '@/lib/utils'

export function Bookmark(props: React.ComponentProps<'svg'>) {
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
        strokeWidth="2"
        d="m20 21-8-7.56L4 21V3h16v18z"
      />
    </svg>
  )
}
