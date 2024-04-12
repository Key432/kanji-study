"use client";

import { Tabs, TextField } from "@radix-ui/themes";

import { ContentLayout } from "@/components/base/layout/ContentLayout";

import { useYojijukugo } from "@/features/yojijukugo/hooks/useYojijukugo";

export function YojijukugoEditor() {
  const { insertRecord } = useYojijukugo();
  const { fullTextRegister } = insertRecord();
  return (
    <ContentLayout title="四字熟語登録">
      <div className="px-4">
        <Tabs.Root defaultValue="editor">
          <Tabs.List color="crimson">
            <Tabs.Trigger value="editor">登録フォーム</Tabs.Trigger>
            <Tabs.Trigger value="comfirm">見え方確認</Tabs.Trigger>
          </Tabs.List>

          <div className="pt-2">
            <Tabs.Content value="editor">
              <div className="grid grid-cols-4">
                <label>
                  <div>四字熟語</div>
                  <TextField.Root {...fullTextRegister} autoComplete="off" />
                </label>
              </div>
            </Tabs.Content>

            <Tabs.Content value="comfirm">
              <div>確認</div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </ContentLayout>
  );
}
