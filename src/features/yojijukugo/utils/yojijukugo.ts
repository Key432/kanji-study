export const FULL_TEXT_READING_REGEX =
  /^(?:[\u3040-\u309F]+[・、]){3}[\u3040-\u309F]+$/;

/**
 *
 * @param text 文字列
 * @returns 「・」と「、」を取り除いた文字列
 * @example "い・い・だく・だく" -> "いいだくだく"
 */
export function removeSeparator(text: string) {
  return text.replaceAll("・", "").replaceAll("、", "");
}

/**
 *
 * @param text 文字列
 * @returns 「・」か「、」ごとに分割した文字列配列
 * @example "い・い・だく・だく" -> ["い", "い", "だく", "だく"]
 * @example "い、い、だく、だく" -> ["い", "い", "だく", "だく"]
 * @example "い・い、だく、だく" -> ["い", "い", "だく", "だく"]
 */
export function splitBySeparator(text: string) {
  return text.replaceAll("、", "・").split("・");
}

/**
 *
 * @param text 文字列
 * @returns 文字毎に分割した文字列配列
 * @example "唯唯諾諾" -> ["唯", "唯", "諾", "諾"]
 */
export function splitCharacter(text: string) {
  return text.split("");
}

/**
 *
 * @param text 文字列
 * @returns 文字列が四字熟語の読みの想定入力に合致するか
 * @example
 *    "い・い・だく・だく" -> true
 *    "い、い、だく、だく" -> true [・か、区切りで四分割される想定]
 *    "いいだくだく" -> false [・か、区切りで四分割される想定]
 *    "イ・イ・ダク・ダク" -> false [ひらがなで入力]
 */
export function testYojijukugoReading(text: string) {
  return FULL_TEXT_READING_REGEX.test(text);
}

/**
 *
 * @param text 文字列
 * @returns 文字列が四字熟語の想定入力に合致するか
 */
export function testYojijukugoText(text: string) {
  return splitCharacter(text).length === 4;
}
