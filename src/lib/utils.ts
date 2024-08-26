import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { CAT_IMAGE, BREED } from "./types";
import imageNotAvailable from "public/no-image-available.png";

export function getCatImageFromObj(obj: CAT_IMAGE | BREED, pathname: string) {
  let catImage = obj as CAT_IMAGE;
  catImage["routePath"] = `${pathname}?imageId=${catImage.id}`;

  //Check if imageDetails is a BREED object. If so, get it's property image
  // We distinguish betwenn objects by the "name" property, which only exists
  // in the BREED object
  if ((obj as BREED).name) {
    const breed = obj as BREED;
    catImage = breed.image as CAT_IMAGE;

    //There are cases where breeds do not have an image object. If so create it
    if (!catImage) {
      catImage = getDefaultCatImage();
    }

    catImage["alt"] = breed.name;
    catImage["caption"] = breed.name;
    catImage["routePath"] = `/breeds/?breedId=${breed.id}`;
  }

  return catImage;
}

export function createAddFavouritesQueryBody(imageId: string, userId: string) {
  return JSON.stringify({
    image_id: imageId,
    sub_id: userId,
  });
}

function createUserID() {
  //For the purposes of this project we will get the current timestamp
  return Date.now().toString();
}

function getDefaultCatImage() {
  return {
    id: "",
    url: imageNotAvailable.src,
    width: imageNotAvailable.width,
    height: imageNotAvailable.height,
  } as CAT_IMAGE;
}

export function createCookie(cookieStore: ReadonlyRequestCookies) {
  const newUserId = createUserID();
  setUserIdCookie(cookieStore, newUserId, "/");

  return newUserId;
}

function setUserIdCookie(
  cookieStore: ReadonlyRequestCookies,
  newUserId: string,
  path: string
) {
  cookieStore.set({
    name: "userId",
    value: newUserId,
    httpOnly: true,
    path,
    secure: true,
    maxAge: 60 * 60 * 24 * 365 * 1000,
    expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
  });
}
