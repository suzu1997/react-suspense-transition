import { VFC } from "react";

type Props = {
  name: string;
};

/**
 * レンダリングされた（関数コンポーネントが呼び出された）らconsole.logするだけのコンポーネント
 */
export const RenderingNotifier: VFC<Props> = ({ name }) => {
  console.log(`${name} is rendered`);

  return null;
};
