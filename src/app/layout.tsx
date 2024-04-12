import { Theme } from "@radix-ui/themes";

import { RootLayout as Layout } from "@/components/base/layout/RootLayout";

import { kleeOne, notoColorEmoji, stick, zenAntique } from "@/styles/fonts";

import type { Metadata } from "next";

import "@radix-ui/themes/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 語彙力あげあげ委員会",
    default: "語彙力あげあげ委員会",
  },
  description: "Kenji Study Tool Key432",
  robots: {
    index: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${zenAntique.variable} ${kleeOne.variable} ${notoColorEmoji.variable} ${stick.variable}`}
      >
        <Theme appearance="light" className="h-full">
          <Layout>{children}</Layout>
        </Theme>
      </body>
    </html>
  );
}
