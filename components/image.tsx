'use client'

import { cn } from '@/lib/utils'
import NextImage from 'next/image'

type ImageProps = {
  src: string
  width?: number
  height?: number
  alt?: string
  fill?: boolean
  className?: string
}

export function Image({
  src,
  width,
  height,
  fill = false,
  alt = '',
  className
}: ImageProps) {
  return (
    <div
      className={cn(
        'relative h-full w-full select-none overflow-hidden bg-gray-200 [border-radius:inherit]',
        className
      )}
    >
      <NextImage
        src={src}
        width={width}
        height={height}
        alt={alt}
        fill={fill}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="h-full w-full object-cover opacity-0"
        onLoad={e =>
          (e.target as HTMLImageElement).classList.remove('opacity-0')
        }
      />
    </div>
  )
}
