import { cn } from '@/lib/utils'

export function CommentBubble(props: React.ComponentProps<'svg'>) {
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
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      />
    </svg>
  )
}
