import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo_library from "../images/logo-library.png";
import "../css/Login.scss";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="banner my-5">
          <img src={logo_library} alt="Logo Library" />
          <div className="banner-text">
            <h5 className="mt-2">Nice to see you again</h5>
            <h1>WELCOME BACK</h1>
          </div>
        </Col>
        <Col md={6} className="login-form my-5">
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
