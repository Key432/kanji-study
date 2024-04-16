import { Metadata } from "next";

import { YojijukugoMenu } from "@/components/pages/Yojijukugo/Menu";

export const metadata: Metadata = {
  title: "四字熟語メニュー",
};

export default function Page() {
  return <YojijukugoMenu />;
}
