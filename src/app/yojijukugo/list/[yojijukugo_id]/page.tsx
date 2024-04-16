import { Metadata } from "next";

import { supabase } from "@/libs/supabase/client";

import { YojijukugoDetail } from "@/components/pages/Yojijukugo/Detail";

export async function generateMetadata({
  params: { yojijukugo_id },
}: {
  params: { yojijukugo_id: number };
}): Promise<Metadata> {
  const { data } = await supabase
    .from("yojijukugo")
    .select("full_text")
    .eq("yojijukugo_id", yojijukugo_id)
    .single();

  return {
    title: data?.full_text ?? "",
  };
}

export default function Page({
  params: { yojijukugo_id },
}: {
  params: { yojijukugo_id: number };
}) {
  return <YojijukugoDetail yojijukugo_id={yojijukugo_id} />;
}
