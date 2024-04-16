import { Metadata } from "next";

import { YojijukugoExerciseReading } from "@/components/pages/Yojijukugo/Exercise/Reading";

export const metadata: Metadata = {
  title: "四字熟語よみ演習",
};

export default function Page() {
  return <YojijukugoExerciseReading />;
}
