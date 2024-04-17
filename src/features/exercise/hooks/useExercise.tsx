import { useState } from "react";

export type Status = "READY" | "PROGRESS" | "DONE";

export interface Question {
  question: string;
}

export interface Answer {
  answer: string | number;
}

export interface Config {
  count: number;
}

export type Exercise<Q extends Question, A extends Answer, Option> = {
  target_id: number;
  question: Q;
  answer: A;
  confirm: (inputtedAnswer: string, answer: A) => boolean;
  option: Option;
};

export type Result<Q extends Question, A extends Answer> = {
  question_no: number;
  question: Q;
  answer: A;
  inputtedAnswer: string;
  isCorrect: boolean;
};

export function useExercise<
  Q extends Question,
  A extends Answer,
  Option,
  C extends Config,
>() {
  const [status, setStatus] = useState<Status>("READY");
  const [questions, setQuestions] = useState<Exercise<Q, A, Option>[]>([]);
  const [question, setQuestion] = useState<Exercise<Q, A, Option>>();
  const [config, setConfig] = useState<C>();
  const [results, setResults] = useState<Result<Q, A>[]>([]);
  const [count, setCount] = useState<number>(0);

  const configureExercise = (config: C) => {
    setStatus("READY");
    setQuestions([]);
    setQuestion(undefined);
    setResults([]);
    setCount(0);
    setConfig(config);
  };

  const startExercise = (questions: Exercise<Q, A, Option>[]) => {
    if (questions.length === 0 && count === 0 && config) return;
    setQuestions(questions);
    setQuestion(questions[count]);
    setCount((prev) => prev + 1);
    setStatus("PROGRESS");
  };

  const goNextQuestion = () => {
    if (questions.length === count) {
      setStatus("DONE");
      return;
    }
    setQuestion(questions[count]);
    setCount((prev) => prev + 1);
  };

  const submitAnswer = (inputtedAnswer: string) => {
    if (question === undefined) return;
    const isCorrect = question.confirm(inputtedAnswer, question.answer);
    const updatedResults: Result<Q, A>[] = [
      ...results,
      {
        question_no: count,
        question: question.question,
        inputtedAnswer: inputtedAnswer,
        answer: question.answer,
        isCorrect: isCorrect,
      },
    ];
    setResults(updatedResults);
  };

  const reset = () => {
    setStatus("READY");
    setQuestions([]);
    setQuestion(undefined);
    setResults([]);
    setCount(0);
    setConfig(undefined);
  };

  const resetStatus = () => {
    setCount(0);
    setQuestions([]);
    setQuestion(undefined);
    setResults([]);
    setStatus("READY");
  };

  return {
    status,
    config,
    question,
    questions,
    results,
    count,
    configureExercise,
    startExercise,
    goNextQuestion,
    submitAnswer,
    reset,
    resetStatus,
  };
}
