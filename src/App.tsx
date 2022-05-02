import { startTransition, Suspense, useState, useTransition } from "react";
import "./App.css";
// import { AlwaysSuspend } from "./components/Suspense/AlwaysSuspend";
// import { DataLoader1, DataLoader2 } from "./components/Suspense/DataLoader";
// import { DataLoaderWithLoadable } from "./components/Suspense/DataLoaderWithLoadable";
// import { RenderingNotifier } from "./components/Suspense/RenderingNotifier";
// import { SometimesSuspense } from "./components/Suspense/SometimesSuspense";
import { ShowData } from "./components/Transition/ShowData";
import { Sleep1s } from "./components/Transition/Sleep1s";
import { useTime } from "./hooks/useTime";
import { fetchData1 } from "./utils/fetchDate1";
import { Loadable } from "./utils/Loadable";

function App() {
  const [count, setCount] = useState<number>(0);

  // データ取得
  const data1 = new Loadable(fetchData1());
  const data2 = new Loadable(fetchData1());
  const data3 = new Loadable(fetchData1());

  const [sleepIsShown, setSleepIsShown] = useState(false);
  const [counter, setCounter] = useState(0);

  const time = useTime();

  const [isPending, startTransition] = useTransition();

  return (
    <div className="text-center">
      <h1 className="text-2xl text-blue-700">React App!</h1>

      {/* NOTE: tabular-nums ... 数字を等幅数字で表示 */}
      <p className={"tabular-nums" + (isPending ? " text-blue-700" : "")}>
        🕒 {time}
      </p>

      {/* Suspense */}
      <h2 className="text-xl text-red-700 font-bold border-b-2 border-b-black my-5">
        Suspense
      </h2>
      {/* Suspenseコンポーネントはサスペンドの境界を定義する */}
      {/* <Suspense fallback={<p className="text-blue-700">Loading...</p>}>
        <p>ここは表示される？</p>
        <RenderingNotifier name="outside-Suspense" />
        <Suspense fallback={<p className="text-blue-700">Loading...</p>}>
          <SometimesSuspense />
          <RenderingNotifier name="inside-Suspense" />
          <button className="border p-1" onClick={() => setCount((c) => c + 1)}>
            {count}
          </button>
        </Suspense>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader1 />
        <DataLoader2 />
      </Suspense>
      <Suspense fallback={<p>Render-as-you-fetchパターン Loading...</p>}>
        <DataLoaderWithLoadable data={data1} />
      </Suspense>
      <Suspense fallback={<p>Render-as-you-fetchパターン Loading...</p>}>
        <DataLoaderWithLoadable data={data2} />
      </Suspense>
      <Suspense fallback={<p>Render-as-you-fetchパターン Loading...</p>}>
        <DataLoaderWithLoadable data={data3} />
      </Suspense> */}

      {/* Transition */}
      <h2 className="text-xl text-red-700 font-bold border-b-2 border-b-black my-5">
        Transition
      </h2>
      <Suspense fallback={<p>Loading...</p>}>
        {sleepIsShown ? <Sleep1s /> : null}
      </Suspense>
      <button
        onClick={() => {
          startTransition(() => {
            // setSleepIsShownを、優先度の低いステート更新とする
            setSleepIsShown(true);
          });
        }}
        className="border p-1"
      >
        Show Sleep1s
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        {/* トランジションの結果、フォールバックなしで再レンダリング */}
        <ShowData datakey={counter} />
      </Suspense>
      <p>
        <button
          className="border p-1"
          onClick={() => {
            startTransition(() => {
              // 優先度の低いステート更新
              setCounter((counter) => counter + 1);
            });
          }}
        >
          {/* ここも、トランジションの結果として遅延して再レンダリングが行われる */}
          Counter is {counter}
        </button>
      </p>
    </div>
  );
}

export default App;
