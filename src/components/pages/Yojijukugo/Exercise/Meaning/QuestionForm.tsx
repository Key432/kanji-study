import { Exercise } from "@/features/exercise/hooks/useExercise";

import { YojijukugoMeaningAnswer, YojijukugoMeaningQuestion } from ".";

type QuestionFormProps = {
  question: Exercise<YojijukugoMeaningQuestion, YojijukugoMeaningAnswer, null>;
  next: () => void;
  submitAnswer: (inputtedAnswer: number) => void;
};

export function QuestionForm({
  question,
  next,
  submitAnswer,
}: QuestionFormProps) {
  const onSubmit = (answer: number) => {
    submitAnswer(answer);
    next();
  };

  return (
    <div className="w-full text-center">
      <p className="text-5xl sm:text-6xl md:text-8xl font-klee mt-10">
        {question.question.question}
      </p>
      <div className="grid grid-cols-1 my-4 text-left gap-2">
        {question.question.options.map((option) => {
          return (
            <div
              key={option.optionId}
              className="border py-4 rounded-lg px-2 shadow-md cursor-pointer select-none active:translate-y-0.5"
              onClick={() => onSubmit(option.optionId)}
            >
              <p className="font-bold">{`No.${option.optionId}`}</p>
              <p>{option.option}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
