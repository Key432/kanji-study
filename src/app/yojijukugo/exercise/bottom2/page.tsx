import { Metadata } from "next";

import { YojijukugoExerciseBottom2 } from "@/components/pages/Yojijukugo/Exercise/Bottom2";

export const metadata: Metadata = {
  title: "四字熟語 | 下二文字",
};

export default function Page() {
  return <YojijukugoExerciseBottom2 />;
}
