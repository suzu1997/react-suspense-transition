import { VFC } from "react";
import { sleep } from "../../utils/sleep";

/**
 * 50%の確率でサスペンドするコンポーネント
 */
export const SometimesSuspense: VFC = () => {
  console.log("SometimesSuspense is rendered");

  if (Math.random() < 0.5) {
    throw sleep(1000);
  }
  return <p className="text-green-700">Hello, world!</p>;
};
