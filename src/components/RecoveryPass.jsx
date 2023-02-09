import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import recoveryStyles from "../css/RecoveryPass.module.scss";
import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Alert,
  Snackbar,
} from "@mui/material";
const RecoveryPass = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {
    navigate("/");
  };

  const handleShowAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };
  return (
    <Container>
      <Row className="main">
        <Col
          lg={6}
          className={`${recoveryStyles["recovery-form"]} my-5 mx-auto `}>
          <div className="shadow p-5 rounded">
            <Button
              variant="contained"
              sx={{
                m: "10px auto 0",
                display: "block",
                p: "10px 20px",
              }}
              onClick={() => {
                handleShowAlert();
              }}>
              Test
            </Button>
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
                fullWidth
                sx={{
                  m: "10px auto 0",
                  display: "block",
                  p: "10px 20px",
                }}
                onClick={handleClickOpen}>
                RESET PASSWORD
              </Button>
            </Box>
          </div>
        </Col>
      </Row>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText className="text-success fw-bold text-uppercase">
            New password has been sent to email
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLogin}
            variant="contained"
            autoFocus
            color="success">
            Sign in
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: "gray",
            }}>
            Stay here
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Username or Email not correct !
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RecoveryPass;
