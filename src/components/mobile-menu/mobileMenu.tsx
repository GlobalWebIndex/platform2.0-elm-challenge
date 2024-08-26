"use client";

import Link from "next/link";
import styles from "./mobileMenu.module.scss";
import { DEVICES_MENU_PROPS } from "@/lib/types";
import { useState } from "react";

export default function MobileMenu({ tabs, pathname }: DEVICES_MENU_PROPS) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.sidebar}>
      {!isMenuOpen && (
        <span className="mobileMenuBtn" onClick={() => setIsMenuOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="26px"
            fill="#fff"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </span>
      )}
      {isMenuOpen && (
        <ul>
          <li
            key="closeIcon"
            className="mobileMenuBtn"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              fill="#fff"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </li>
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;

            return (
              <li key={tab.href} className={`${isActive && styles.isActive}`}>
                <Link href={tab.href}>{tab.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
