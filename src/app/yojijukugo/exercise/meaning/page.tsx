import { Metadata } from "next";

import { YojijukugoExerciseMeaning } from "@/components/pages/Yojijukugo/Exercise/Meaning";

export const metadata: Metadata = {
  title: "四字熟語 | 意味",
};

export default function Page() {
  return <YojijukugoExerciseMeaning />;
}
