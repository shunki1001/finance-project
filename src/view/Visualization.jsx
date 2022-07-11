import { useState } from "react";

import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import DataSeries from "../data-series";

const Visualization = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Grid container>
      <Box sx={{ width: "100%" }}>
        {loading ? <LinearProgress color="secondary" /> : <></>}
      </Box>
      <h2>楽天銀行、SBIから補充する前の出費だよ～</h2>
      <Grid item xs={12}>
        <DataSeries setLoading={setLoading} />
      </Grid>
    </Grid>
  );
};

export default Visualization;
