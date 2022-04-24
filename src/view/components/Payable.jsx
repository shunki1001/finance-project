import DataCalculation, {
  DailySum,
  KoteiSum,
  TemporarySum,
} from "../../data-calculation";
import React from "react";

const Payable = (props) => {
  const { month } = props;
  return (
    <div>
      <h2>
        {month}月の残りの金額は
        <DataCalculation month={month} />
        です。
      </h2>
      <h3>
        固定費は
        <KoteiSum month={month} /> | 生活費は <DailySum month={month} />
        使っています
      </h3>
      <h3>
        臨時的な出費として、
        <TemporarySum month={month} />
        使っています。
      </h3>
    </div>
  );
};

export default Payable;
