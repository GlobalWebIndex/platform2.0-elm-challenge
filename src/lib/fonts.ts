import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

export const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const matemasie = localFont({ src: "./matemasie-regular.ttf" });
