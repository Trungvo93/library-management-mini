import React from "react";
import { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <Box>
              <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
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
                variant="contained"
                sx={{
                  m: "10px auto 0",
                  display: "block",
                  p: "10px 20px",
                }}>
                SIGN IN
              </Button>
            </Box>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
