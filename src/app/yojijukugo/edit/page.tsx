import { Metadata } from "next";

import { YojijukugoEditor } from "@/components/pages/Yojijukugo/Editor";

export const metadata: Metadata = {
  title: "四字熟語登録",
};

export default function Page() {
  return <YojijukugoEditor />;
}
