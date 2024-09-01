import { getCat, getCatBreed } from '@/lib/api'
import Modal from './modal'

export default async function BreedModalPage({
  params: { id: breedId }
}: {
  params: { id: string }
}) {
  const cats = await getCatBreed(breedId, 3)
  const breedCat = await getCat(cats?.[0]?.breeds?.[0]?.reference_image_id)

  return <Modal cats={cats} breedCat={breedCat} />
}
