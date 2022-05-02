import { VFC } from "react";
import { sleep } from "../../utils/sleep";

/**
 * 必ずsuspendするコンポーネント
 */
export const AlwaysSuspend: VFC = () => {
  // console.log("AlwaysSuspend is rendered");
  throw sleep(1000);
};
