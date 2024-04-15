import { Button, Checkbox, Select, Switch } from "@radix-ui/themes";
import { HTMLAttributes } from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { supabase } from "@/libs/supabase/client";

import { gradeMapping, grades } from "@/constant/grades";

import { ExerciseSetting } from "../hooks/useExercise";

export type SettingFormProps = {
  onSubmit: (data: ExerciseSetting) => void | Promise<void>;
  className?: HTMLAttributes<HTMLFormElement>["className"];
};

export function SettingForm({ onSubmit, className }: SettingFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExerciseSetting>();

  const onSubmitMerge = async (data: ExerciseSetting) => {
    const query = supabase
      .from("yojijukugo")
      .select("", { count: "exact", head: true });

    const filteredByGradeID = data.grade_id
      ? query.in("grade_id", data.grade_id)
      : query;

    const filteredByExcludeNO = data.excludeNO
      ? filteredByGradeID.eq("hasNO", false)
      : filteredByGradeID;

    const filteredByExcludePrimary = data.excludePrimary
      ? filteredByExcludeNO.eq("hasPrimary", false)
      : filteredByExcludeNO;

    const { count } = await filteredByExcludePrimary;

    if (!count) {
      alert("演習対象の四字熟語がありませんでした");
      return;
    }

    if (count < data.exerciseCount) {
      alert(
        "演習対象の四字熟語が設定出題数に足りませんでした。最大数を出題します",
      );
    }

    void onSubmit(data);
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmitMerge)(e)}
      className={twMerge("[&>div]:my-4", className)}
    >
      <div>
        <p className="inline mr-4">出題級</p>
        {grades.map((grade) => {
          return (
            <Controller
              key={grade.grade_id}
              control={control}
              name="grade_id"
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
                      checked={value?.includes(
                        grade.grade_id as keyof typeof gradeMapping,
                      )}
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
        {!!errors.grade_id && (
          <p className="inline text-red-400">{errors.grade_id.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-center">
          <p className="inline mr-4">出題数</p>
          <Controller
            control={control}
            name="exerciseCount"
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
      <div>
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
          <span className="text-xs pl-4 sm:text-base">
            「之」を含む熟語を除外
          </span>
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
          <span className="text-xs pl-4 sm:text-base">
            優先表記がある熟語を除外
          </span>
        </label>
      </div>
      <div className="text-center">
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
