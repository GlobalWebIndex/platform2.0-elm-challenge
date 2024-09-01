'use client'

import NextImage from 'next/image'

type AvatarProps = {
  src: string
  alt?: string
}

export function Avatar({ src, alt = 'Avatar' }: AvatarProps) {
  return (
    <div className="story-border relative z-0 inline-flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-neutral-200 shadow-[inset_0_0_0_2px_rgb(255,255,255)]">
      <NextImage
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="h-full w-full rounded-full border-2 border-white object-cover opacity-0"
        onLoad={e =>
          (e.target as HTMLImageElement).classList.remove('opacity-0')
        }
      />
    </div>
  )
}
