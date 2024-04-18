import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";
import { MenuBox } from "@/components/ui/MenuCard";

const values: BreadcrumbProps["values"] = [
  { text: "トップ", href: "/" },
  { text: "四字熟語", href: "/yojijukugo" },
  { text: "演習メニュー" },
];

export function YojijukugoExerciseMenu() {
  return (
    <ContentLayout title="四字熟語演習メニュー">
      <Breadcrumb values={values} />
      <div className="px-2 my-2 grid grid-cols-2 gap-4">
        <MenuBox
          heading="熟語→よみ"
          href="/yojijukugo/exercise/reading"
          className="col-span-2 md:col-span-1"
          hasMounted
        >
          <p>四字熟語から読み方を答えます</p>
        </MenuBox>
        <MenuBox
          heading="よみ→漢字"
          href="/yojijukugo/exercise/writing"
          className="col-span-2 md:col-span-1"
          hasMounted
        >
          <p>読み仮名で出題します。紙に漢字を書けたかを記録します</p>
        </MenuBox>
        <MenuBox
          heading="熟語→意味"
          href="/yojijukugo/exercise/meaning"
          className="col-span-2 md:col-span-1"
          hasMounted
        >
          <p>四字熟語から意味を４択で答えます</p>
        </MenuBox>
        <MenuBox
          heading="上二文字→下二文字"
          href="/yojijukugo/exercise/top2"
          className="col-span-2 md:col-span-1"
        >
          <p>上二文字で出題します。下二文字が書けたかを記録します</p>
        </MenuBox>
        <MenuBox
          heading="下二文字→上二文字"
          href="/yojijukugo/exercise/bottom2"
          className="col-span-2 md:col-span-1"
        >
          <p>下二文字で出題します。上二文字が書けたかを記録します</p>
        </MenuBox>
      </div>
    </ContentLayout>
  );
}
