import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import GetList from "./components/GetList";
import Payable from "./components/Payable";
import ChoiceMonth from "./components/ChoiceMonth";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  var today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Payable month={month} />
      </Grid>
      <Grid item xs={8}></Grid>
      <Grid item xs={4}>
        <ChoiceMonth month={month} setMonth={setMonth} />
      </Grid>
      <Grid item xs={12}>
        <GetList collectionName="daily" month={month} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
