import { BreedView } from '@/components/breed'
import { getCat, getCatBreed } from '@/lib/api'

export default async function BreedPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const cats = await getCatBreed(id, 3)

  if (!cats) return null

  const { reference_image_id } = cats[0].breeds[0]

  const breedCat = await getCat(reference_image_id)

  if (!breedCat) return null

  return (
    <div className="sm:mt-8 sm:px-6">
      <BreedView
        cats={cats}
        breedCat={breedCat}
        className="shadow-sm sm:border"
      />
    </div>
  )
}
