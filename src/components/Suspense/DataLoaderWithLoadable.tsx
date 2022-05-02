import { VFC } from "react";
import { Loadable } from "../../utils/Loadable";

type Props = {
  data: Loadable<string>;
};

/**
 * Loadableを受け取ってローディング中はサスペンドするコンポーネント
 * @param data Loadable
 */
export const DataLoaderWithLoadable: VFC<Props> = ({ data }) => {
  
  const value = data.getOrThrow();
  return (
    <div>
      <div>Data is {value}</div>
    </div>
  );
};
