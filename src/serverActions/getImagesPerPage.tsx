"use server";

import { CAT_IMAGE, PAGINATION_BUTTON_DATA } from "@/lib/types";

export async function getImagesPerPage(
  previousState: PAGINATION_BUTTON_DATA,
  formData: FormData
): Promise<PAGINATION_BUTTON_DATA> {
  try {
    //Get cat images without the api key by default
    const page = ++previousState.page;
    let url = `${process.env.THE_CAT_API_SEARCH_URL}?limit=${
      process.env.DEFAULT_LIMIT
    }&order=${
      process.env.DEFAULT_ORDER
    }&page=${++previousState.page}&x-api-key=${process.env.API_KEY}}`;

    const res = await fetch(url);
    const images = (await res.json()) as CAT_IMAGE[];
    const new_image_list = [...previousState.images, ...images];

    return {
      page,
      images: new_image_list,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      page: 0,
      images: [] as CAT_IMAGE[],
      error: "ERROR RETRIEVING IMAGES",
    };
  }
}
