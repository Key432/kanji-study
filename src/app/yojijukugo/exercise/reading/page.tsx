import { Metadata } from "next";

import { YojijukugoExerciseReading } from "@/components/pages/Yojijukugo/Exercise/Reading";

export const metadata: Metadata = {
  title: "四字熟語 | よみ",
};

export default function Page() {
  return <YojijukugoExerciseReading />;
}
