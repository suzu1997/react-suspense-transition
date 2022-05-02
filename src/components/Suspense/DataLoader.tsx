import { useEffect, useState, VFC } from "react";
import { useData } from "../../hooks/useData";
import { fetchData1 } from "../../utils/fetchDate1";

// let data: string | undefined;

export const DataLoader1: VFC = () => {
  // const [data, setData] = useState<string>("");

  // console.log(data);

  // if (!data) {
  //   throw fetchData1().then((d) => data = d);
  // }
  const data = useData("DataLoader1", fetchData1);

  return <div>Data is {data}</div>;
};
export const DataLoader2: VFC = () => {
  // const [data, setData] = useState<string>("");

  // console.log(data);

  // if (!data) {
  //   throw fetchData1().then((d) => data = d);
  // }
  const data = useData("DataLoader2", fetchData1);

  return <div>Data is {data}</div>;
};
