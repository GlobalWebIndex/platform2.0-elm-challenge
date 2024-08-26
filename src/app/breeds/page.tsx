import ImageList from "@/components/image-list-comp/imageList";
import { getCatBreeds, getCatsByBreedId } from "@/lib/data";
import MainSection from "@/components/main-section/mainSection";
import { BREEDS_PAGE_PROPS, CAT_IMAGE } from "@/lib/types";
import Modal from "@/components/modal-comp/modal";
import { Suspense } from "react";
import styles from "./page.module.scss";
import ImageDetails from "@/components/image-details/imageDetails";

export default async function Breeds({ searchParams }: BREEDS_PAGE_PROPS) {
  //Get the breeds here and pass it down to ImageList, so I can reuse ImageList
  const catBreeds = await getCatBreeds();
  const breedId = searchParams?.breedId;
  const imageId = searchParams?.imageId;
  let catImages: CAT_IMAGE[] = [];

  if (breedId) {
    catImages = await getCatsByBreedId(breedId);
  }

  return (
    <div className={styles.breedsContainer}>
      <MainSection title="Check out some cat breeds">
        <ImageList images={catBreeds} route="breeds" />
      </MainSection>
      {/* We need two modals here, one for when clicking at a specific breed and 
      a second one for when clicking at a specific cat of that breed.
      Modals are initially hidden
       */}

      {breedId && (
        <Modal title="Breed members">
          <>
            {breedId && (
              // TODO: A better loading skeleton
              <Suspense fallback={<div>Loading...</div>}>
                {catImages.length === 0 ? (
                  <div>Not a valid breedId</div>
                ) : (
                  <ImageList images={catImages} route="breeds" />
                )}
              </Suspense>
            )}
          </>
        </Modal>
      )}

      {imageId && (
        <Modal title="Breed Details">
          <>
            {imageId && (
              // TODO: A better loading skeleton
              <Suspense fallback={<div>Loading...</div>}>
                <ImageDetails id={imageId} />
              </Suspense>
            )}
          </>
        </Modal>
      )}
    </div>
  );
}
