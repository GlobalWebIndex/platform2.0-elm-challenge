import {
  BREED,
  CAT_IMAGE,
  FAVOURITE_IMAGE_DETAILS,
  IMAGE_LIST_PROPS,
} from "@/lib/types";
import CatImage from "../cat-image-comp/catImage";
import styles from "./imageList.module.scss";
import { Suspense } from "react";
import FavouriteImage from "../favourite-image-comp/favouriteImage";
import PaginationButton from "../pagination-button/paginationButton";

export default function ImageList({
  images,
  route = "home",
}: IMAGE_LIST_PROPS) {
  return (
    <ul className={styles.imageList}>
      {images.map((imageDetails) => {
        //imageDetails is either a cat image object or a breed object or favourite image object
        //We must define which is which
        let favouriteImageDetails;
        let catImagesDetails;

        if (route === "favourites") {
          favouriteImageDetails = imageDetails as FAVOURITE_IMAGE_DETAILS;
        } else {
          catImagesDetails = imageDetails as CAT_IMAGE | BREED;
        }
        return (
          <li key={imageDetails.id}>
            {/* TODO: A better loading skeleton */}
            <Suspense fallback={<div>Loading...</div>}>
              {(favouriteImageDetails && (
                <FavouriteImage favouriteDetails={favouriteImageDetails} />
              )) ||
                (catImagesDetails && (
                  <CatImage imageDetails={catImagesDetails} />
                ))}
            </Suspense>
          </li>
        );
      })}
      {route === "home" && <PaginationButton />}
    </ul>
  );
}
