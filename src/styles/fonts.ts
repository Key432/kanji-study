import {
  Klee_One,
  Zen_Antique,
  Noto_Color_Emoji,
  Stick,
} from "next/font/google";

export const kleeOne = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-klee-one",
});

export const zenAntique = Zen_Antique({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen-antique",
});

export const notoColorEmoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: ["400"],
  variable: "--font-noto-color-emoji",
});

export const stick = Stick({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-stick",
});
