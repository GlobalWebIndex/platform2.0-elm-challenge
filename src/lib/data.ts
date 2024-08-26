import type { BREED, CAT_IMAGE, FAVOURITE_IMAGE_DETAILS, ORDER } from "./types";

// I need this function to only run on server
export async function getCatImages(
  limit: number = 1,
  order: ORDER = "RAND",
  page = 0,
  useKey = false
): Promise<CAT_IMAGE[]> {
  //Get cat images without the api key by default
  let url = `${process.env.THE_CAT_API_SEARCH_URL}?limit=${limit}&order=${order}&page=${page}`;

  if (useKey) {
    //add the api key to the url
    url += `&api_key=${process.env.API_KEY}`;
  }

  const res = await fetch(url);

  return res.json();
  //TODO: Error Handling
}

export async function getCatBreeds(): Promise<BREED[]> {
  const res = await fetch(`${process.env.THE_CAT_API_URL_BREEDS}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_KEY}`,
    },
  });

  return res.json();
  //TODO: Error Handling
}

export async function getCatDetails(id: string): Promise<CAT_IMAGE> {
  const url = `${process.env.THE_CAT_API_URL_IMAGES}/${id}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.API_KEY}`,
      },
    });

    return getJsonOrText(res);
  } catch (e) {
    return {
      id: "",
      url: "",
      error: "Uknown error",
    };
  }
}

export async function getCatsByBreedId(id: string): Promise<CAT_IMAGE[]> {
  const url = `${process.env.THE_CAT_API_SEARCH_URL}?limit=100&breed_ids=${id}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_KEY}`,
    },
  });

  return res.json();
  //TODO: Error Handling
}

export async function getFavourites(
  userId: string
): Promise<FAVOURITE_IMAGE_DETAILS[]> {
  const url = `${process.env.THE_CAT_API_URL_FAVOURITES}?sub_id=${userId}&limit=100&order=DESC`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_KEY}`,
    },
  });

  const data = await res.json();
  return data;
  //TODO: Error Handling
}

async function getJsonOrText(res: Response) {
  const headers = res.headers;
  let error = "";

  if (headers.get("content-type") === "text/plain; charset=utf-8") {
    error = await res.text();

    return {
      id: "",
      url: "",
      error,
    };
  }

  return res.json();
}
