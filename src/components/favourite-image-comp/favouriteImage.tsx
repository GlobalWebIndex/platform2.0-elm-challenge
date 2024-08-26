"use client";

import Image from "next/image";
import styles from "./favouriteImage.module.scss";
import type { FAVOURITE_IMAGE_PROPS } from "@/lib/types";
import deleteFavourite from "@/serverActions/deleteFavourite";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FavouriteImage({
  favouriteDetails,
}: FAVOURITE_IMAGE_PROPS) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <div className={styles.favouriteImageContainer}>
      <button
        disabled={pending}
        onClick={async () => {
          setPending(true);
          await deleteFavourite(favouriteDetails.id);
          //No need to set pending to false as we are doing a refresh page
          router.refresh();
        }}
      >
        <Image
          src={favouriteDetails.image.url}
          alt="A beautiful cat"
          className={styles.favouriteImage}
          width={500}
          height={500}
        />
        {pending && (
          <div className={styles.deletingOverlay}>
            <p>Deleting...</p>
          </div>
        )}
        {!pending && (
          <div className={styles.removeOverlay}>
            <p>Remove</p>
          </div>
        )}
      </button>
    </div>
  );
}
