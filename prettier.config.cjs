/** @type {import('prettier').Config} */
module.export = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  printWidth: 120, // 折り返し100文字
  tabWidth: 2, // タブスペース単位2文字
  semi: true, // セミコロンを使う
  singleQuote: false, // ダブルクォート
  quoteProps: "consistent", // オブジェクト内でのプロパティへのセミコロンの有無をそろえる
  jsxSingleQuote: true, // jsx内でシングルウォートを使用する
  trailingComma: "all", //末尾カンマをつける
};
