"use client";

import { Button, Checkbox, Switch, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Grade, gradeMapping, grades } from "@/constant/grades";

import { validateGradeIds } from ".";

export type Params = {
  q?: string;
  grade_id?: (keyof typeof gradeMapping)[];
  excludeNO?: boolean;
  excludePrimary?: boolean;
  onlyNO?: boolean;
  onlyPrimary?: boolean;
};

export function ListFilter({ params }: { params?: { [key: string]: string } }) {
  const router = useRouter();
  const { register, handleSubmit, control, setValue } =
    useForm<Required<Params>>();

  useEffect(() => {
    setValue("q", params?.q ?? "");
    setValue("grade_id", validateGradeIds(params?.grade_id));
    setValue("excludeNO", params && "excludeNO" in params ? true : false);
    setValue("onlyNO", params && "onlyNO" in params ? true : false);
    setValue(
      "excludePrimary",
      params && "excludePrimary" in params ? true : false,
    );
    setValue("onlyPrimary", params && "onlyPrimary" in params ? true : false);
  }, [params, setValue]);

  const onSearchSubmit = (data: Required<Params>) => {
    const { q, grade_id, excludeNO, excludePrimary, onlyNO, onlyPrimary } =
      data;
    let query = "?";

    if (q !== "") query += `q=${q}`;

    if (grade_id.length > 0) {
      query += query === "?" ? "grade_id=" : "&grade_id=";
      query += grade_id.join(",");
    }

    if (excludeNO) query += (query === "?" ? "" : "&") + "excludeNO=true";
    if (excludePrimary)
      query += (query === "?" ? "" : "&") + "excludePrimary=true";
    if (onlyNO) query += (query === "?" ? "" : "&") + "onlyNO=true";
    if (onlyPrimary) query += (query === "?" ? "" : "&") + "onlyPrimary=true";

    router.push(`/yojijukugo/list${query}`);
  };

  const onClickReset = () => {
    router.push("/yojijukugo/list");
    router.refresh();
  };

  return (
    <details className="text-sm bg-secondary-100 p-2 rounded-lg">
      <summary className="select-none">絞り込み・検索</summary>
      <form
        onSubmit={(e) => void handleSubmit(onSearchSubmit)(e)}
        className="ml-4 grid grid-cols-4 gap-2"
      >
        <label className="flex items-center col-span-4">
          <p className="pr-2">検索値</p>
          <TextField.Root
            color="crimson"
            placeholder="部分一致文字列を検索します"
            autoComplete="off"
            {...register("q")}
            className="grow"
          />
        </label>
        <div className="col-span-4">
          {grades.map((grade) => {
            return (
              <Controller
                key={grade.grade_id}
                control={control}
                name="grade_id"
                defaultValue={[]}
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
        </div>
        <div className="flex flex-col justify-start gap-2 col-span-4 md:col-span-2">
          <p>除外オプション</p>
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
        </div>
        <div className="flex flex-col justify-start gap-2 col-span-4 md:col-span-2">
          <p>絞込みオプション</p>
          <div>
            <label>
              <Controller
                control={control}
                name="onlyNO"
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
                「之」を含む熟語のみ表示
              </span>
            </label>
          </div>
          <div>
            <label>
              <Controller
                control={control}
                name="onlyPrimary"
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
                優先表記がある熟語のみ表示
              </span>
            </label>
          </div>
        </div>
        <Button
          type="button"
          onClick={onClickReset}
          className="cursor-pointer col-start-3 bg-primary-default"
        >
          リセット
        </Button>
        <Button className="cursor-pointer bg-secondary-default">検索</Button>
      </form>
    </details>
  );
}
