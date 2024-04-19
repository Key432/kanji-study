import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";

import { Card } from "./Card";
import { VocabularyEditor } from "./Editor";

const values: BreadcrumbProps["values"] = [
  { text: "トップ", href: "/" },
  { text: "語彙ノート" },
];

export function VocabularyNote() {
  return (
    <ContentLayout title={<Title />}>
      <Breadcrumb values={values} />
      <div className="mx-2 mt-2">
        <div className="h-24 flex justify-center items-center">
          <VocabularyEditor />
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          {Array.from({ length: 100 }, (_, i) => {
            return i;
          }).map((i) => (
            <Card key={i} />
          ))}
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
