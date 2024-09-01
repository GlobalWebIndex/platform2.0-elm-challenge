import { getCat, getFavorite } from '@/lib/api'
import Modal from './modal'

export default async function CatModalPage({
  params: { id: catId }
}: {
  params: { id: string }
}) {
  const cat = await getCat(catId)
  const breedCat = await getCat(cat?.breeds?.[0]?.reference_image_id)

  const favorites = await getFavorite(catId)
  const favoriteId = favorites.find(favorite => favorite.id)?.id

  return <Modal cat={cat} refCat={breedCat} favoriteId={favoriteId} />
}
