import { supabase } from "@/libs/supabase/client";

import { gradeMapping } from "@/constant/grades";

import {
  removeSeparator,
  splitBySeparator,
  splitCharacter,
} from "../utils/yojijukugo";

export interface YojijukugoRecord {
  full_text: string;
  full_text_reading: string;
  grade_id: keyof typeof gradeMapping;
}

export interface YojijukugoDetailRecord extends YojijukugoRecord {
  meaning: string;
  reference: string | null;
  hasNO: boolean;
  hasPrimary: boolean;
}

export interface YojijukugoForm extends YojijukugoDetailRecord {
  synonyms: YojijukugoRecord[];
  antonyms: YojijukugoRecord[];
}

export interface SplitYojijukugo {
  text_char_1: string;
  text_char_reading_1: string;
  text_char_2: string;
  text_char_reading_2: string;
  text_char_3: string;
  text_char_reading_3: string;
  text_char_4: string;
  text_char_reading_4: string;
}

export interface YojijukugoInsertRequest
  extends YojijukugoDetailRecord,
    SplitYojijukugo {
  relational_yojijukugo: (YojijukugoRecord &
    SplitYojijukugo & { type: "SYNONYM" | "ANTONYM" })[];
}

function splitYojijukugo(
  full_text: string,
  full_text_reading: string,
): SplitYojijukugo {
  const splitedFullText = splitCharacter(full_text);
  const splitedFullTextReading = splitBySeparator(full_text_reading);
  return {
    text_char_1: splitedFullText[0],
    text_char_reading_1: splitedFullTextReading[0],
    text_char_2: splitedFullText[1],
    text_char_reading_2: splitedFullTextReading[1],
    text_char_3: splitedFullText[2],
    text_char_reading_3: splitedFullTextReading[2],
    text_char_4: splitedFullText[3],
    text_char_reading_4: splitedFullTextReading[3],
  };
}

function constructYojijukugoInsertRequest(
  data: YojijukugoForm,
): YojijukugoInsertRequest {
  const {
    full_text,
    full_text_reading: rawFullTextReading,
    synonyms,
    antonyms,
    reference: rawReference,
    ...remains
  } = data;

  const full_text_reading = removeSeparator(rawFullTextReading);
  const splitedYojijukugo = splitYojijukugo(full_text, rawFullTextReading);

  const reference = rawReference || null;

  return {
    full_text,
    full_text_reading,
    reference,
    relational_yojijukugo: [
      ...synonyms.map((synonym) => {
        const {
          full_text,
          full_text_reading: rawFullTextReading,
          grade_id,
        } = synonym;
        const full_text_reading = removeSeparator(rawFullTextReading);
        const splitedSynonym = splitYojijukugo(full_text, rawFullTextReading);
        return {
          full_text,
          full_text_reading,
          type: "SYNONYM" as const,
          grade_id,
          ...splitedSynonym,
        };
      }),
      ...antonyms.map((synonym) => {
        const {
          full_text,
          full_text_reading: rawFullTextReading,
          grade_id,
        } = synonym;
        const full_text_reading = removeSeparator(rawFullTextReading);
        const splitedSynonym = splitYojijukugo(full_text, rawFullTextReading);
        return {
          full_text,
          full_text_reading,
          type: "ANTONYM" as const,
          grade_id,
          ...splitedSynonym,
        };
      }),
    ],
    ...splitedYojijukugo,
    ...remains,
  };
}

export type FilterParams = Partial<{
  q: string;
  grade_id: (keyof typeof gradeMapping)[];
  excludeNO: boolean;
  excludePrimary: boolean;
  onlyNO: boolean;
  onlyPrimary: boolean;
}>;

export type SelectRecordsReturn = {
  data: (YojijukugoRecord & { yojijukugo_id: number })[];
  count: number;
};

export function useYojijukugo() {
  const insertRecord = async (data: YojijukugoForm) => {
    const request = constructYojijukugoInsertRequest(data);
    const { relational_yojijukugo, ...remain } = request;
    const { data: inserted, error } = await supabase
      .from("yojijukugo")
      .insert(remain)
      .select("yojijukugo_id")
      .single();
    if (error) throw error;

    const { error: relationlError } = await supabase
      .from("relational_yojijukugo")
      .insert(
        relational_yojijukugo.map((row) => {
          return {
            yojijukugo_id: inserted.yojijukugo_id,
            ...row,
          };
        }),
      );
    if (relationlError) throw relationlError;
  };

  const selectRecords = async (
    filterParams: FilterParams,
  ): Promise<SelectRecordsReturn> => {
    const query = supabase
      .from("yojijukugo")
      .select("yojijukugo_id,full_text,full_text_reading,grade_id", {
        count: "exact",
      });

    const filteredByQ = filterParams?.q
      ? query.like("full_text", `%${filterParams.q}%`)
      : query;

    const filteredByGradeID = filterParams?.grade_id
      ? filteredByQ.in("grade_id", filterParams.grade_id)
      : filteredByQ;

    const filteredByExcludeNO = filterParams?.excludeNO
      ? filteredByGradeID.eq("hasNO", false)
      : filteredByGradeID;

    const filteredByOnlyNO = filterParams?.onlyNO
      ? filteredByExcludeNO.eq("hasNO", true)
      : filteredByExcludeNO;

    const filteredByExcludePrimary = filterParams?.excludePrimary
      ? filteredByOnlyNO.eq("hasPrimary", false)
      : filteredByOnlyNO;

    const filteredByOnlyPrimary = filterParams?.onlyPrimary
      ? filteredByExcludePrimary.eq("hasPrimary", true)
      : filteredByExcludePrimary;

    const { data: selected, count } =
      await filteredByOnlyPrimary.order("full_text_reading");

    return {
      count: count || 0,
      data:
        selected?.map((item) => {
          return {
            yojijukugo_id: item.yojijukugo_id,
            full_text: item.full_text,
            full_text_reading: item.full_text_reading,
            grade_id: item.grade_id as keyof typeof gradeMapping,
          };
        }) ?? [],
    };
  };

  return { insertRecord, selectRecords };
}
