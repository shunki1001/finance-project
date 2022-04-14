import { useState } from "react";

import { Grid } from "@mui/material";

import DataSeries from "../data-series";

const Visualization = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataSeries />
      </Grid>
    </Grid>
  );
};

export default Visualization;
