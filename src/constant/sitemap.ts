export type Sitemap = {
  name: string;
  description: string;
  href: string;
  children?: Sitemap[];
};

export const sitemap: Sitemap = {
  name: "",
  description: "ページトップ",
  href: "/",
  children: [
    {
      name: "四字熟語",
      description: "四字熟語のメニューページ",
      href: "/yojijukugo",
      children: [
        {
          name: "一覧",
          description: "登録されている四字熟語の一覧",
          href: "/yojijukugo/list",
          children: [
            {
              name: "詳細",
              description: "登録されている四字熟語の詳細情報",
              href: "/yojijukugo/list/[yojijukugo_id]",
            },
          ],
        },
        {
          name: "演習",
          description: "登録されている四字熟語の問題演習",
          href: "/yojijukugo/exercise",
        },
        {
          name: "登録",
          description: "四字熟語の登録",
          href: "/yojijukugo/edit",
        },
      ],
    },
    {
      name: "語彙ノート",
      description: "勉強中に出会った言葉のまとめ",
      href: "/vocabulary",
    },
  ],
};
