import React from "react";
import { Box, Grid } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const AddUser = () => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{
          marginTop: "10px",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#fbb03b",
          backgroundColor: "#00205b",
        }}>
        <PersonAddIcon fontSize="32px" />
        <p className="m-0 ">ADD USER</p>
      </Grid>
    </Box>
  );
};

export default AddUser;
