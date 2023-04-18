import React, { useState, useEffect } from "react";
import { usersFindList, updateInforLoan } from "../../redux/loansSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {
  Button,
  Box,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  Autocomplete,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
const UserFindItem = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state) => state.loans);

  //Filter Book List
  const [typeFilterUser, setTypeFilterUser] = useState("name");
  const [findItemUser, setFindItemUser] = useState("");
  const [loadingFilterUser, setLoadingFilterUser] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoadingFilterUser(false);
    }, 500);
    return () => {
      clearTimeout(handler);
      setLoadingFilterUser(true);
    };
  }, [findItemUser, typeFilterUser]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  //Config User loan
  const handleTest = () => {
    dispatch(updateInforLoan({}));
  };
  return (
    <Box>
      <Grid container direction="row" gap={1} sx={{ marginY: "16px" }}>
        <Autocomplete
          freeSolo
          sx={{ flexGrow: 1 }}
          loading={loadingFilterUser}
          value={selectedOption}
          onOpen={() => {
            dispatch(usersFindList());
          }}
          onInputChange={(event, value) => {
            setFindItemUser(value);
          }}
          onChange={handleChange}
          getOptionLabel={(option) => {
            {
              return option.name + " - Student Code: " + option.studentCode;
            }
          }}
          options={loans.usersFindList}
          renderInput={(params) => (
            <TextField
              color="secondary"
              sx={{
                "& .MuiInputLabel-root ": {
                  WebkitTextFillColor: "#9C27B0",
                  fontWeight: "bold",
                },
              }}
              {...params}
              label="Find Student..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingFilterUser ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Grid>

      {/* Show data founded */}
      <TextField
        margin="dense"
        value={selectedOption ? selectedOption.name : ""}
        disabled
        label="Name"
        fullWidth
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },

          "& .MuiInputLabel-root.Mui-disabled": {
            WebkitTextFillColor: "#1c79c0",
            fontWeight: "bold",
          },
        }}
      />
      <TextField
        margin="dense"
        value={selectedOption ? selectedOption.studentCode : ""}
        disabled
        label="Student Code"
        fullWidth
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
          "& .MuiInputLabel-root.Mui-disabled": {
            WebkitTextFillColor: "#1c79c0",
            fontWeight: "bold",
          },
        }}
      />

      <TextField
        type="date"
        label="Day Return"
        variant="outlined"
        fullWidth
        margin="dense"
        required
      />
      <Button
        onClick={() => {
          handleTest();
        }}>
        Submit
      </Button>
    </Box>
  );
};

export default UserFindItem;
