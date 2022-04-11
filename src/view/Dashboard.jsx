import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import GetList from "./components/GetList";
import Payable from "./components/Payable";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  var today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Payable />
      </Grid>
      <Grid item xs={12}>
        <GetList collectionName="daily" month={month} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
