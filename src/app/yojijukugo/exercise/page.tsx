import { Metadata } from "next";

import { YojijukugoExerciseMenu } from "@/components/pages/Yojijukugo/Exercise/Menu";

export const metadata: Metadata = {
  title: "四字熟語演習メニュー",
};

export default function Page() {
  return <YojijukugoExerciseMenu />;
}
