import React from "react";
import { Box, Grid } from "@mui/material";
const Dashboard = () => {
  return (
    <Box marginTop="16px">
      <Grid
        Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item md={3} sm={6} xs={12}>
          <Box sx={{ backgroundColor: "green" }}>asdasd</Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box sx={{ backgroundColor: "green" }}>asdasd</Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box sx={{ backgroundColor: "green" }}>asdasd</Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box sx={{ backgroundColor: "green" }}>asdasd</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
