import { YojijukugoList } from "@/components/pages/Yojijukugo/List";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return <YojijukugoList params={searchParams} />;
}
