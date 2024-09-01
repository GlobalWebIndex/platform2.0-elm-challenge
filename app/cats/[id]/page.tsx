import { CatView } from '@/components/cat'
import { getCat, getFavorite } from '@/lib/api'

export default async function CatPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const cat = await getCat(id)

  if (!cat) return null

  const { reference_image_id } = cat.breeds[0]

  const breedCat = await getCat(reference_image_id)

  if (!breedCat) return null

  const favorites = await getFavorite(id)
  const favoriteId = favorites.find(favorite => favorite.id)?.id

  return (
    <div className="sm:mt-8 sm:px-6">
      <CatView
        cat={cat}
        breedCat={breedCat}
        favoriteId={favoriteId}
        className="shadow-sm sm:border"
      />
    </div>
  )
}
