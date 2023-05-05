import React, { useEffect, useState } from "react";
import dashboardStyle from "../../css/Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/booksSlice";
import { fetchLoans } from "../../redux/loansSlice";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Avatar,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const books = useSelector((state) => state.books);
  const loans = useSelector((state) => state.loans);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchLoans());
  }, []);

  const [totalPaid, setTotalPaid] = useState(null);
  useEffect(() => {
    const total = loans.loansList.filter(
      (item) => item.status === "done"
    ).length;
    setTotalPaid(total);
  }, [loans.loansList]);

  //Get recent members
  const [recentMembers, setRecentMembers] = useState([]);
  useEffect(() => {
    if (users.usersList.length > 0) {
      let recent = [];
      for (
        let i = users.usersList.length - 1;
        i >= users.usersList.length - 6;
        i--
      ) {
        recent.push(users.usersList[i]);
        setRecentMembers(recent);
      }
    }
  }, [users.usersList]);

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
                <Typography variant="h3">
                  {users.usersList.length == 0 ? (
                    <Skeleton variant="text" />
                  ) : (
                    users.usersList.length
                  )}
                </Typography>
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
                gap={1}
                onClick={() => {
                  navigate("/index/members");
                }}>
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
                <Typography variant="h3">
                  {books.booksList.length == 0 ? (
                    <Skeleton variant="text" />
                  ) : (
                    books.booksList.length
                  )}
                </Typography>
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
                gap={1}
                onClick={() => {
                  navigate("/index/books");
                }}>
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
                <Typography variant="h3">
                  {loans.loansList.length == 0 ? (
                    <Skeleton variant="text" />
                  ) : (
                    loans.loansList.length
                  )}
                </Typography>
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
                gap={1}
                onClick={() => {
                  navigate("/index/libraryloan");
                }}>
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
                <Typography variant="h3">
                  {loans.loansList.length == 0 ? (
                    <Skeleton variant="text" />
                  ) : (
                    totalPaid
                  )}
                </Typography>
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
                gap={1}
                onClick={() => {
                  navigate("/index/libraryloan");
                }}>
                <Typography variant="body1">More info </Typography>
                <ArrowCircleRightOutlinedIcon />
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginTop: "16px" }}>
        <Grid item sm={4} xs={12}>
          <Card className="shadow">
            <CardHeader
              title="Recently Added Members"
              className="fw-bold mb-3 border-bottom "
            />
            <CardContent>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {recentMembers.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    container
                    direction="row"
                    alignItems="center"
                    gap={3}
                    wrap="nowrap">
                    <Avatar src={item.avatar} />

                    <Typography variant="body1" noWrap>
                      {item.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Card sx={{ backgroundColor: "green", color: "white" }}>bbb</Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
