import React, { useState, useEffect } from "react";
import { fetchLoans, usersFindList } from "../../redux/loansSlice";
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
      console.log("chạy nè");
      dispatch(usersFindList({ type: typeFilterUser, value: findItemUser }));

      setLoadingFilterUser(false);
    }, 500);
    return () => {
      clearTimeout(handler);
      setLoadingFilterUser(true);
    };
  }, [findItemUser, typeFilterUser]);

  const [selectedOption, setSelectedOption] = useState(null);

  const getOptionSelected = (option, value) => option.id === value.id;

  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  const getSelectedOptionObject = () => {
    return loans.usersFindList.find((option) =>
      getOptionSelected(option, selectedOption)
    );
  };
  console.log(selectedOption);
  return (
    <Box>
      <Grid container direction="row" gap={1} sx={{ marginY: "16px" }}>
        <Dropdown
          onSelect={(e) => {
            setTypeFilterUser(e);
          }}>
          <Dropdown.Toggle variant="primary" className="text-capitalize h-100">
            Search {typeFilterUser}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="name"
              className={typeFilterUser === "name" ? "active" : ""}>
              Name
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="studentCode"
              className={typeFilterUser === "studentCode" ? "active" : ""}>
              Student Code
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Autocomplete
          freeSolo
          sx={{ flexGrow: 1 }}
          loading={loadingFilterUser}
          getOptionSelected={getOptionSelected}
          value={selectedOption}
          onChange={handleChange}
          getOptionLabel={(option) => {
            {
              // console.log(option);
              return option.name + " - Student Code: " + option.studentCode;
            }
          }}
          options={loans.usersFindList}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find Student"
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
        value={
          loans.usersFindList.length == 1 ? loans.usersFindList[0].name : ""
        }
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
        value={
          loans.usersFindList.length == 1
            ? loans.usersFindList[0].studentCode
            : ""
        }
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
    </Box>
  );
};

export default UserFindItem;
