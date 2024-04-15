import { useState } from "react";

import { supabase } from "@/libs/supabase/client";

import { gradeMapping } from "@/constant/grades";

export type UseExerciseType = "YOJIJUKUGO";
export type Status = "READY" | "PROGRESS" | "DONE";
export type ExerciseSetting = {
  grade_id: (keyof typeof gradeMapping)[];
  exerciseCount: number;
  excludeNO: boolean;
  excludePrimary: boolean;
};
export type ExerciseQuestion = {
  yojijukugo_id: number;
  question: string;
  answer: string;
  meaning: string;
};
export type QuestionCount = {
  nowAsking: number;
  count: number;
};
export type AnswerResult = {
  question_count: number;
  question: string;
  answer: string;
  inputtedAnswer: string;
  isCorrect: boolean;
};

const initalQuestionCount = {
  nowAsking: 0,
  count: 0,
};

export function useExercise(_type: UseExerciseType) {
  const [status, setStatus] = useState<Status>("READY");
  const [setting, setSetting] = useState<ExerciseSetting>();
  const [questions, setQuestions] = useState<ExerciseQuestion[]>([]);
  const [question, setQuestion] = useState<ExerciseQuestion>();
  const [questionCount, setQuestionCount] =
    useState<QuestionCount>(initalQuestionCount);
  const [results, setResults] = useState<AnswerResult[]>([]);

  const setExerciseSetting = () => {
    return {
      onSubmit: async (data: ExerciseSetting) => {
        setSetting(data);
        const query = supabase
          .from("view_random_yojijukugo")
          .select("yojijukugo_id,full_text,full_text_reading,meaning");

        const filteredByGradeID = data.grade_id
          ? query.in("grade_id", data.grade_id)
          : query;

        const filteredByExcludeNO = data.excludeNO
          ? filteredByGradeID.eq("hasNO", false)
          : filteredByGradeID;

        const filteredByExcludePrimary = data.excludePrimary
          ? filteredByExcludeNO.eq("hasPrimary", false)
          : filteredByExcludeNO;

        const { data: selected } = await filteredByExcludePrimary.limit(
          data.exerciseCount,
        );

        if (!selected) return;

        const questions = selected.map((row) => {
          return {
            yojijukugo_id: row.yojijukugo_id!,
            question: row.full_text!,
            answer: row.full_text_reading!,
            meaning: row.meaning!,
          };
        });

        setQuestions(questions);
        setQuestionCount({ nowAsking: 1, count: questions.length });
        setQuestion(questions[0]);
        setResults([]);
        setStatus("PROGRESS");
      },
      setting,
    };
  };

  const askQuestion = () => {
    const next = () => {
      if (questionCount.count === 0) return;
      const { nowAsking, count } = questionCount;
      if (nowAsking === count) {
        setStatus("DONE");
        return;
      }
      setQuestion(questions[nowAsking]);
      setQuestionCount({ nowAsking: nowAsking + 1, count: count });
    };

    const submitAnswer = (answer: string) => {
      const updatedResults: AnswerResult[] = [
        ...results,
        {
          question_count: questionCount.nowAsking,
          question: question?.question ?? "",
          answer: question?.answer ?? "",
          inputtedAnswer: answer,
          isCorrect: question?.answer === answer,
        },
      ];
      setResults(updatedResults);
      return question?.answer === answer;
    };
    return { question, questions, questionCount, next, submitAnswer };
  };

  const showResult = () => {
    const correctCount = results.filter((result) => result.isCorrect).length;
    const incorrectCount = results.filter((result) => !result.isCorrect).length;

    return { correctCount, incorrectCount, results };
  };

  const reset = () => {
    setSetting(undefined);
    setQuestions([]);
    setQuestion(undefined);
    setQuestionCount(initalQuestionCount);
    setResults([]);
    setStatus("READY");
  };
  return { status, setExerciseSetting, askQuestion, showResult, reset };
}
