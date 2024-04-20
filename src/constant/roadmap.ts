import { RoadmapStructure } from "@/components/pages/Home/Roadmap";

export const roadmap: RoadmapStructure[] = [
  {
    value: "四字熟語",
    content: [
      { value: "四字熟語の登録", hasDone: true },
      { value: "四字熟語の一覧表示", hasDone: true },
      {
        value: "登録した四字熟語の演習",
        content: [
          {
            value: "漢字→よみの問題",
            hasDone: true,
          },
          {
            value: "よみ→漢字の問題",
            hasDone: true,
          },
          {
            value: "意味→漢字の問題",
            hasDone: true,
          },
          {
            value: "上二文字→下二文字の問題",
            hasDone: true,
          },
          {
            value: "下二文字→上二文字の問題",
            hasDone: true,
          },
        ],
      },
    ],
  },
  {
    value: "語彙ノート",
    content: [
      {
        value: "初めて知った語彙を登録する単語帳",
        hasDone: true,
      },
      {
        value: "LINE BOTなどを作り簡単に登録できるようにする",
        hasDone: false,
      },
    ],
  },
];
