import { Metadata } from "next";

import { YojijukugoExerciseMenu } from "@/components/pages/Yojijukugo/Exercise/Menu";

export const metadata: Metadata = {
  title: "四字熟語 | 書き",
};

export default function Page() {
  return <YojijukugoExerciseMenu />;
}
