import { Metadata } from "next";

import { YojijukugoList } from "@/components/pages/Yojijukugo/List";

export const metadata: Metadata = {
  title: "四字熟語一覧",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return <YojijukugoList params={searchParams} />;
}
