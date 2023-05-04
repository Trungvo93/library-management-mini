import React, { useState, useEffect } from "react";
import {
  usersFindList,
  addLoan,
  inforBookLoan,
  fetchLoans,
  fetchLoanPerPage,
  loansFindLenght,
} from "../../redux/loansSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
const UserFindItem = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state) => state.loans);

  //Filter Book List
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
  }, [findItemUser]);
  const [inputField, setInputField] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  //Config User loan

  //Config Min Day
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  if (month < 10) {
    month = "0" + month.toString();
  }
  let date = dateNow.getDate();
  if (date < 10) {
    date = "0" + date.toString();
  }

  const [amount, setAmount] = useState(1);
  const [dayReturn, setDayReturn] = useState(year + "-" + month + "-" + date);
  const [note, setNote] = useState("");
  const handleSubmit = async () => {
    if (loans.inforBookLoan.ISBN !== null) {
      const formSubmit = {
        dayBorrow: year + "-" + month + "-" + date,
        dayReturn: dayReturn,
        ISBN: loans.inforBookLoan.ISBN,
        title: loans.inforBookLoan.title,
        amount: amount,
        note: note,
        name: selectedOption.name,
        studentCode: selectedOption.studentCode,
        status: "unpaid",
        dayReturned: "",
      };
      await dispatch(addLoan({ ...formSubmit }));
      await dispatch(inforBookLoan({ ISBN: null, amount: 1, title: null }));
      await dispatch(
        fetchLoanPerPage({
          indexPage: loans.loanPerPage.indexPage,
          type: loans.loanPerPage.type,
          value: loans.loanPerPage.item,
        })
      );
      await dispatch(
        loansFindLenght({
          type: loans.loansFindLenght.type,
          value: loans.loansFindLenght.item,
        })
      );
      setSelectedOption(null);
      setInputField("");
      setAmount(1);
      setDayReturn(year + "-" + month + "-" + date);
      setNote("");
      setOpenAlertAdd(true);
    }
  };

  //Show alert delete success message
  const [openAlertAdd, setOpenAlertAdd] = useState(false);
  const handleCloseAlertAdd = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertAdd(false);
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
          inputValue={inputField}
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextField
          type="date"
          value={dayReturn}
          onChange={(e) => setDayReturn(e.target.value)}
          label="Day Return"
          variant="outlined"
          fullWidth
          margin="dense"
          required
          inputProps={{
            min: year + "-" + month + "-" + date,
          }}
        />
        <TextField
          type="number"
          label="Amount"
          variant="outlined"
          fullWidth
          margin="dense"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{
            min: 1,
            max: loans.inforBookLoan.amount,
          }}
        />
        <TextField
          label="Note"
          variant="outlined"
          fullWidth
          margin="dense"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          margin="dense"
          variant="contained"
          size="large"
          sx={{ marginTop: "8px", marginBottom: "4px", height: "56px" }}>
          Submit
        </Button>
      </form>
      <Snackbar
        open={openAlertAdd}
        autoHideDuration={3000}
        onClose={handleCloseAlertAdd}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert
          onClose={handleCloseAlertAdd}
          severity="success"
          sx={{ width: "100%" }}>
          Add loan success!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserFindItem;
