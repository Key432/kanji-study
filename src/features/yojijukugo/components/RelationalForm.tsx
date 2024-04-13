import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Button, Select, TextField, Tooltip } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";

import { grades } from "@/constant/grades";

import { YojijukugoRecord } from "../hooks/useYojijukugo";
import { FULL_TEXT_READING_REGEX } from "../utils/yojijukugo";

export type RelationalFormProps = {
  onSubmit: (data: YojijukugoRecord) => void;
};

export function RelationalForm({ onSubmit }: RelationalFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<YojijukugoRecord>();

  const onSubmitMarged = (data: YojijukugoRecord) => {
    void onSubmit(data);
    reset();
  };

  return (
    <form
      id="relational"
      onSubmit={(e) => void handleSubmit(onSubmitMarged)(e)}
      className="grid grid-cols-1 gap-2"
    >
      <label>
        <div className="flex items-end justify-between">
          <p>四字熟語*</p>
          {errors.full_text && (
            <p className="text-xs font-bold text-red-500">
              {errors.full_text.message}
            </p>
          )}
        </div>
        <TextField.Root
          {...register("full_text", {
            required: "必須項目",
            maxLength: { value: 4, message: "入力が不正" },
            minLength: { value: 4, message: "入力が不正" },
          })}
          autoComplete="off"
          placeholder="一石二鳥"
          className="font-klee"
          color="crimson"
        />
      </label>
      <label>
        <div className="flex items-end justify-between">
          <p>
            よみ*
            <Tooltip content="「・」か「、」で漢字ごとに読みを区切る">
              <QuestionMarkCircledIcon className="inline ml-2" />
            </Tooltip>
          </p>
          {errors.full_text_reading && (
            <p className="text-xs font-bold text-red-500">
              {errors.full_text_reading.message}
            </p>
          )}
        </div>
        <TextField.Root
          {...register("full_text_reading", {
            required: "必須項目",
            pattern: { value: FULL_TEXT_READING_REGEX, message: "入力が不正" },
          })}
          autoComplete="off"
          placeholder="いっ・せき・に・ちょう"
          className="font-klee"
          color="crimson"
        />
      </label>
      <label>
        <div className="flex items-end justify-between">
          <p>漢検級*</p>
          {errors.grade_id && (
            <p className="text-xs font-bold text-red-500">
              {errors.grade_id.message}
            </p>
          )}
        </div>
        <Controller
          control={control}
          name="grade_id"
          defaultValue="pre1st"
          rules={{ required: "必須項目" }}
          render={({ field: { onChange, value } }) => {
            return (
              <Select.Root
                defaultValue="pre1st"
                onValueChange={onChange}
                value={value}
              >
                <Select.Trigger className="w-full" />
                <Select.Content color="crimson">
                  {grades?.map((grade, index) => {
                    return (
                      <Select.Item key={index} value={grade.grade_id}>
                        {grade.grade_text}
                      </Select.Item>
                    );
                  })}
                </Select.Content>
              </Select.Root>
            );
          }}
        />
      </label>
      <Button
        form="relational"
        className="bg-secondary-300 w-full hover:bg-secondary-400 active:bg-secondary-500 active:translate-y-0.5"
      >
        追加
      </Button>
    </form>
  );
}
