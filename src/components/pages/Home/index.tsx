import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { TitleLogo } from "@/components/base/logo/TitleLogo";
import { Heading } from "@/components/ui/Heading";
import { MenuBox } from "@/components/ui/MenuCard";

import { roadmap } from "@/constant/roadmap";

import { Roadmap } from "./Roadmap";

export function Home() {
  return (
    <ContentLayout title={<TitleLogo className="text-2xl sm:text-4xl" />}>
      <div className="px-4">
        <Heading as="h2" className="py-2">
          ページについて
        </Heading>
        <div className="px-4">
          <p>製作者が漢検準1級・1級に合格するために作った学習用サイト。</p>
          <p>
            Webサービスのフルスタックエンジニアになるための勉強もできて一石二鳥&#xff01;
          </p>
        </div>
        <Heading as="h2" className="py-2">
          四字熟語
        </Heading>
        <div className="px-4 gap-y-4 grid">
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
        </div>
        <Heading as="h2" className="py-2">
          語彙ノート
        </Heading>
        <div className="px-4 gap-y-4 grid">
          <MenuBox
            heading="語彙ノート"
            href="/vocabulary"
            className="col-span-3 md:col-span-1"
            hasMounted
          >
            <p>知らなかった言葉の集積</p>
          </MenuBox>
        </div>
        <Heading as="h2" className="py-2">
          ロードマップ
        </Heading>
        <div className="px-4">
          <ul className="ml-4">
            {roadmap.map((item, index) => {
              return <Roadmap key={index} roadmap={item} depth={0} />;
            })}
          </ul>
        </div>
      </div>
    </ContentLayout>
  );
}
