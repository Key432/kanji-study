import { useForm } from "react-hook-form";
export type YojijukugoInsertForm = {
  full_text: string;
  full_text_reading: string;
  grade_id: string;
  hasNO: boolean;
  hasPrimary: boolean;
  synonyms: {
    full_text: string;
    full_text_reading: string;
    grade_id: string;
  }[];
  antonyms: {
    full_text: string;
    full_text_reading: string;
    grade_id: string;
  }[];
};

export function useYojijukugo() {
  const { register, watch } = useForm<YojijukugoInsertForm>();

  const insertRecord = () => {
    const fullTextRegister = register("full_text", {
      required: "必須項目です",
    });
    const formWatch: YojijukugoInsertForm = {
      full_text: watch("full_text"),
      full_text_reading: watch("full_text_reading"),
      grade_id: watch("grade_id"),
      hasNO: watch("hasNO"),
      hasPrimary: watch("hasPrimary"),
      synonyms: watch("synonyms"),
      antonyms: watch("antonyms"),
    };
    return { fullTextRegister, formWatch };
  };

  return { insertRecord };
}
