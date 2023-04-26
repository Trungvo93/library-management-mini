import React from "react";
import dashboardStyle from "../../css/Dashboard.module.scss";
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
const Dashboard = () => {
  return (
    <Box marginTop="16px" marginX="16px">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{ backgroundColor: "#17A2B8", color: "white" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              padding="16px">
              <Grid item>
                <Typography variant="h3">35</Typography>
                <Typography variant="body1">Users</Typography>
              </Grid>
              <Grid item className={`${dashboardStyle.iconHover}`}>
                <PeopleAltOutlinedIcon sx={{ fontSize: "56px" }} />
              </Grid>
            </Grid>

            <CardActions
              sx={{ backgroundColor: "rgba(0,0,0,.1)" }}
              className={`${dashboardStyle.navigate}`}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={1}>
                <Typography variant="body1">More info </Typography>
                <ArrowCircleRightOutlinedIcon />
              </Grid>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{ backgroundColor: "#198754", color: "white" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              padding="16px">
              <Grid item>
                <Typography variant="h3">35</Typography>
                <Typography variant="body1">Books</Typography>
              </Grid>
              <Grid item className={`${dashboardStyle.iconHover}`}>
                <LibraryBooksOutlinedIcon sx={{ fontSize: "56px" }} />
              </Grid>
            </Grid>

            <CardActions
              sx={{ backgroundColor: "rgba(0,0,0,.1)" }}
              className={`${dashboardStyle.navigate}`}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={1}>
                <Typography variant="body1">More info </Typography>
                <ArrowCircleRightOutlinedIcon />
              </Grid>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{ backgroundColor: "#FFC107", color: "white" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              padding="16px">
              <Grid item>
                <Typography variant="h3">35</Typography>
                <Typography variant="body1">Borrows</Typography>
              </Grid>
              <Grid item className={`${dashboardStyle.iconHover}`}>
                <IndeterminateCheckBoxOutlinedIcon sx={{ fontSize: "56px" }} />
              </Grid>
            </Grid>

            <CardActions
              sx={{ backgroundColor: "rgba(0,0,0,.1)" }}
              className={`${dashboardStyle.navigate}`}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={1}>
                <Typography variant="body1">More info </Typography>
                <ArrowCircleRightOutlinedIcon />
              </Grid>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{ backgroundColor: "#DC3545", color: "white" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              padding="16px">
              <Grid item>
                <Typography variant="h3">35</Typography>
                <Typography variant="body1">Returned</Typography>
              </Grid>
              <Grid item className={`${dashboardStyle.iconHover}`}>
                <CheckBoxOutlinedIcon sx={{ fontSize: "56px" }} />
              </Grid>
            </Grid>

            <CardActions
              sx={{ backgroundColor: "rgba(0,0,0,.1)" }}
              className={`${dashboardStyle.navigate}`}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={1}>
                <Typography variant="body1">More info </Typography>
                <ArrowCircleRightOutlinedIcon />
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
