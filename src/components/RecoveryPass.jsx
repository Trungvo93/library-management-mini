import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [formReset, setFormReset] = useState({ username: "", email: "" });
  const handleClickOpen = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `https://63e4ba3dc04baebbcdaa9a7e.mockapi.io/users/`
    );
    const checkAccount = res.data.find(
      (item) =>
        item.username === formReset.username && item.email === formReset.email
    );
    if (checkAccount != undefined) {
      setOpen(true);
    } else {
      handleShowAlert();
    }
  };
  const handleChange = (e) => {
    setFormReset({ ...formReset, [e.target.name]: e.target.value });
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
            <h3 className="text-center fw-bold">Forgot Password</h3>
            <form onSubmit={handleClickOpen}>
              <Box>
                <TextField
                  label="Your Username"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="username"
                  value={formReset.username}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <TextField
                  label="Your Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="email"
                  name="email"
                  value={formReset.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    m: "10px auto 0",
                    display: "block",
                    p: "10px 20px",
                  }}>
                  RESET PASSWORD
                </Button>
              </Box>
            </form>
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
