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

import { ExerciseResult } from "./ExerciseResult";
import { QuestionForm } from "./QuestionForm";
import { ConfigForm } from "../ConfigForm";

const values: BreadcrumbProps["values"] = [
  { text: "メニュー", href: "/" },
  { text: "四字熟語", href: "/yojijukugo" },
  { text: "四字熟語演習メニュー", href: "/yojijukugo/exercise" },
  { text: "下二文字" },
];

export interface YojijukugoBottom2Question extends Question {
  yojijukugo_id: number;
  question: string;
}

export interface YojijukugoBottom2Answer extends Answer {
  yojijukugo_id: number;
  answer: string;
}

export interface YojijukugoBottom2Config extends Config {
  grades: Grade[];
  excludeNO: boolean;
  excludePrimary: boolean;
}

export type YojijukugoBottom2Option = {
  meaning: string;
};

export function YojijukugoExerciseBottom2() {
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
    YojijukugoBottom2Question,
    YojijukugoBottom2Answer,
    YojijukugoBottom2Option,
    YojijukugoBottom2Config
  >({
    fetchExerciseDispatch: async (config) => {
      const { grades, count, ...remain } = config;
      const data = await selectRandomRecords(
        { ...remain, grade_id: grades },
        count,
      );
      if (!data) return null;

      const questions: Exercise<
        YojijukugoBottom2Question,
        YojijukugoBottom2Answer,
        YojijukugoBottom2Option
      >[] = data.map((item) => {
        const { yojijukugo_id, full_text, meaning, text_char_1, text_char_2 } =
          item;

        const question: YojijukugoBottom2Question = {
          yojijukugo_id: yojijukugo_id,
          question: text_char_1 + text_char_2 + "\u3007\u3007",
        };
        const answer: YojijukugoBottom2Answer = {
          yojijukugo_id: yojijukugo_id,
          answer: full_text,
        };
        const option: YojijukugoBottom2Option = {
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
    <ContentLayout title="四字熟語下二文字演習">
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
