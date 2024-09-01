import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

// Not a fully production ready button. Used for decorative purposes.
export function Button({
  variant = 'primary',
  children,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      {...otherProps}
      className={cn(
        'inline-flex h-8 cursor-pointer touch-none select-none items-center rounded-md px-3 text-sm font-medium text-white transition-colors',
        variant === 'primary' && 'bg-[color:var(--accent-color)]',
        variant === 'secondary' && 'bg-neutral-900',
        className
      )}
    >
      {children}
    </button>
  )
}
