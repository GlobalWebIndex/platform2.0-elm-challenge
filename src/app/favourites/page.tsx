import ImageList from "@/components/image-list-comp/imageList";
import MainSection from "@/components/main-section/mainSection";
import { getFavourites } from "@/lib/data";
import type { FAVOURITE_IMAGE_DETAILS } from "@/lib/types";
import { cookies } from "next/headers";

export default async function Favourites() {
  const cookieStore = cookies();
  const userId: string | undefined = cookieStore.get("userId")?.value;
  let favouriteImages: FAVOURITE_IMAGE_DETAILS[] = [];

  if (userId) {
    favouriteImages = await getFavourites(userId);
  }

  return (
    <MainSection title="My latest favourites...">
      {userId ? (
        <ImageList images={favouriteImages} route="favourites" />
      ) : (
        <p>You have not selected any favourites yet.</p>
      )}
    </MainSection>
  );
}
