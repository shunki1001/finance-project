import { Button } from "@mui/material";
import React, { useState } from "react";
import ChoiceMonth from "./components/ChoiceMonth";
import GetListIncome from "./components/GetListIncome";

const Income = () => {
  var today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);

  const createHandleClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <ChoiceMonth month={month} setMonth={setMonth} />
      <Button onClick={createHandleClick}>収入追加</Button>
      <GetListIncome month={month} />
    </div>
  );
};

export default Income;
