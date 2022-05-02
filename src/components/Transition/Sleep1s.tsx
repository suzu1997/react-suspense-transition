import { VFC } from "react";
import { sleep } from "../../utils/sleep";

let sleeping = true;

/**
 * １秒間サスペンドするコンポーネント.
 */
export const Sleep1s: VFC = () => {
  if (sleeping) {
    throw sleep(1000).then(() => {
      sleeping = false;
    });
  }
  return <p>Hello!</p>;
};
