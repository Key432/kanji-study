import { AlertDialog, Button, Popover } from "@radix-ui/themes";

import {
  Exercise,
  UseExerciseRetusn,
} from "@/features/exercise/hooks/useExercise";

import {
  YojijukugoTop2Answer,
  YojijukugoTop2Config,
  YojijukugoTop2Option,
  YojijukugoTop2Question,
} from ".";

type QuestionFormProps = {
  question: Exercise<
    YojijukugoTop2Question,
    YojijukugoTop2Answer,
    YojijukugoTop2Option
  >;
  next: () => void;
  submitAnswer: UseExerciseRetusn<
    YojijukugoTop2Question,
    YojijukugoTop2Answer,
    YojijukugoTop2Option,
    YojijukugoTop2Config
  >["submitAnswer"];
};

export function QuestionForm({
  question,
  next,
  submitAnswer,
}: QuestionFormProps) {
  const handleDelay = (ms: number) => {
    setTimeout(() => {
      next();
    }, ms);
  };

  const onSubmit = (isCorrect: boolean) => {
    submitAnswer(isCorrect);
    //NOTE: 直接`next()`を呼ぶとダイアログが閉じる前に問題が切り替わり、次の問題の答えが一瞬見えてしまうので0.1s遅らせる
    handleDelay(100);
  };

  return (
    <div className="w-full text-center">
      <p className="text-3xl sm:text-5xl md:text-6xl font-klee mt-10">
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

      <div className="flex mt-6 justify-center">
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button className="bg-secondary-default cursor-pointer" size="4">
              回答を表示
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>回答</AlertDialog.Title>
            <AlertDialog.Description
              align="center"
              className="text-5xl sm:text-6xl md:text-8xl font-klee"
            >
              {question.answer.answer}
            </AlertDialog.Description>
            <div className="flex justify-center items-center gap-4 mt-4">
              <AlertDialog.Action>
                <Button
                  className="bg-primary-default cursor-pointer"
                  onClick={() => onSubmit(false)}
                >
                  不正解を記録
                </Button>
              </AlertDialog.Action>
              <AlertDialog.Action>
                <Button
                  className="bg-secondary-default cursor-pointer"
                  onClick={() => onSubmit(true)}
                >
                  正解を記録
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </div>
  );
}
