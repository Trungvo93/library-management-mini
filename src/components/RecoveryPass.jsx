import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import recoveryStyles from "../css/RecoveryPass.module.scss";
import { TextField, Box, Button } from "@mui/material";
const RecoveryPass = () => {
  return (
    <Container>
      <Row className="main">
        <Col
          lg={6}
          className={`${recoveryStyles["recovery-form"]} my-5 mx-auto `}>
          <div className="shadow p-5 rounded">
            <h3 className="text-center fw-bold">Forgot Password</h3>
            <Box>
              <TextField
                label="Your Username"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Your Email"
                variant="outlined"
                margin="normal"
                fullWidth
                type="email"
              />
              <Button
                variant="contained"
                sx={{
                  m: "10px auto 0",
                  display: "block",
                  p: "10px 20px",
                }}>
                SUBMIT
              </Button>
            </Box>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecoveryPass;
