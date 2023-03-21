import React from "react";
import axios from "axios";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { vertifyLogin } from "../redux/loginSlice";
import logo_library from "../images/logo-library.png";
import loginStyles from "../css/Login.module.scss";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies([]);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({ username: "", password: "" });
  const [openAlert, setOpenAlert] = useState(false);
  const handleChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`
    );
    const checkAccount = res.data.find(
      (item) =>
        item.username === formLogin.username &&
        item.password === formLogin.password
    );
    if (checkAccount != undefined) {
      dispatch(vertifyLogin(checkAccount));

      setCookie("username", checkAccount.username, {
        path: "/",
        maxAge: 180,
      });

      setCookie("status", "succeeded", { path: "/", maxAge: 180 });
      setCookie("role", checkAccount.role, {
        path: "/",
        maxAge: 180,
      });
      navigate("/index/dashboard");
    } else {
      handleShowAlert();
    }
  };
  const handleShowAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };
  return (
    <Container>
      <Row className={`${loginStyles.main}`}>
        <Col lg={6} className={`${loginStyles.banner} my-5 d-none d-sm-block`}>
          <img src={logo_library} alt="Logo Library" />
          <div className={`${loginStyles["banner-text"]}`}>
            <h5 className="mt-2">Nice to see you again</h5>
            <h1>WELCOME BACK</h1>
          </div>
        </Col>
        <Col lg={6} className={`${loginStyles["login-form"]} my-5`}>
          <div className="shadow p-5 rounded">
            <h3 className="text-center fw-bold">Login Account</h3>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}>
              <Box>
                <TextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={formLogin.username}
                />
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    name="password"
                    value={formLogin.password}
                    onChange={(e) => handleChange(e)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    lg={6}
                    className="d-flex align-items-center justify-content-md-end">
                    <Link
                      to="recovery"
                      className="fst-italic text-decoration-none">
                      Forgot Password?
                    </Link>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    m: "10px auto 0",
                    display: "block",
                    p: "10px 20px",
                  }}>
                  SIGN IN
                </Button>
              </Box>
            </form>
          </div>
        </Col>
      </Row>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Username or Password not correct !
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
