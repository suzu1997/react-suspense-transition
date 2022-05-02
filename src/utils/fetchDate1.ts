const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 1秒後に「Hello, 123」のようなランダムな数字を含む文字列を返す 
 */
export const fetchData1 = async (): Promise<string> => {
  await sleep(Math.floor(Math.random() * 1000));
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}