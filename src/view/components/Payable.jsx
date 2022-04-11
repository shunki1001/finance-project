import DataCalculation, { DailySum, KoteiSum } from "../../data-calculation";
import React from "react";

const Payable = () => {
  return (
    <div>
      <h2>
        今月の残りの金額は
        <DataCalculation />
        です。
      </h2>
      <h3>
        固定費は
        <KoteiSum /> | 生活費は <DailySum />
        使っています
      </h3>
    </div>
  );
};

export default Payable;
