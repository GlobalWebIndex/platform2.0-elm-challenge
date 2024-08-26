"use client";

import { useRef } from "react";
import styles from "./modal.module.scss";
import { MODAL_PROPS } from "@/lib/types";
import { useRouter } from "next/navigation";
import FavouritesButton from "../favourites-button/favouritesButton";
import useModal from "@/hooks/modal-hook";

export default function Modal({ title, children }: MODAL_PROPS) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const router = useRouter();
  const { imageId, onCloseDialog, closeDialog } = useModal(dialogRef, router);

  return (
    <dialog onClose={onCloseDialog} className={styles.dialog} ref={dialogRef}>
      <div className={styles.container}>
        <header>
          <h3 className="title">{title}</h3>
          <button onClick={closeDialog} className="btn">
            X
          </button>
        </header>
        <main>{children}</main>
        <footer>
          {imageId && <FavouritesButton imageId={imageId} />}
          <button onClick={closeDialog} className="btn round">
            Close
          </button>
        </footer>
      </div>
    </dialog>
  );
}
