import ImageList from "@/components/image-list-comp/imageList";
import { getCatImages } from "@/lib/data";
import MainSection from "@/components/main-section/mainSection";
import Modal from "@/components/modal-comp/modal";
import styles from "./page.module.scss";
import ImageDetails from "@/components/image-details/imageDetails";
import { HOME_PAGE_PROPS } from "@/lib/types";
import { Suspense } from "react";

export default async function Home({ searchParams }: HOME_PAGE_PROPS) {
  //Get the images here and pass it down to ImagesList, so I can reuse ImageList
  const catImages = await getCatImages(10, "RAND", 0, true);
  const imageId = searchParams?.imageId;

  return (
    <>
      <MainSection title="Look at these beauties!!!">
        <ImageList images={catImages} />
      </MainSection>
      {/* Modal initially is hidden. See Modal component */}
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
    </>
  );
}
