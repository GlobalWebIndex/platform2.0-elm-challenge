"use server";

export default async function deleteFavourite(
  favouriteId: number
): Promise<string> {
  try {
    const url = `${process.env.THE_CAT_API_URL_FAVOURITES}/${favouriteId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-api-key": `${process.env.API_KEY}`,
      },
    });
    const data = await res.json();

    return data.message;
  } catch (error) {
    console.log(error);
    //if there is an error return server error message
    //TODO: Better error handling
    return "ERROR";
  }
}
