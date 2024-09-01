import { FavoriteCard } from '@/components/favorite/favorite-card'
import { getFavorites } from '@/lib/api'

export default async function FavoritesPage() {
  const favorites = await getFavorites()

  return (
    <>
      <div className="mx-auto mb-4 mt-6 w-full px-4 sm:mb-2 sm:mt-8 sm:w-[min(470px,100vw)] sm:px-6">
        <div className="flex items-center gap-3">
          <h1 className="cursor-default font-bold">Favorites</h1>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-1 flex-col items-center px-0 pb-8 sm:w-[min(470px,100vw)] md:px-6">
        {favorites && favorites.length !== 0 ? (
          favorites.map(favorite => (
            <FavoriteCard
              key={favorite.id}
              favoriteId={favorite.id}
              image={favorite.image}
            />
          ))
        ) : (
          <div>You have no favorites.</div>
        )}
      </div>
    </>
  )
}
