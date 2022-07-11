import DataCalculation, {
  TemporarySumFromRakuten,
  TemporarySumFromSbi,
} from "../../data-calculation";
import CardValidation from "../../data-calculation/CardValidation";

import React from "react";

const Payable = (props) => {
  const { month } = props;
  return (
    <div>
      <h2>
        {month}月の残り
        <span style={{ fontSize: "1.4em", textDecoration: "underLine" }}>
          <DataCalculation month={month} />
        </span>{" "}
        / 260,000
      </h2>
      <h3>
        楽天銀行から
        <TemporarySumFromRakuten month={month} /> | SBIから{" "}
        <TemporarySumFromSbi month={month} />
        補充
      </h3>
      <h3>
        <CardValidation month={month} />{" "}
      </h3>
    </div>
  );
};

export default Payable;
