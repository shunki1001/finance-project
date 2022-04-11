import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import ChoiceMonth from "./components/ChoiceMonth";
import GetList from "./components/GetList";

const Kotei = () => {
  var today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  return (
    <>
      <Grid container>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <ChoiceMonth month={month} setMonth={setMonth} />
        </Grid>
        <Grid item xs={12}>
          <GetList collectionName="kotei" month={month} />
        </Grid>
      </Grid>
    </>
  );
};

export default Kotei;
