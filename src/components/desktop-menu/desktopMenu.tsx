"use client";

import Link from "next/link";
import styles from "./desktopMenu.module.scss";
import { DEVICES_MENU_PROPS } from "@/lib/types";

export default function DesktopMenu({ tabs, pathname }: DEVICES_MENU_PROPS) {
  return (
    <nav className={styles.nav}>
      <ul>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          let classLink = styles.homeLink;
          if (tab.href === "/breeds") classLink = styles.breedsLink;
          if (tab.href === "/favourites") classLink = styles.favouritesLink;

          return (
            <li key={tab.href} className={`${classLink}`}>
              <Link
                href={tab.href}
                className={`${isActive && styles.isActive}`}
              >
                {tab.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
