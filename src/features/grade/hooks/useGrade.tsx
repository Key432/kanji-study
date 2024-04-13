import { useEffect, useState } from "react";

import { supabase } from "@/libs/supabase/client";

export type GradeMapping = { [K in string]: string };
export type Grades = { grade_id: string; grade_text: string }[];
export function useGrade() {
  const [grades, setGrades] = useState<Grades>();
  const [gradeMapping, setGradeMapping] = useState<GradeMapping>();

  useEffect(() => {
    const fetchGrade = async () => {
      const { data } = await supabase
        .from("grade")
        .select("*")
        .order("display_order");

      setGrades(
        data?.map(({ grade_id, grade_text }) => ({ grade_id, grade_text })) ??
          [],
      );
      setGradeMapping(
        data?.reduce((acc, item) => {
          acc[item.grade_id] = item.grade_text;
          return acc;
        }, {} as GradeMapping) ?? {},
      );
    };
    void fetchGrade();
  }, []);

  return { grades, gradeMapping };
}
