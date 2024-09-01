import { BreedList } from '@/components/breed'
import { getBreedsWithImages } from '@/lib/api'

export default async function Breeds() {
  const breeds = await getBreedsWithImages()

  return (
    <>
      <div className="mx-auto mb-4 mt-6 w-full max-w-[975px] px-4 sm:mb-2 sm:mt-8 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="cursor-default font-bold">For you</div>
          <div className="cursor-default font-bold text-neutral-400">
            Following
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[975px] flex-col items-center px-0 md:px-6">
        <BreedList breeds={breeds} />
      </div>
    </>
  )
}
