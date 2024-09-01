import { Breed, BreedWithImages, Cat, Favorite } from '@/lib/types'

const BASE_URL = 'https://api.thecatapi.com'
const API_VERSION = 'v1'
const API_KEY = process.env.API_KEY

if (!API_KEY) {
  throw new Error('API_KEY is not defined in the environment variables')
}

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}/${API_VERSION}${endpoint}`
  const res = await fetch(url, {
    headers,
    ...options
  })

  if (!res.ok) {
    throw new Error(`API request failed: ${res.statusText}`)
  }

  return res.json()
}

export async function getCat(id: string): Promise<Cat> {
  return fetchApi<Cat>(`/images/${id}`)
}

export async function getFavorites(): Promise<Favorite[]> {
  return fetchApi<Favorite[]>('/favourites', { cache: 'no-store' })
}

export async function getFavorite(imageId?: string): Promise<Favorite[]> {
  return fetchApi<Favorite[]>(`/favourites?image_id=${imageId}`, {
    cache: 'no-store'
  })
}

export async function getCatBreed(
  breedId: string,
  limit: number = 3
): Promise<Cat[]> {
  return fetchApi<Cat[]>(`/images/search?limit=${limit}&breed_ids=${breedId}`)
}

export async function getBreeds(
  limit: number = 10,
  page: number = 0
): Promise<Breed[]> {
  return fetchApi<Breed[]>(`/breeds?limit=${limit}&page=${page}`)
}

export async function getCats(
  limit: number = 10,
  page: number = 0
): Promise<Cat[]> {
  return fetchApi<Cat[]>(
    `/images/search?limit=${limit}&page=${page}&has_breeds=1`
  )
}

export async function getBreedsWithImages(
  limit: number = 10,
  page: number = 0
): Promise<BreedWithImages[]> {
  const breeds = await getBreeds(limit, page)

  const breedsWithImages = await Promise.all(
    breeds.map(async (breed: Breed) => {
      const { id, name, origin, reference_image_id } = breed
      const [cat, cats] = await Promise.all([
        getCat(reference_image_id),
        getCatBreed(id)
      ])

      if (!cat) return null

      const { url } = cat
      const catImages = cats
        .filter((cat): cat is Cat & Required<Pick<Cat, 'id' | 'url'>> =>
          Boolean(cat.url && cat.id)
        )
        .map(({ id, url }) => ({ id, url }))

      return {
        id,
        name,
        origin,
        avatarSrc: url,
        cats: catImages
      }
    })
  )

  return breedsWithImages.filter(
    (breed): breed is BreedWithImages => breed !== null
  )
}
