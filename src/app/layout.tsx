import type { Metadata } from "next";
import { jakartaSans } from "@/lib/fonts";
import styles from "./layout.module.scss";
import "@/css/styles.scss";
import Header from "@/components/header-comp/header";

export const metadata: Metadata = {
  title: "Cat Lover",
  description: "A site for genuine cat lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakartaSans.className}>
        <div className={styles.container}>
          <Header />
          <main>{children}</main>
          <footer>
            <span>&copy;2024 Copyright by Nick Kremmydas</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
