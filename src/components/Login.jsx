import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo_library from "../images/logo-library.png";
import "../css/Login.scss";
const Login = () => {
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
          <div>
            <h3 className="text-center fw-bold">Login Account</h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
