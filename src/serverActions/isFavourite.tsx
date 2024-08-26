"use server";

export default async function isFavourite(
  imageId: string
): Promise<{ isFavourite: boolean }> {
  try {
    const url = `${process.env.THE_CAT_API_URL_FAVOURITES}`;
    const res = await fetch(url, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-api-key": `${process.env.API_KEY}`,
      },
    });

    let data = await res.json();

    if (data === "NOT_FOUND") {
      return { isFavourite: false };
    }

    for (const favourite of data) {
      if (favourite.image.id === imageId) {
        return { isFavourite: true };
      }
    }

    return { isFavourite: false };
  } catch (error) {
    console.log(error);
    //if there is an error just return false
    //TODO: Better error handling
    return { isFavourite: false };
  }
}
