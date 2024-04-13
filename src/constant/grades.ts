export const gradeMapping = {
  "1st": "１級",
  pre1st: "準１級",
  "2nd": "２級",
  pre2nd: "準２級",
  more3rd: "３級以上",
  none: "漢検配当外",
  unknown: "不明",
} as const;

export const grades = [
  {
    grade_id: "1st",
    grade_text: "１級",
  },
  {
    grade_id: "pre1st",
    grade_text: "準１級",
  },
  {
    grade_id: "2nd",
    grade_text: "２級",
  },
  {
    grade_id: "pre2nd",
    grade_text: "準２級",
  },
  {
    grade_id: "more3rd",
    grade_text: "３級以上",
  },
  {
    grade_id: "none",
    grade_text: "漢検配当外",
  },
  {
    grade_id: "unknown",
    grade_text: "不明",
  },
];
