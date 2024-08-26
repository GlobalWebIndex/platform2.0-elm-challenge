import type { MAIN_SECTION_PROPS } from "@/lib/types";
import styles from "./mainSection.module.scss";

export default function MainSection({ title, children }: MAIN_SECTION_PROPS) {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <section className={styles.section}>{children}</section>
    </>
  );
}
