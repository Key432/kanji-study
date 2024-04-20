import { Metadata } from "next";

import { VocabularyNote } from "@/components/pages/VocabularyNote";

export const metadata: Metadata = {
  title: "語彙ノート",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return <VocabularyNote />;
}
