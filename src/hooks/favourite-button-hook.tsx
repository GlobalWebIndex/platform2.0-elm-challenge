import { useState, useEffect } from "react";
import isFavourite from "../serverActions/isFavourite";

export default function useFavouritesButton(imageId: string) {
  const [isImageAddedToFavourites, setIsImageAddedToFavourites] =
    useState(false);
  const [pending, setPending] = useState(false);
  let text = "Add to favourites";

  //Make a request when first rendering the button
  // in order to check if image has already been added to favourites
  useEffect(() => {
    let requestIsCancelled = false;

    const getIsFavourite = async () => {
      const isFavouriteObj = await isFavourite(imageId);
      setIsImageAddedToFavourites(isFavouriteObj.isFavourite);
    };

    //Just so to prevent possible unnecessary requests
    //Couldn't use Signal on server action
    if (!requestIsCancelled) {
      getIsFavourite();
    }

    return () => {
      requestIsCancelled = true;
    };
  }, []);

  if (pending) {
    text = "Adding to favourites...";
  }

  if (isImageAddedToFavourites) {
    text = "Added to favourites";
  }

  return {
    pending,
    isImageAddedToFavourites,
    text,
    setPending,
    setIsImageAddedToFavourites
  }
}