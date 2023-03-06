import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { fetchUsers } from "../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Container, Row, Col } from "react-bootstrap";
import layoutStyles from "../css/Layout.module.scss";
import logoLibrary from "../images/logo-library.png";
import ReLogin from "./ReLogin";
import {
  Collapse,
  ListItemButton,
  List,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
const Layout = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({});
  const [openLogout, setOpenLogout] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [open, setOpen] = useState(false);
  let activeStyle = {
    color: "white",
    backgroundColor: "#2A2BE7",
    fontWeight: "bold",
  };
  let noneActiveStyle = {
    color: `gray`,
  };
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    const infoLoginUser = users.usersList.find(
      (e) => e.username === cookies.username
    );
    setLoginUser({ ...infoLoginUser });
    setCookie("username", cookies.username, {
      path: "/",
      maxAge: 180,
    });
    setCookie("status", "succeeded", { path: "/", maxAge: 180 });
  }, [store]);
  const handleGotoHome = () => {
    navigate("/index/dashboard");
  };
  const handleClickLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  const handleLogout = () => {
    navigate("/");
  };
  if (cookies.username !== "undefined" && cookies.status === "succeeded") {
    return (
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <List
              className={`${layoutStyles.menu}`}
              sx={{ width: "100%" }}
              component="nav">
              <ListItemButton onClick={handleGotoHome} className="my-3">
                <div className={` d-flex gap-3 my-3`}>
                  <img
                    src={logoLibrary}
                    alt=""
                    className={`${layoutStyles.logo}`}
                  />
                  <span className="fw-bold d-none d-xl-block">
                    librarian.io
                  </span>
                </div>
              </ListItemButton>

              <ListItemButton onClick={handleClick} className="mt-3 ">
                <div className="d-flex align-items-center gap-3">
                  {loginUser ? (
                    <>
                      <Avatar alt="Remy Sharp" src={loginUser.avatar} />
                      <div>
                        <span className="fw-bold d-none d-xl-block">
                          {loginUser.name}
                        </span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {open ? (
                  <ExpandLess className="ms-xl-auto " />
                ) : (
                  <ExpandMore className="ms-xl-auto " />
                )}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  className="me-0 d-flex gap-2 align-items-center">
                  <p
                    className={`m-0 ${layoutStyles.hoverLink} w-50 text-center`}>
                    Edit
                  </p>
                  <p
                    className={`m-0 ${layoutStyles.hoverLink} w-50 text-center`}
                    onClick={handleClickLogout}>
                    Logout
                  </p>
                </List>
              </Collapse>
              <hr />

              <ListItemButton className="p-0">
                <NavLink
                  to="dashboard"
                  className="text-decoration-none w-100 h-100 p-3"
                  style={({ isActive }) =>
                    isActive ? activeStyle : noneActiveStyle
                  }>
                  <div
                    className={` d-flex gap-3 align-items-center w-100 h-100`}>
                    <GridViewOutlinedIcon />
                    <p className="d-none d-xl-block m-0 w-100 ">Dashboard</p>
                  </div>
                </NavLink>
              </ListItemButton>
              <ListItemButton className="p-0">
                <NavLink
                  to="libraryloan"
                  className="text-decoration-none w-100 h-100 p-3"
                  style={({ isActive }) =>
                    isActive ? activeStyle : noneActiveStyle
                  }>
                  <div className={` d-flex gap-3 align-items-center`}>
                    <CachedOutlinedIcon />
                    <p className="d-none d-xl-block m-0 ">Library loan</p>
                  </div>
                </NavLink>
              </ListItemButton>
              <ListItemButton className="p-0">
                <NavLink
                  to="books"
                  className="text-decoration-none w-100 h-100 p-3"
                  style={({ isActive }) =>
                    isActive ? activeStyle : noneActiveStyle
                  }>
                  <div className={` d-flex gap-3 align-items-center`}>
                    <LibraryBooksOutlinedIcon />
                    <p className="d-none d-xl-block m-0 ">Books</p>
                  </div>
                </NavLink>
              </ListItemButton>

              <ListItemButton className="p-0">
                <NavLink
                  to="members"
                  className="text-decoration-none w-100 h-100 p-3"
                  style={({ isActive }) =>
                    isActive ? activeStyle : noneActiveStyle
                  }>
                  <div className={` d-flex gap-3 align-items-center`}>
                    <GroupOutlinedIcon />
                    <p className="d-none d-xl-block m-0 ">Members</p>
                  </div>
                </NavLink>
              </ListItemButton>
            </List>
          </Col>
          <Col md={7}>
            <Outlet />
          </Col>
          <Col md={3}>c</Col>
        </Row>
        <Dialog
          open={openLogout}
          onClose={handleCloseLogout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText color="error" sx={{ fontWeight: "bold" }}>
              Do you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseLogout}
              variant="text"
              sx={{ color: "gray" }}>
              Disagree
            </Button>
            <Button onClick={handleLogout} autoFocus variant="outlined">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  } else return <ReLogin />;
};

export default Layout;
