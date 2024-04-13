import { PlusIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  IconButton,
  Select,
  Switch,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { grades } from "@/constant/grades";

import { RelationalForm } from "./RelationalForm";
import { RelationalTable } from "./RelationalTable";
import {
  YojijukugoRecord,
  YojijukugoForm as FormItem,
} from "../hooks/useYojijukugo";
import { FULL_TEXT_READING_REGEX } from "../utils/yojijukugo";

export type YojijukugoFormProps = {
  onSubmit: (data: FormItem) => void | Promise<void>;
};

export function YojijukugoForm({ onSubmit }: YojijukugoFormProps) {
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormItem>({
    defaultValues: { synonyms: [], antonyms: [] },
  });

  const onSubmitMarged = (data: FormItem) => {
    void onSubmit(data);
    reset({
      full_text: "",
      full_text_reading: "",
      meaning: "",
      reference: "",
      hasNO: false,
      hasPrimary: false,
      synonyms: [],
      antonyms: [],
    });
    setSynonyms([]);
    setAntonyms([]);
  };

  const fullText = watch("full_text");

  useEffect(() => {
    if (fullText && fullText.length === 4) {
      if (fullText.includes("之")) {
        setValue("hasNO", true);
      } else {
        setValue("hasNO", false);
      }
    }
  }, [fullText, setValue]);

  const [synonyms, setSynonyms] = useState<YojijukugoRecord[]>([]);

  const onSubmitSynonyms = (data: YojijukugoRecord) => {
    const updatedSynonyms = [...synonyms, data];
    setSynonyms(updatedSynonyms);
    setValue("synonyms", updatedSynonyms);
  };

  const removeSynonyms = (full_text: string) => {
    const updatedSynonyms = synonyms.filter(
      (synonym) => synonym.full_text !== full_text,
    );
    setSynonyms(updatedSynonyms);
    setValue("synonyms", updatedSynonyms);
  };

  const [antonyms, setAntonyms] = useState<YojijukugoRecord[]>([]);

  const onSubmitAntonyms = (data: YojijukugoRecord) => {
    const updatedAntonyms = [...antonyms, data];
    setAntonyms(updatedAntonyms);
    setValue("antonyms", updatedAntonyms);
  };

  const removeAntonyms = (full_text: string) => {
    const updatedAntonyms = antonyms.filter(
      (synonym) => synonym.full_text !== full_text,
    );
    setAntonyms(updatedAntonyms);
    setValue("antonyms", updatedAntonyms);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <label className="col-span-2 sm:col-span-1">
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
      <label className="col-span-2 sm:col-span-1">
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
      <label className="col-span-2">
        <div className="flex items-end justify-between">
          <p>意味*</p>
          {errors.meaning && (
            <p className="text-xs font-bold text-red-500">
              {errors.meaning.message}
            </p>
          )}
        </div>
        <TextArea
          {...register("meaning", { required: "必須項目" })}
          placeholder="一度に複数の功績をあげること"
          color="crimson"
        />
      </label>
      <label className="col-span-2 sm:col-span-1">
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
      <label className="col-span-2 sm:col-span-1">
        <div className="flex items-end justify-between">
          <p>出典</p>
        </div>
        <TextField.Root
          {...register("reference", {})}
          autoComplete="off"
          placeholder="論語"
          color="crimson"
        />
      </label>
      <div className="col-span-2">
        <label>
          <Controller
            control={control}
            name="hasNO"
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
          <span className="pl-4">「之」を含む四字熟語</span>
        </label>
      </div>
      <div className="col-span-2">
        <label>
          <Controller
            control={control}
            name="hasPrimary"
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
          <span className="pl-4">優先表記あり</span>
        </label>
      </div>
      <div
        className={twMerge(
          "relative col-span-2 p-2 border rounded-lg",
          "before:content-['類義語'] before:absolute before:top-0 before:-translate-y-1/2 before:bg-white",
        )}
      >
        <div className="grid grid-cols-6 w-full">
          <div className="col-span-5">
            <RelationalTable data={synonyms} remove={removeSynonyms} />
          </div>
          <div className="mt-1 text-center">
            <Dialog.Root>
              <Dialog.Trigger>
                <IconButton radius="full" className="bg-secondary-300">
                  <PlusIcon />
                </IconButton>
              </Dialog.Trigger>
              <Dialog.Content maxWidth="450px">
                <Dialog.Title>類義語の追加</Dialog.Title>
                <RelationalForm onSubmit={onSubmitSynonyms} />
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "relative col-span-2 p-2 border rounded-lg",
          "before:content-['対義語'] before:absolute before:top-0 before:-translate-y-1/2 before:bg-white",
        )}
      >
        <div className="grid grid-cols-6 w-full">
          <div className="col-span-5">
            <RelationalTable data={antonyms} remove={removeAntonyms} />
          </div>
          <div className="mt-1 text-center">
            <Dialog.Root>
              <Dialog.Trigger>
                <IconButton radius="full" className="bg-secondary-300">
                  <PlusIcon />
                </IconButton>
              </Dialog.Trigger>
              <Dialog.Content maxWidth="450px">
                <Dialog.Title>対義語の追加</Dialog.Title>
                <RelationalForm onSubmit={onSubmitAntonyms} />
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div>
      <div className="text-center col-span-2">
        <Button
          form="parent"
          className="bg-secondary-300 w-full hover:bg-secondary-400 active:bg-secondary-500 active:translate-y-0.5"
        >
          登録
        </Button>
      </div>
      <form
        id="parent"
        onSubmit={(e) => void handleSubmit(onSubmitMarged)(e)}
      ></form>
    </div>
  );
}
