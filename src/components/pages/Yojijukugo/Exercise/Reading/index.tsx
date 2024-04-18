"use client";

import { Button } from "@radix-ui/themes";

import { ContentLayout } from "@/components/base/layout/ContentLayout";
import { Breadcrumb, BreadcrumbProps } from "@/components/ui/Breadcrumb";
import { Heading } from "@/components/ui/Heading";

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

import { ConfigForm } from "./ConfigForm";
import { ExerciseResult } from "./ExerciseResult";
import { QuestionForm } from "./QuestionForm";

const values: BreadcrumbProps["values"] = [
  { text: "トップ", href: "/" },
  { text: "四字熟語", href: "/yojijukugo" },
  { text: "演習メニュー", href: "/yojijukugo/exercise" },
  { text: "熟語→よみ" },
];

export interface YojijukugoReadingQuestion extends Question {
  yojijukugo_id: number;
  question: string;
}

export interface YojijukugoReadingAnswer extends Answer {
  yojijukugo_id: number;
  answer: string;
}

export interface YojijukugoReadingConfig extends Config {
  grades: Grade[];
  excludeNO: boolean;
  excludePrimary: boolean;
}

export type YojijukugoReadingOption = {
  meaning: string;
};

export function YojijukugoExerciseReading() {
  const { selectRandomRecords } = useYojijukugo();

  const {
    status,
    config,
    count,
    question,
    results,
    configureExercise,
    goNextQuestion,
    submitAnswer,
    reset,
    restart,
  } = useExercise<
    YojijukugoReadingQuestion,
    YojijukugoReadingAnswer,
    YojijukugoReadingOption,
    YojijukugoReadingConfig
  >({
    fetchExerciseDispatch: async (config) => {
      const { grades, count, ...remain } = config;
      const data = await selectRandomRecords(
        { ...remain, grade_id: grades },
        count,
      );
      if (!data) return null;
      const fetchedExercise: Exercise<
        YojijukugoReadingQuestion,
        YojijukugoReadingAnswer,
        YojijukugoReadingOption
      >[] = data.map((item) => {
        const { yojijukugo_id, full_text, full_text_reading, meaning } = item;

        const question: YojijukugoReadingQuestion = {
          yojijukugo_id: yojijukugo_id,
          question: full_text,
        };
        const answer: YojijukugoReadingAnswer = {
          yojijukugo_id: yojijukugo_id,
          answer: full_text_reading,
        };
        const option: YojijukugoReadingOption = {
          meaning: meaning,
        };
        return {
          target_id: yojijukugo_id,
          question: question,
          answer: answer,
          confirm: (inputtedAnswer, answer) => inputtedAnswer === answer.answer,
          option: option,
        };
      });
      return fetchedExercise;
    },
  });

  return (
    <ContentLayout title="四字熟語演習・よみ">
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
                className="bg-primary-default mx-2 cursor-pointer active:translate-y-0.5"
                onClick={reset}
              >
                設定からしなおす
              </Button>
              <Button
                className="bg-secondary-default mx-2 cursor-pointer active:translate-y-0.5"
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
