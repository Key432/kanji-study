/**
 * 受け取った配列から重複なくランダムな要素を返す.
 * `array.length < count`の時は、配列の要素がすべて並び替えられて返される
 * @param array 任意の配列
 * @param count 配列から取得する要素数
 * @example choiceRandom([1,2,3,4,5], 2) => [1,4](結果は毎回変わる)
 * @example choiceRandom(["Alice", "Bob", "Charley"], 1) => ["Bob"](結果は毎回変わる)
 */
export function choiceRandom(array: unknown[], count: number): unknown[] {
  // 入力配列を変更しないように、配列をコピー
  const arrayCopy = [...array];

  // 結果の配列を初期化
  const result: unknown[] = [];

  // 配列の長さがcount以下の場合、配列全体をシャッフルして返す
  if (array.length <= count) {
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  }

  // ランダムに要素を選択
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    result.push(arrayCopy.splice(randomIndex, 1)[0]);
  }

  return result;
}
