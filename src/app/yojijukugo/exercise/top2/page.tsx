import { Metadata } from "next";

import { YojijukugoExerciseTop2 } from "@/components/pages/Yojijukugo/Exercise/Top2";

export const metadata: Metadata = {
  title: "四字熟語 | 上二文字",
};

export default function Page() {
  return <YojijukugoExerciseTop2 />;
}
