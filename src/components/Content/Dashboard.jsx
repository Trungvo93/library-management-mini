import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
const Dashboard = () => {
  return (
    <Box marginTop="16px" marginX="16px">
      <Grid
        Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{ backgroundColor: "green" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Grid item>
                <Typography variant="body1">ABC</Typography>
                <Typography variant="body1">ABC</Typography>
              </Grid>
            </Grid>
          </Card>
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
