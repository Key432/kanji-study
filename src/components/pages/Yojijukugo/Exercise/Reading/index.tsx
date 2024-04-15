"use client";

import { Button } from "@radix-ui/themes";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";
import { Heading } from "@/components/ui/Heading";

import { ExerciseForm } from "@/features/exercise/components/ExerciseForm";
import { ExerciseResult } from "@/features/exercise/components/ExerciseResult";
import { SettingForm } from "@/features/exercise/components/SettingForm";
import { SettingHover } from "@/features/exercise/components/SettingHover";
import { useExercise } from "@/features/exercise/hooks/useExercise";

const values: BreadcrumbProps["values"] = [
  { text: "トップ", href: "/" },
  { text: "四字熟語", href: "/yojijukugo" },
  { text: "演習メニュー", href: "/yojijukugo/exercise" },
  { text: "熟語→よみ" },
];

export function YojijukugoExerciseReading() {
  const { status, setExerciseSetting, askQuestion, showResult, reset } =
    useExercise("YOJIJUKUGO");
  const { onSubmit, setting } = setExerciseSetting();
  const { questionCount, question, next, submitAnswer } = askQuestion();

  return (
    <ContentLayout title="四字熟語演習・よみ">
      <Breadcrumb values={values} />
      <div className="mx-4 mt-2">
        {status === "READY" && (
          <div>
            <Heading as="h2">演習設定</Heading>
            <SettingForm onSubmit={onSubmit} className="mt-2" />
          </div>
        )}
        {status === "PROGRESS" && (
          <div>
            <div className="flex justify-start items-end">
              <Heading as="h2" className="pr-2">
                {`第${questionCount?.nowAsking ?? "-"}問`}
              </Heading>
              <SettingHover setting={setting} />
            </div>
            <ExerciseForm
              question={question}
              next={next}
              submitAnswer={submitAnswer}
            />
          </div>
        )}
        {status === "DONE" && (
          <div>
            <div className="flex justify-start items-end">
              <Heading as="h2" className="pr-2">
                演習結果
              </Heading>
              <SettingHover setting={setting} />
            </div>
            <ExerciseResult {...showResult()} />
            <div className="my-4 text-center">
              <Button className="bg-primary-default mx-2" onClick={reset}>
                設定からしなおす
              </Button>
              <Button
                className="bg-secondary-default mx-2"
                onClick={() => setting && void onSubmit(setting)}
              >
                同じ設定でもう一回
              </Button>
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
