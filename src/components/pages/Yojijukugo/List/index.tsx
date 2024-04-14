import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { gradeMapping } from "@/constant/grades";
import { ListTable } from "@/features/yojijukugo/components/ListTable";
import {
  FilterParams,
  useYojijukugo,
} from "@/features/yojijukugo/hooks/useYojijukugo";

import { ListFilter } from "./ListFilter";

const values = [
  { text: "トップ", href: "/" },
  { text: "四字熟語", href: "/yojijukugo" },
  { text: "一覧" },
];

export const validateGradeIds = (
  gradeIds?: string,
): (keyof typeof gradeMapping)[] => {
  return gradeIds
    ? (gradeIds
        .split(",")
        .filter((gid) =>
          Object.keys(gradeMapping).includes(gid),
        ) as (keyof typeof gradeMapping)[])
    : [];
};

export const constructFilterParams = (params?: {
  [key: string]: string;
}): FilterParams => {
  return {
    q: params?.q ?? undefined,
    grade_id: params?.grade_id ? validateGradeIds(params.grade_id) : undefined,
    excludeNO: params?.excludeNO ? true : false ?? undefined,
    excludePrimary: params?.excludePrimary ? true : false ?? undefined,
    onlyNO: params?.onlyNO ? true : false ?? undefined,
    onlyPrimary: params?.onlyPrimary ? true : false ?? undefined,
  };
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function YojijukugoList({
  params,
}: {
  params?: { [key: string]: string };
}) {
  const { selectRecords } = useYojijukugo();
  const { data, count } = await selectRecords(constructFilterParams(params));

  return (
    <ContentLayout title="登録四字熟語一覧">
      <Breadcrumb values={values} />
      <div className="px-4 py-2">
        <p>{count}件が見つかりました</p>
        <div className="py-2">
          <ListFilter params={params} />
        </div>
        <ListTable data={data} />
      </div>
    </ContentLayout>
  );
}
