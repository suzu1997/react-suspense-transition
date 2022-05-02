import { VFC } from "react";
import { useData } from "../../hooks/useData";
import { fetchData1 } from "../../utils/fetchDate1";

type Props = {
  datakey: number;
};

export const ShowData: VFC<Props> = ({ datakey }) => {
  const data = useData(`ShowData: ${datakey}`, fetchData1);
  return (
    <div>
      Data for {datakey} is {data}
    </div>
  );
};
