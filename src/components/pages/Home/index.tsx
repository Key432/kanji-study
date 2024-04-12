import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { TitleLogo } from "@/components/base/logo/TitleLogo";
import { Heading } from "@/components/ui/Heading";

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
