import DataCalculation, {
  DailySum,
  KoteiSum,
  TripSum,
  TemporarySumFromRakuten,
  TemporarySumFromSbi,
  CardValidation
} from "../../data-calculation";
import React from "react";

const Payable = (props) => {
  const { month } = props;
  return (
    <div>
      <h2>
        {month}月の残りは
        <DataCalculation month={month} />
      </h2>
      <h3>予算￥ 260,000</h3>
      <h3>
        固定費
        <KoteiSum month={month} /> | 生活費 <DailySum month={month} /> | 旅行費 <TripSum month={month} />
      </h3>
      <h3>
        楽天銀行から
        <TemporarySumFromRakuten month={month} /> | SBIから <TemporarySumFromSbi month={month} />補充
      </h3>
      <h3><CardValidation month={month} /> </h3>
    </div>
  );
};

export default Payable;
