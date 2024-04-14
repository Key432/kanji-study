import { YojijukugoDetail } from "@/components/pages/Yojijukugo/Detail";

export default function Page({
  params: { yojijukugo_id },
}: {
  params: { yojijukugo_id: number };
}) {
  return <YojijukugoDetail yojijukugo_id={yojijukugo_id} />;
}
