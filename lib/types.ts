export type Breed = {
  id: string
  name: string
  origin: string
  description: string
  temperament: string
  reference_image_id: string
}

export type BreedWithImages = {
  id: string
  name: string
  origin: string
  avatarSrc: string
  cats: Cat[]
}

export type Cat = {
  id: string
  url: string
  breeds: Breed[]
}

export type Favorite = {
  id: string
  image: {
    id: string
    url: string
  }
}
