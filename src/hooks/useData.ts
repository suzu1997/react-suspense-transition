// import { fetchData1 } from '../utils/fetchDate1'
import { Loadable } from '../utils/Loadable';

// グローバル変数を使う
// let data: string | undefined

// Mapを使用し、キャッシュキーを指定できるようにする 
// const dataMap: Map<string, unknown> = new Map();

const dataMap: Map<string, Loadable<unknown>> = new Map();

/**
 * データを取得するカスタムフック.
 * @remarks キャッシュキーとfetch関数を受け取る、汎用的なメソッド
 * @params cachekey キャッシュキー
 * @params fetch fetch関数
 * @returns データ 
 */
export const useData = <T>(cacheKey: string, fetch: () => Promise<T>): T => {
  // cashkeyを指定して、キャッシュされたデータを取得する
  // const cachedData = dataMap.get(cashkey) as T | undefined;

  const cachedData = dataMap.get(cacheKey) as Loadable<T> | undefined;
  // dataがまだ無ければ(キャッシュされていなければ)ローディングを開始する
  if (cachedData === undefined) {
    // dataMapにキャッシュキーとデータを格納
    // throw fetch().then((d) => dataMap.set(cacheKey, d)); // データ取得後、初めてデータを格納

    const [loadable, promise] = Loadable.newAndGetPromise(fetch());
    dataMap.set(cacheKey, loadable); // データ取得中にLoadableを格納→同じキャッシュキーに対する複数回フェッチを避ける
    throw promise; 
  }
  // dataがまだ無ければローディングを開始する
  // if (data === undefined) {
  //   // グローバル変数にデータを格納
  //   throw fetchData1().then((d) => data = d)
  // }

  return cachedData.getOrThrow();
}