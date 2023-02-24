import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { fetchUsers } from "../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Button } from "react-bootstrap";
import layoutStyles from "../css/Layout.module.scss";
import logoLibrary from "../images/logo-library.png";

import {
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
  ListSubheader,
  Avatar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
const Layout = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({});
  const [cookies, setCookie] = useCookies();
  const [open, setOpen] = useState(true);

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
  return (
    <Container fluid>
      <Row>
        {/* <Col
          md={2}
          className={`${layoutStyles.menu} p-3 d-flex flex-column gap-4`}>
          <div className={`${layoutStyles.logo} d-flex gap-3 mt-3`}>
            <img src={logoLibrary} alt="" />
            <span className="fw-bold d-none d-xl-block">Librarian</span>
          </div>

          <div className="d-flex align-items-center gap-3 ">
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
        </Col> */}
        <Col md={2} className="p-0">
          <List
            className={`${layoutStyles.menu}`}
            sx={{ width: "100%" }}
            component="nav">
            <ListItemButton onClick={handleGotoHome} className="mt-3">
              <div className={` d-flex gap-3 mt-3`}>
                <img
                  src={logoLibrary}
                  alt=""
                  className={`${layoutStyles.logo}`}
                />
                <span className="fw-bold d-none d-xl-block">librarian.io</span>
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
                className="me-0 d-flex justify-content-around gap-2 align-items-center">
                <p className={`m-0 ${layoutStyles.hoverLink}`}>Edit</p>
                <p className={`m-0 ${layoutStyles.hoverLink}`}>Logout</p>
              </List>
            </Collapse>
          </List>
        </Col>
        <Col md={7}>
          <Outlet />
        </Col>
        <Col md={3}>c</Col>
      </Row>
    </Container>
  );
};

export default Layout;
