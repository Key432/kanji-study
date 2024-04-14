"use client";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { YojijukugoForm } from "@/features/yojijukugo/components/Form";
import { useYojijukugo } from "@/features/yojijukugo/hooks/useYojijukugo";

const values = [
  { text: "トップ", href: "/" },
  { text: "四字熟語", href: "/yojijukugo" },
  { text: "登録" },
];

export function YojijukugoEditor() {
  const { insertRecord } = useYojijukugo();

  return (
    <ContentLayout title="四字熟語登録">
      <Breadcrumb values={values} />
      <div className="px-4 my-2">
        <YojijukugoForm onSubmit={insertRecord} />
      </div>
    </ContentLayout>
  );
}
