import { Metadata } from "next";

import { VocabularyNote } from "@/components/pages/VocabularyNote";

export const metadata: Metadata = {
  title: "語彙ノート",
};

export default function Page() {
  return <VocabularyNote />;
}
