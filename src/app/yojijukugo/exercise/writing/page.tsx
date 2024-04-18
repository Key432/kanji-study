import { Metadata } from "next";

import { YojijukugoExerciseWriting } from "@/components/pages/Yojijukugo/Exercise/Writing";

export const metadata: Metadata = {
  title: "四字熟語筆記演習",
};

export default function Page() {
  return <YojijukugoExerciseWriting />;
}
