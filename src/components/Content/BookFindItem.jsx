import React, { useState, useEffect } from "react";
import {
  booksFindList,
  updateInfoLoan,
  inforBookLoan,
} from "../../redux/loansSlice";
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
const BookFindItem = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state) => state.loans);

  //Filter Book List
  const [typeFilterBook, setTypeFilterBook] = useState("title");
  const [findItemBook, setFindItemBook] = useState("");
  const [loadingFilterBook, setLoadingFilterBook] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoadingFilterBook(false);
    }, 500);
    return () => {
      clearTimeout(handler);
      setLoadingFilterBook(true);
    };
  }, [findItemBook, typeFilterBook]);

  const [inputField, setInputField] = useState("");
  useEffect(() => {
    if (loans.inforBookLoan.ISBN === null) {
      setInputField("");
      setSelectedOption(null);
    }
  }, [loans.inforBookLoan]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
    if (newValue !== null) {
      dispatch(
        inforBookLoan({
          ISBN: newValue.ISBN,
          amount: newValue.amount,
          title: newValue.title,
        })
      );
    }
  };
  return (
    <Box>
      <Grid container direction="row" gap={1} sx={{ marginY: "16px" }}>
        <Autocomplete
          freeSolo
          sx={{ flexGrow: 1 }}
          loading={loadingFilterBook}
          value={selectedOption}
          onOpen={() => {
            dispatch(booksFindList());
          }}
          inputValue={inputField}
          onInputChange={(event, value) => {
            setInputField(value);
            setFindItemBook(value);
          }}
          onChange={handleChange}
          getOptionLabel={(option) => {
            return option.title + " - ISBN: " + option.ISBN;
          }}
          options={loans.booksFindList}
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
              label="Find Book..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingFilterBook ? (
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
      <TextField
        margin="dense"
        value={selectedOption ? selectedOption.title : ""}
        disabled
        label="Title"
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
        value={selectedOption ? selectedOption.ISBN : ""}
        disabled
        label="ISBN"
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
        value={selectedOption ? selectedOption.amount : ""}
        disabled
        label="Amount"
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
        value={selectedOption ? selectedOption.author : ""}
        disabled
        label="Author"
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
        value={selectedOption ? selectedOption.publisher : ""}
        disabled
        label="Publisher"
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
        value={selectedOption ? selectedOption.category : ""}
        disabled
        label="Category"
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

export default BookFindItem;
