import { Button, Checkbox, Select, Switch } from "@radix-ui/themes";
import { HTMLAttributes } from "react";
import { Controller, useForm } from "react-hook-form";

import { supabase } from "@/libs/supabase/client";

import { Grade, grades } from "@/constant/grades";
import { UseExerciseRetusn } from "@/features/exercise/hooks/useExercise";

import {
  YojijukugoReadingAnswer,
  YojijukugoReadingConfig,
  YojijukugoReadingOption,
  YojijukugoReadingQuestion,
} from ".";

export type FormProps = {
  configureExercise: UseExerciseRetusn<
    YojijukugoReadingQuestion,
    YojijukugoReadingAnswer,
    YojijukugoReadingOption,
    YojijukugoReadingConfig
  >["configureExercise"];
  className?: HTMLAttributes<HTMLFormElement>["className"];
};

export function ConfigForm({ configureExercise, className }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<YojijukugoReadingConfig>();

  const onSubmit = async (data: YojijukugoReadingConfig) => {
    const query = supabase
      .from("view_random_yojijukugo")
      .select("*", { count: "exact" });

    const filteredByGradeID = data.grades
      ? query.in("grade_id", data.grades)
      : query;

    const filteredByExcludeNO = data.excludeNO
      ? filteredByGradeID.eq("hasNO", false)
      : filteredByGradeID;

    const filteredByExcludePrimary = data.excludePrimary
      ? filteredByExcludeNO.eq("hasPrimary", false)
      : filteredByExcludeNO;

    const { count } = await filteredByExcludePrimary.limit(data.count);

    if (!count) {
      alert("演習対象の四字熟語がありませんでした");
      return;
    }

    if (count < data.count) {
      alert(
        "演習対象の四字熟語が設定出題数に足りませんでした。最大数を出題します",
      );
    }

    void configureExercise(data, true);
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className={className}
    >
      <div className="my-2">
        <p className="inline mr-4">出題級</p>
        {grades.map((grade) => {
          return (
            <Controller
              key={grade.grade_id}
              control={control}
              name="grades"
              defaultValue={[]}
              rules={{
                validate: (values) => {
                  return values.length > 0 || "最低一つは選択してください";
                },
              }}
              render={({ field: { value, onChange } }) => {
                return (
                  <label key={grade.grade_id} className="mr-2">
                    <Checkbox
                      color="crimson"
                      checked={value?.includes(grade.grade_id as Grade)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? onChange([...value, grade.grade_id])
                          : onChange(
                              value?.filter(
                                (value) => value !== grade.grade_id,
                              ),
                            );
                      }}
                    />
                    <span>{grade.grade_text}</span>
                  </label>
                );
              }}
            />
          );
        })}
        {!!errors.grades && (
          <p className="inline text-red-400">{errors.grades.message}</p>
        )}
      </div>
      <div className="my-2">
        <label className="flex items-center">
          <p className="inline mr-4">出題数</p>
          <Controller
            control={control}
            name="count"
            defaultValue={10}
            rules={{ required: "必須項目" }}
            render={({ field: { onChange, value } }) => {
              return (
                <Select.Root
                  defaultValue={String(10)}
                  onValueChange={onChange}
                  value={String(value)}
                >
                  <Select.Trigger />
                  <Select.Content color="crimson">
                    {[5, 10, 15, 20, 25, 30].map((count) => {
                      return (
                        <Select.Item key={count} value={String(count)}>
                          {`${count}問`}
                        </Select.Item>
                      );
                    })}
                  </Select.Content>
                </Select.Root>
              );
            }}
          />
        </label>
      </div>
      <div className="my-2">
        <label>
          <Controller
            control={control}
            name="excludeNO"
            defaultValue={false}
            render={({ field: { onChange, value } }) => {
              return (
                <Switch
                  checked={value}
                  onCheckedChange={onChange}
                  color="crimson"
                />
              );
            }}
          />
          <span className="pl-4">「之」を含む熟語を除外</span>
        </label>
      </div>
      <div>
        <label>
          <Controller
            control={control}
            name="excludePrimary"
            defaultValue={false}
            render={({ field: { onChange, value } }) => {
              return (
                <Switch
                  checked={value}
                  onCheckedChange={onChange}
                  color="crimson"
                />
              );
            }}
          />
          <span className="pl-4">優先表記がある熟語を除外</span>
        </label>
      </div>
      <div className="text-center mt-10">
        <Button
          color="crimson"
          className="cursor-pointer px-16 active:translate-y-0.5"
        >
          演習開始
        </Button>
      </div>
    </form>
  );
}
