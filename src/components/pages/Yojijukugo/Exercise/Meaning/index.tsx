"use client";

import { Button, Heading } from "@radix-ui/themes";

import { supabase } from "@/libs/supabase/client";

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

const values: BreadcrumbProps["values"] = [
  { text: "メニュー", href: "/" },
  { text: "四字熟語メニュー", href: "/yojijukugo" },
  { text: "演習メニュー", href: "/yojijukugo/exercise" },
  { text: "熟語→意味" },
];

export interface YojijukugoMeaningQuestion extends Question {
  yojijukugo_id: number;
  question: string;
  options: {
    optionId: number;
    option: string;
  }[];
}

export interface YojijukugoMeaningAnswer extends Answer {
  yojijukugo_id: number;
  answer: number;
  meaning: string;
}

export interface YojijukugoReadingConfig extends Config {
  grades: Grade[];
  excludeNO: boolean;
  excludePrimary: boolean;
}

export function YojijukugoExerciseMeaning() {
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
    YojijukugoMeaningQuestion,
    YojijukugoMeaningAnswer,
    null,
    YojijukugoReadingConfig
  >({
    fetchExerciseDispatch: async (config) => {
      const { grades, count, ...remain } = config;

      const data = await selectRandomRecords(
        { ...remain, grade_id: grades },
        count,
      );
      if (!data) return null;

      const constructExercises = async (): Promise<
        Exercise<YojijukugoMeaningQuestion, YojijukugoMeaningAnswer, null>[]
      > => {
        return await Promise.all(
          data.map(async (item) => {
            const { yojijukugo_id, full_text, meaning } = item;

            // 他の選択肢を作成
            const { data } = await supabase
              .from("view_random_yojijukugo")
              .select("meaning")
              .neq("yojijukugo_id", yojijukugo_id)
              .limit(3);

            const options =
              data?.map((item) => {
                return item.meaning !== null ? item.meaning : "";
              }) ?? [];

            // 答えの選択肢を挿入する
            const correctOptionId = Math.floor(Math.random() * options.length);
            const updatedOptions: YojijukugoMeaningQuestion["options"] = options
              .toSpliced(correctOptionId, 0, meaning)
              .map((item, index) => {
                return {
                  optionId: index + 1,
                  option: item,
                };
              });

            const question: YojijukugoMeaningQuestion = {
              yojijukugo_id: yojijukugo_id,
              question: full_text,
              options: updatedOptions,
            };

            const answer: YojijukugoMeaningAnswer = {
              yojijukugo_id: yojijukugo_id,
              answer: correctOptionId + 1,
              meaning: meaning,
            };

            return {
              target_id: yojijukugo_id,
              question: question,
              answer: answer,
              confirm: (inputtedAnswer, answer) =>
                inputtedAnswer === answer.answer,
              option: null,
            };
          }),
        );
      };
      const fetchedExercise = await constructExercises();
      return fetchedExercise;
    },
  });

  return (
    <ContentLayout title="四字熟語演習・意味">
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
