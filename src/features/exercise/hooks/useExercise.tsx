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
  confirm: (inputtedAnswer: string | number | boolean, answer: A) => boolean;
  option: Option;
};

export type Result<Q extends Question, A extends Answer> = {
  question_no: number;
  question: Q;
  answer: A;
  inputtedAnswer: string | number | boolean;
  isCorrect: boolean;
};

export type UseExerciseRetusn<
  Q extends Question,
  A extends Answer,
  Option,
  C extends Config,
> = {
  status: Status;
  config: C | undefined;
  question: Exercise<Q, A, Option> | undefined;
  questions: Exercise<Q, A, Option>[];
  results: Result<Q, A>[];
  count: number;
  configureExercise: (config: C, onlySetConfig?: boolean) => Promise<void>;
  startExercise: (questions: Exercise<Q, A, Option>[]) => void;
  goNextQuestion: () => void;
  submitAnswer: (inputtedAnswer: string | number | boolean) => void;
  reset: () => void;
  restart: () => Promise<void>;
};

export function useExercise<
  Q extends Question,
  A extends Answer,
  Option,
  C extends Config,
>({
  fetchExerciseDispatch,
}: {
  fetchExerciseDispatch: (
    config: C,
  ) => Promise<Exercise<Q, A, Option>[] | null>;
}): UseExerciseRetusn<Q, A, Option, C> {
  const [status, setStatus] = useState<Status>("READY");
  const [questions, setQuestions] = useState<Exercise<Q, A, Option>[]>([]);
  const [question, setQuestion] = useState<Exercise<Q, A, Option>>();
  const [config, setConfig] = useState<C>();
  const [results, setResults] = useState<Result<Q, A>[]>([]);
  const [count, setCount] = useState<number>(0);

  const configureExercise = async (
    config: C,
    onlySetConfig: boolean = false,
  ) => {
    setQuestions([]);
    setQuestion(undefined);
    setResults([]);
    setCount(0);
    setConfig(config);
    if (onlySetConfig) {
      const questions = await fetchExerciseDispatch(config);
      if (questions) {
        startExercise(questions);
      }
    }
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

  const submitAnswer = (inputtedAnswer: string | number | boolean) => {
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

  const restart = async () => {
    if (config === undefined) {
      reset();
      return;
    }
    const questions = await fetchExerciseDispatch(config);
    if (!questions) return;
    setResults([]);
    setQuestions(questions);
    setQuestion(questions[0]);
    setCount(1);
    setStatus("PROGRESS");
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
    restart,
  };
}
