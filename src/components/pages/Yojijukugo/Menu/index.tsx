import { supabase } from "@/libs/supabase/client";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Heading } from "@/components/ui/Heading";
import { MenuBox } from "@/components/ui/MenuCard";

export const revalidate = 60 * 60 * 24;

export async function YojijukugoMenu() {
  const { count } = await supabase
    .from("yojijukugo")
    .select("*", { count: "exact" });
  const { count: relationalCount } = await supabase
    .from("relational_yojijukugo")
    .select("*", { count: "exact" });
  return (
    <ContentLayout title="四字熟語">
      <div className="px-4">
        <div className="py-2">
          <Heading as="h2" className="pb-2">
            メニュー
          </Heading>
          <div className="grid grid-cols-3 gap-4">
            <MenuBox heading="一覧／検索" href="/yojijukugo/list">
              <p>登録されている四字熟語の一覧を表示します。検索もできます。</p>
            </MenuBox>
            <MenuBox heading="演習" href="/yojijukugo/exercise">
              <p>登録されている四字熟語で問題演習を行います。</p>
            </MenuBox>
            <MenuBox heading="登録" href="/yojijukugo/edit" hasMounted>
              <p>新しく四字熟語を登録します。</p>
            </MenuBox>
          </div>
        </div>
        <div className="py-2">
          <Heading as="h2" className="pb-2">
            統計
          </Heading>
          <div className="grid grid-cols-3 gap-4">
            <MenuBox className="active:translate-y-0">
              <p className="pr-10">登録数</p>
              <p className="text-4xl font-stick">{count}件</p>
            </MenuBox>
            <MenuBox className="active:translate-y-0">
              <p className="pr-10">関連語数</p>
              <p className="text-4xl font-stick">{relationalCount}件</p>
            </MenuBox>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}