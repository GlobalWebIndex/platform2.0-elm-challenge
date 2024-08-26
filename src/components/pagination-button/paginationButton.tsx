"use client";

//import { createAddFavouritesQueryBody, createUserID } from "@/lib/utils";
import styles from "./paginationButton.module.scss";
import type { PAGINATION_BUTTON_DATA } from "@/lib/types";
import { Suspense, useActionState } from "react";
import { getImagesPerPage } from "@/serverActions/getImagesPerPage";
import CatImage from "../cat-image-comp/catImage";
import { useFormState } from "react-dom";

const initState: PAGINATION_BUTTON_DATA = {
  page: 0,
  images: [],
  error: "",
};

export default function PaginationButton() {
  //const [state, action] = useActionState(getImagesPerPage, initState);
  const [state, action] = useFormState(getImagesPerPage, initState);

  return (
    <>
      {state.images.map((image) => {
        return (
          <li key={image.id}>
            <CatImage imageDetails={image} />
          </li>
        );
      })}
      <li key="-1">
        <form action={action}>
          <button className="pageButton">
            <div>+</div>
          </button>
        </form>
      </li>
    </>
  );
}
