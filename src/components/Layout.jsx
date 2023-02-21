import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import layoutStyles from "../css/Layout.module.scss";
import logoLibrary from "../images/logo-library.png";
const Layout = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className={`${layoutStyles.menu} p-3`}>
          <div className={`${layoutStyles.logo} d-flex gap-3`}>
            <img src={logoLibrary} alt="" />
            <span className="fw-bold d-none d-xl-block">Librarian</span>
          </div>
        </Col>
        <Col md={7}>b</Col>
        <Col md={3}>c</Col>
      </Row>
    </Container>
  );
};

export default Layout;
