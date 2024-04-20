"use client";

import { Button, Dialog, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { supabase } from "@/libs/supabase/client";

export type VocabularyForm = {
  text: string;
  text_reading: string;
  note: string;
  reference: string;
};

export function VocabularyEditor() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VocabularyForm>();

  const onSubmit = async (data: VocabularyForm) => {
    const { text, text_reading, note, reference } = data;
    const { error } = await supabase.from("vocabulary").insert({
      text: text,
      text_reading: text_reading || null,
      note: note || null,
      reference: reference || null,
    });

    if (error) {
      alert("登録に失敗しました");
      console.error(error);
      return;
    }

    reset();
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-secondary-default px-10 cursor-pointer">
          登録
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>言葉の登録</Dialog.Title>
        <Dialog.Description>新しい言葉を登録します</Dialog.Description>

        <form
          id="vocabulary"
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
          className="my-4 grid grid-cols-1 gap-2"
        >
          <div>
            <label>
              <div className="flex justify-between">
                <p>語彙*</p>
                {errors.text && (
                  <p className="text-red-500">{errors.text.message}</p>
                )}
              </div>
              <TextField.Root
                color="crimson"
                autoComplete="off"
                {...register("text", { required: "必須項目" })}
              />
            </label>
          </div>
          <div>
            <label>
              よみ
              <TextField.Root
                color="crimson"
                autoComplete="off"
                {...register("text_reading")}
              />
            </label>
          </div>
          <div>
            <label>
              意味・メモ
              <TextArea
                color="crimson"
                autoComplete="off"
                {...register("note")}
              />
            </label>
          </div>
          <div>
            <label>
              出会った場所
              <TextField.Root
                color="crimson"
                autoComplete="off"
                {...register("reference")}
              />
            </label>
          </div>
          <div className="text-center">
            <Button className="w-20 bg-secondary-default cursor-pointer active:translate-y-0.5">
              登録
            </Button>
          </div>
        </form>
        <div className="text-right">
          <Dialog.Close>
            <Button
              type="button"
              className="w-20 bg-primary-default cursor-pointer active:translate-y-0.5"
            >
              閉じる
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
