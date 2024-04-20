import { supabase } from "@/libs/supabase/client";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";

import { Card } from "./Card";
import { VocabularyEditor } from "./Editor";

const values: BreadcrumbProps["values"] = [
  { text: "トップ", href: "/" },
  { text: "語彙ノート" },
];

export const revalidate = 0;

export async function VocabularyNote() {
  const { data } = await supabase
    .from("vocabulary")
    .select("*")
    .order("created_at");

  return (
    <ContentLayout title={<Title />}>
      <Breadcrumb values={values} />
      <div className="mx-2 mt-2">
        <div className="h-24 flex justify-center items-center">
          <VocabularyEditor />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data &&
            data.map((item) => {
              const { vocabulary_id } = item;
              // NOTE: アサーションが効いているのにESLintエラーが出る
              // `vocabulary_id as number`とするとビルド時に逆にno-unnecessary-type-assertionが出る
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              return <Card key={vocabulary_id} {...item} />;
            })}
        </div>
      </div>
    </ContentLayout>
  );
}

function Title() {
  return (
    <div className="text-center font-klee">
      <p className="font-bold text-2xl sm:text-4xl">語彙ノート</p>
      <p className="text-sm">これまで出会った知らなかった言葉</p>
    </div>
  );
}
