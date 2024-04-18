"use client";

import { Button, Heading } from "@radix-ui/themes";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";

import { Grade } from "@/constant/grades";
import { ConfigHover } from "@/features/exercise/components/SettingHover";
import {
  Answer,
  Config,
  Exercise,
  Question,
  useExercise,
} from "@/features/exercise/hooks/useExercise";
import { useYojijukugo } from "@/features/yojijukugo/hooks/useYojijukugo";

import { ExerciseResult } from "./ExerciseResult";
import { QuestionForm } from "./QuestionForm";
import { ConfigForm } from "../ConfigForm";

export interface YojijukugoWritingQuestion extends Question {
  yojijukugo_id: number;
  question: string;
}

export interface YojijukugoWritingAnswer extends Answer {
  yojijukugo_id: number;
  answer: string;
}

export interface YojijukugoWritingConfig extends Config {
  grades: Grade[];
  excludeNO: boolean;
  excludePrimary: boolean;
}

export type YojijukugoWritingOption = {
  meaning: string;
};

const values: BreadcrumbProps["values"] = [
  { text: "トップ", href: "/" },
  { text: "四字熟語", href: "/yojijukugo" },
  { text: "演習メニュー", href: "/yojijukugo/exercise" },
  { text: "よみ→熟語" },
];

export function YojijukugoExerciseWriting() {
  const { selectRandomRecords } = useYojijukugo();
  const {
    status,
    config,
    question,
    count,
    results,
    configureExercise,
    goNextQuestion,
    submitAnswer,
    reset,
    restart,
  } = useExercise<
    YojijukugoWritingQuestion,
    YojijukugoWritingAnswer,
    YojijukugoWritingOption,
    YojijukugoWritingConfig
  >({
    fetchExerciseDispatch: async (config) => {
      const { grades, count, ...remain } = config;
      const data = await selectRandomRecords(
        { ...remain, grade_id: grades },
        count,
      );
      if (!data) return null;
      const questions: Exercise<
        YojijukugoWritingQuestion,
        YojijukugoWritingAnswer,
        YojijukugoWritingOption
      >[] = data.map((item) => {
        const { yojijukugo_id, full_text, full_text_reading, meaning } = item;
        const question: YojijukugoWritingQuestion = {
          yojijukugo_id: yojijukugo_id,
          question: full_text_reading,
        };
        const answer: YojijukugoWritingAnswer = {
          yojijukugo_id: yojijukugo_id,
          answer: full_text,
        };
        const option: YojijukugoWritingOption = {
          meaning: meaning,
        };
        return {
          target_id: yojijukugo_id,
          question,
          answer,
          option,
          confirm: (inputtedAnswer) => inputtedAnswer as boolean,
        };
      });
      return questions;
    },
  });

  return (
    <ContentLayout title="四字熟語演習・筆記">
      <Breadcrumb values={values} />
      <div className="mx-4 mt-2">
        {status === "READY" && (
          <div>
            <Heading as="h2">出題設定</Heading>
            <ConfigForm
              configureExercise={configureExercise}
              className="mt-4"
            />
          </div>
        )}
        {status === "PROGRESS" && question && (
          <div>
            <div className="flex justify-start items-end">
              <Heading>
                <p className="pr-2">{`第${count}問`}</p>
              </Heading>
              <ConfigHover config={config} />
            </div>
            <QuestionForm
              question={question}
              next={goNextQuestion}
              submitAnswer={submitAnswer}
            />
          </div>
        )}
        {status === "DONE" && (
          <div>
            <div className="flex justify-start items-end">
              <Heading>
                <p className="pr-2">演習結果</p>
              </Heading>
              <ConfigHover config={config} />
            </div>
            <ExerciseResult results={results} />
            <div className="my-4 text-center">
              <Button
                className="bg-primary-default m-2 cursor-pointer active:translate-y-0.5"
                onClick={reset}
              >
                設定からしなおす
              </Button>
              <Button
                className="bg-secondary-default m-2 cursor-pointer active:translate-y-0.5"
                onClick={() => void restart()}
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
