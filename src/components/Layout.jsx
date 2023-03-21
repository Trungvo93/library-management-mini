import React, { useEffect, useState, useMemo } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { fetchUsers } from "../redux/usersSlice";
import { updatePass, vertifyLogin } from "../redux/loginSlice";

import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import layoutStyles from "../css/Layout.module.scss";
import logoLibrary from "../images/logo-library.png";
import ReLogin from "./ReLogin";
import { Dropdown } from "react-bootstrap";
import {
  Collapse,
  ListItemButton,
  List,
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Grid,
  Box,
  TextField,
  FormHelperText,
  Container,
} from "@mui/material";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const Layout = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({});
  const [openLogout, setOpenLogout] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [formChangePass, setFormChangePass] = useState({
    curPassword: "",
    newPassword: "",
    confirmPassword: "",
    errCurPass: true,
    errNewPass: true,
    errConfirmPass: true,
  });
  const [cookies, setCookie, removeCookie] = useCookies();
  const [open, setOpen] = useState(false);
  let activeStyle = {
    borderBottom: "2px solid #1c79c0",
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
    setCookie("role", cookies.role, {
      path: "/",
      maxAge: 180,
    });
  }, [store]);
  const handleGotoHome = () => {
    navigate("/index/dashboard");
  };

  //Logout
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  const navigateLogout = () => {
    removeCookie("username", { path: "/" });
    removeCookie("role", { path: "/" });
    removeCookie("status", { path: "/" });
    navigate("/");
  };

  //ChangePassword
  const regexPassword = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );
  const handleChangePass = (e) => {
    setFormChangePass({ ...formChangePass, [e.target.name]: e.target.value });
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const submitChangePass = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `https://evon.cksvietnam.vn/users/${loginUser.id}`
    );
    dispatch(vertifyLogin(res.data));

    if (formChangePass.curPassword !== res.data.password) {
      document.getElementById("errorCurPassword").innerText =
        "Password do not match";
      formChangePass.errCurPass = true;
    } else {
      document.getElementById("errorCurPassword").innerText = "";
      formChangePass.errCurPass = false;
    }
    if (!regexPassword.test(formChangePass.newPassword)) {
      document.getElementById("errorNewPassword").innerText =
        "Minimum length of 8 and containing at least 1 upper, lower and numberic character (a-z,A-Z,0-9)";
      formChangePass.errNewPass = true;
    } else {
      document.getElementById("errorNewPassword").innerText = "";
      formChangePass.errNewPass = false;
    }
    if (formChangePass.confirmPassword !== formChangePass.newPassword) {
      document.getElementById("errorConfirmPassword").innerText =
        "'Confirmation Password' and 'New Password' do not match";
      formChangePass.errConfirmPass = true;
    } else {
      document.getElementById("errorConfirmPassword").innerText = "";
      formChangePass.errConfirmPass = false;
    }

    if (
      !formChangePass.errCurPass &&
      !formChangePass.errNewPass &&
      !formChangePass.errConfirmPass
    ) {
      dispatch(
        updatePass({ ...loginUser, password: formChangePass.newPassword })
      );
    }
  };
  if (cookies.username !== "undefined" && cookies.status === "succeeded") {
    return (
      <Grid>
        {/* Header */}
        <Grid
          className="border-bottom"
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingX: "16px", height: "55px" }}>
          <Box
            onClick={handleGotoHome}
            className={`${layoutStyles.hoverLink}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#1c79c0",
              height: "100%",
            }}>
            <img src={logoLibrary} alt="" className={`${layoutStyles.logo}`} />
            <p className="m-0 fw-bold ">librarian.io</p>
          </Box>
          <Box>
            {loginUser ? (
              <Box
                className={`${layoutStyles.hoverLink}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}>
                <Avatar alt="Remy Sharp" src={loginUser.avatar} />

                <Dropdown>
                  <Dropdown.Toggle variant="none">
                    {loginUser.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item className="d-flex align-items-center gap-2">
                      <EditIcon sx={{ fontSize: "16px" }} />
                      <p className="m-0">Your profile</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleOpenChangePassword}
                      className="d-flex align-items-center gap-2">
                      <SyncLockIcon sx={{ fontSize: "16px" }} />
                      <p className="m-0">Change password</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleOpenLogout}
                      className="d-flex align-items-center gap-2">
                      <ExitToAppIcon sx={{ fontSize: "16px" }} />
                      <p className="m-0">Sign out</p>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Grid>

        {/* Menu */}
        <Grid
          className="border-bottom"
          container
          justifyContent="flex-start"
          alignItems="center">
          <NavLink
            to="dashboard"
            className="text-decoration-none p-3"
            style={({ isActive }) =>
              isActive ? activeStyle : noneActiveStyle
            }>
            <div className={` d-flex gap-3 align-items-center w-100 h-100`}>
              <GridViewOutlinedIcon />
              <p className="m-0 ">Dashboard</p>
            </div>
          </NavLink>
          <NavLink
            to="members"
            className="text-decoration-none p-3"
            style={({ isActive }) =>
              isActive ? activeStyle : noneActiveStyle
            }>
            <div className={` d-flex gap-3 align-items-center w-100 h-100`}>
              <GroupOutlinedIcon />
              <p className="m-0 ">Members</p>
            </div>
          </NavLink>
          <NavLink
            to="books"
            className="text-decoration-none p-3"
            style={({ isActive }) =>
              isActive ? activeStyle : noneActiveStyle
            }>
            <div className={` d-flex gap-3 align-items-center w-100 h-100`}>
              <LibraryBooksOutlinedIcon />
              <p className="m-0 ">Books</p>
            </div>
          </NavLink>
          <NavLink
            to="libraryloan"
            className="text-decoration-none p-3"
            style={({ isActive }) =>
              isActive ? activeStyle : noneActiveStyle
            }>
            <div className={` d-flex gap-3 align-items-center w-100 h-100`}>
              <CachedOutlinedIcon />
              <p className="m-0 ">Library loan</p>
            </div>
          </NavLink>
        </Grid>

        <Outlet></Outlet>
        {/* Show confirm Sign out */}
        <Dialog
          open={openLogout}
          onClose={handleCloseLogout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText color="error" sx={{ fontWeight: "bold" }}>
              Do you want to sign out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseLogout}
              variant="text"
              sx={{ color: "gray" }}>
              No
            </Button>
            <Button onClick={navigateLogout} autoFocus variant="outlined">
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Show changePassword*/}
        <Dialog
          open={openChangePassword}
          onClose={handleCloseChangePassword}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <form
            onSubmit={(e) => {
              submitChangePass(e);
            }}>
            <DialogTitle>Change your password</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="curPassword"
                label="Current Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleChangePass}
              />
              <FormHelperText
                sx={{ color: "red" }}
                id="errorCurPassword"></FormHelperText>
              <TextField
                autoFocus
                margin="dense"
                name="newPassword"
                label="New Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleChangePass}
              />
              <FormHelperText
                sx={{ color: "red" }}
                id="errorNewPassword"></FormHelperText>
              <TextField
                autoFocus
                margin="dense"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleChangePass}
              />
              <FormHelperText
                sx={{ color: "red" }}
                id="errorConfirmPassword"></FormHelperText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseChangePassword}
                variant="text"
                sx={{ color: "gray" }}>
                Disagree
              </Button>
              <Button type="submit" autoFocus variant="outlined">
                Agree
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    );
  } else return <ReLogin />;
};

export default Layout;
