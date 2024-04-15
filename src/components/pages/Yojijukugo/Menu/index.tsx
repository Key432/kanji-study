import { supabase } from "@/libs/supabase/client";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";
import { Heading } from "@/components/ui/Heading";
import { MenuBox } from "@/components/ui/MenuCard";

export const revalidate = /*60 * 60 * 24*/ 0;

const values: BreadcrumbProps["values"] = [
  { text: "トップ", href: "/" },
  { text: "四字熟語" },
];

export async function YojijukugoMenu() {
  const { count } = await supabase
    .from("yojijukugo")
    .select("*", { count: "exact" });
  const { count: relationalCount } = await supabase
    .from("relational_yojijukugo")
    .select("*", { count: "exact" });
  return (
    <ContentLayout title="四字熟語">
      <Breadcrumb values={values} />
      <div className="px-4">
        <div className="py-2">
          <Heading as="h2" className="pb-2">
            メニュー
          </Heading>
          <div className="grid grid-cols-3 gap-4">
            <MenuBox
              heading="一覧／検索"
              href="/yojijukugo/list"
              className="col-span-3 md:col-span-1"
              hasMounted
            >
              <p>登録されている四字熟語の一覧を表示します。検索もできます。</p>
            </MenuBox>
            <MenuBox
              heading="演習"
              className="col-span-3 md:col-span-1"
              href="/yojijukugo/exercise"
              hasMounted
            >
              <p>登録されている四字熟語で問題演習を行います。</p>
            </MenuBox>
            <MenuBox
              heading="登録"
              className="col-span-3 md:col-span-1"
              href="/yojijukugo/edit"
              hasMounted
            >
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
