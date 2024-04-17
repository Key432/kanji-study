import { Button, Popover, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

import { Exercise } from "@/features/exercise/hooks/useExercise";

import {
  YojijukugoReadingAnswer,
  YojijukugoReadingOption,
  YojijukugoReadingQuestion,
} from ".";

type QuestionFormProps = {
  question: Exercise<
    YojijukugoReadingQuestion,
    YojijukugoReadingAnswer,
    YojijukugoReadingOption
  >;
  next: () => void;
  submitAnswer: (inputtedAnswer: string) => void;
};

export function QuestionForm({
  question,
  next,
  submitAnswer,
}: QuestionFormProps) {
  const { register, handleSubmit, reset } = useForm<{ answer: string }>();

  const onSubmit = ({ answer }: { answer: string }) => {
    submitAnswer(answer);
    reset();
    next();
  };

  return (
    <div className="w-full text-center">
      <p className="text-5xl sm:text-6xl md:text-8xl font-klee mt-10">
        {question.question.question}
      </p>
      <div className="flex mt-6 justify-center">
        <Popover.Root>
          <Popover.Trigger>
            <p className="min-w-48 w-1/4 cursor-pointer bg-slate-300 rounded-full">
              意味を表示
            </p>
          </Popover.Trigger>
          <Popover.Content
            maxWidth={{ sm: "500px", initial: "150px" }}
            align="center"
          >
            <p className="text-sm max-w-5/6">{question.option.meaning}</p>
          </Popover.Content>
        </Popover.Root>
      </div>
      <form
        className="flex flex-col justify-center items-center mt-4 w-full"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      >
        <p>よみをひらがなで入力</p>
        <div className="mt-5 max-w-2xl min-w-2xl">
          <TextField.Root
            {...register("answer", { required: "必須" })}
            autoComplete="off"
            type="search"
            className="text-center"
            color="crimson"
            size="3"
          />
        </div>
        <Button
          className="mt-5 w-40 cursor-pointer active:translate-y-0.5"
          color="crimson"
        >
          回答
        </Button>
      </form>
    </div>
  );
}
