import React, { useState, useEffect } from "react";
import { fetchLoans, booksFindList } from "../../redux/loansSlice";
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
      dispatch(booksFindList({ type: typeFilterBook, value: findItemBook }));

      setLoadingFilterBook(false);
    }, 500);
    return () => {
      clearTimeout(handler);
      setLoadingFilterBook(true);
    };
  }, [findItemBook, typeFilterBook]);

  return (
    <Box>
      <Grid container direction="row" gap={1} sx={{ marginY: "16px" }}>
        <Dropdown
          onSelect={(e) => {
            setTypeFilterBook(e);
          }}>
          <Dropdown.Toggle variant="primary" className="text-capitalize h-100">
            Search {typeFilterBook}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="title"
              className={typeFilterBook === "title" ? "active" : ""}>
              Title
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="ISBN"
              className={typeFilterBook === "ISBN" ? "active" : ""}>
              ISBN
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Autocomplete
          freeSolo
          sx={{ flexGrow: 1 }}
          onInputChange={(event, value) => {
            setFindItemBook(value);
          }}
          loading={loadingFilterBook}
          isOptionEqualToValue={(option, value) => {
            console.log("value: " + value);
            return option === value;
          }}
          getOptionLabel={(option) => {
            return option.toString();
          }}
          options={loans.booksFindList.map((option) =>
            typeFilterBook === "title" ? option.title : option.ISBN
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find Book"
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
        value={
          loans.booksFindList.length == 1 ? loans.booksFindList[0].title : ""
        }
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
        value={
          loans.booksFindList.length == 1 ? loans.booksFindList[0].ISBN : ""
        }
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
        value={
          loans.booksFindList.length == 1 ? loans.booksFindList[0].amount : ""
        }
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
        value={
          loans.booksFindList.length == 1 ? loans.booksFindList[0].author : ""
        }
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
        value={
          loans.booksFindList.length == 1
            ? loans.booksFindList[0].publisher
            : ""
        }
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
        value={
          loans.booksFindList.length == 1 ? loans.booksFindList[0].category : ""
        }
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
