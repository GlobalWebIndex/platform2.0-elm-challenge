"use client";

import styles from "./favouritesButton.module.scss";
import type { FAVOURITES_BUTTON } from "@/lib/types";
import addFavourite from "@/serverActions/addFavourite";
import useFavouritesButton from "@/hooks/favourite-button-hook";

export default function FavouritesButton({
  imageId,
  onClick,
}: FAVOURITES_BUTTON) {
  const {
    pending,
    isImageAddedToFavourites,
    text,
    setPending,
    setIsImageAddedToFavourites,
  } = useFavouritesButton(imageId);

  return (
    <button
      type="button"
      onClick={async () => {
        setPending(true);
        await addFavourite(imageId);
        setPending(false);
        setIsImageAddedToFavourites(true);
        onClick?.();
      }}
      className={`${
        (isImageAddedToFavourites || pending) && styles.disabled
      } btn round`}
      disabled={isImageAddedToFavourites || pending}
    >
      {text}
    </button>
  );
}
