"use server";

import { createAddFavouritesQueryBody, createCookie } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function addFavourite(
  imageId: string
): Promise<{ id: string }> {
  let userId: string = "";

  const cookieStore = cookies();
  //Check if we already have a userId cookie and set it if not
  if (cookieStore.has("userId")) {
    userId = cookieStore.get("userId")?.value || "";
  } else {
    userId = createCookie(cookieStore);
  }

  const data = createAddFavouritesQueryBody(imageId, userId);

  const url = `${process.env.THE_CAT_API_URL_FAVOURITES}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.API_KEY}`,
      },
      body: data,
    });
    const returnData = await res.json();

    revalidatePath("/favourites");

    return returnData;
  } catch (error) {
    //TODO: Better error handling
    return { id: "ERROR" };
  }
}
