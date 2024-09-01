'use client'

import { BreedView } from '@/components/breed'
import { Cross } from '@/icons'
import { Cat } from '@/lib/types'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'

export default function Modal({
  cats,
  breedCat
}: {
  cats: Cat[]
  breedCat: Cat
}) {
  const router = useRouter()

  return (
    <Dialog.Root open={true} onOpenChange={() => router.back()}>
      <Dialog.Portal>
        <div className="fixed inset-0 isolate z-10 flex min-h-dvh flex-col">
          <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
          <div className="relative flex h-full w-full flex-col">
            <Dialog.Content className="relative grid h-full w-full place-items-center overflow-y-auto overscroll-y-contain [scrollbar-width:thin] sm:p-10">
              <Dialog.Close asChild>
                <button
                  className="absolute right-1 top-2 z-30 flex h-8 w-8 items-center justify-center text-white"
                  aria-label="Close"
                >
                  <Cross className="size-4" />
                </button>
              </Dialog.Close>
              <Dialog.Title className="sr-only">Breed view</Dialog.Title>
              <Dialog.Description className="sr-only">
                Information about the cat breed
              </Dialog.Description>
              <BreedView cats={cats} breedCat={breedCat} className="z-10" />
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
