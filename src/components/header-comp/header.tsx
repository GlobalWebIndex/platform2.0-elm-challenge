import Image from "next/image";
import styles from "./header.module.scss";
import heroImage from "public/cat2_bg.jpg";
import { matemasie } from "@/lib/fonts";
import Menu from "../menu-comp/menu";

export default function Header() {
  const menuTabs = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/breeds",
      title: "Cat Breeds",
    },
    {
      href: "/favourites",
      title: "My Favourites",
    },
  ];

  return (
    <header className={styles.header}>
      <Image
        src={heroImage}
        alt="A lying cat"
        className={styles.hero}
        placeholder="blur"
        sizes="100vw"
      />
      <Menu tabs={menuTabs} />
      <p className={`${styles.logo} ${matemasie.className}`}>CatLover</p>
      <div className={styles.heroParagraph}>
        <h1>A site for genuine cat enthusiasts</h1>
        <h2>
          Search between dozens of cat breeds and hundreds of cats, to pick your
          favourites!!!
        </h2>
      </div>
    </header>
  );
}
