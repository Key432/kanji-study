import Link from "next/link";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";

import { gradeMapping } from "@/constant/grades";
import { RelationalTable } from "@/features/yojijukugo/components/RelationalTable";
import { useYojijukugo } from "@/features/yojijukugo/hooks/useYojijukugo";

const values: BreadcrumbProps["values"] = [
  {
    text: "トップ",
    href: "/",
  },
  {
    text: "四字熟語",
    href: "/yojijukugo",
  },
  {
    text: "一覧",
    href: "/yojijukugo/list",
  },
];

export async function YojijukugoDetail({
  yojijukugo_id,
}: {
  yojijukugo_id: number;
}) {
  const { selectRecord } = useYojijukugo();
  const data = await selectRecord(yojijukugo_id);
  const updatedValues = [...values, { text: data?.full_text ?? "" }];

  const SetTitle = () => (
    <Title
      full_text={data?.full_text ?? ""}
      full_text_reading={data?.full_text_reading ?? ""}
    />
  );

  const synonyms =
    data?.relational_yojijukugo
      .filter((item) => item.type === "SYNONYM")
      .map((item) => {
        return {
          full_text: item.full_text,
          full_text_reading: item.full_text_reading,
          grade_id: item.grade_id,
        };
      }) ?? [];
  const antonyms =
    data?.relational_yojijukugo
      .filter((item) => item.type === "ANTONYM")
      .map((item) => {
        return {
          full_text: item.full_text,
          full_text_reading: item.full_text_reading,
          grade_id: item.grade_id,
        };
      }) ?? [];

  return (
    <ContentLayout title={<SetTitle />}>
      <Breadcrumb values={updatedValues} />
      {data && (
        <div className="mx-2 mt-2">
          <div className="grid grid-rows-5 gap-2 grid-flow-col">
            <div className="row-span-1">
              <h2 className="font-bold text-lg">よみ</h2>
              <p className="ml-2">{data.full_text_reading}</p>
            </div>
            <div className="row-span-2">
              <h2 className="font-bold text-lg">意味</h2>
              <p className="ml-2">{data.meaning}</p>
            </div>
            <div className="row-span-1">
              <h2 className="font-bold text-lg">出典</h2>
              <p className="ml-2">{data.reference ?? "-"}</p>
            </div>
            <div className="row-span-1">
              <h2 className="font-bold text-lg">漢検級</h2>
              <p className="ml-2">{gradeMapping[data.grade_id]}</p>
            </div>
            <div className="row-span-5 flex flex-col justify-between items-center">
              <div className="[writing-mode:vertical-rl]">
                <p className="text-center">{data.text_char_reading_1}</p>
                <span className="flex justify-center items-center size-24 border text-7xl font-klee">
                  {data.text_char_1}
                </span>
              </div>
              <div className="[writing-mode:vertical-rl]">
                <p className="text-center">{data.text_char_reading_2}</p>
                <span className="flex justify-center items-center size-24 border text-7xl font-klee">
                  {data.text_char_2}
                </span>
              </div>
              <div className="[writing-mode:vertical-rl]">
                <p className="text-center">{data.text_char_reading_3}</p>
                <span className="flex justify-center items-center size-24 border text-7xl font-klee">
                  {data.text_char_3}
                </span>
              </div>
              <div className="[writing-mode:vertical-rl]">
                <p className="text-center">{data.text_char_reading_4}</p>
                <span className="flex justify-center items-center size-24 border text-7xl font-klee">
                  {data.text_char_4}
                </span>
              </div>
            </div>
          </div>
          <div className="py-4 grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <h2 className="font-bold text-lg">類義語</h2>
              <RelationalTable data={synonyms} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h2 className="font-bold text-lg">対義語</h2>
              <RelationalTable data={antonyms} />
            </div>
            <div className="col-span-2">
              <h2 className="font-bold text-lg">使用漢字で他の熟語を検索</h2>
              <p className="ml-2">
                <Link href={`/yojijukugo/list?q=${data.text_char_1}`}>
                  {data.text_char_1}
                </Link>
                <span className="mx-4">/</span>
                <Link href={`/yojijukugo/list?q=${data.text_char_2}`}>
                  {data.text_char_2}
                </Link>
                <span className="mx-4">/</span>
                <Link href={`/yojijukugo/list?q=${data.text_char_3}`}>
                  {data.text_char_3}
                </Link>
                <span className="mx-4">/</span>
                <Link href={`/yojijukugo/list?q=${data.text_char_4}`}>
                  {data.text_char_4}
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </ContentLayout>
  );
}

function Title({
  full_text,
  full_text_reading,
}: {
  full_text: string;
  full_text_reading: string;
}) {
  return (
    <div className="text-center font-klee">
      <p className="text-sm">{full_text_reading}</p>
      <p className="font-bold text-2xl sm:text-4xl">{full_text}</p>
    </div>
  );
}
