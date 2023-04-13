import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, MenuItem, Box } from "@mui/material";

import { useDispatch } from "react-redux";
import { editBook } from "../../redux/booksSlice";
import { Snackbar, Alert } from "@mui/material";
const EditBook = (props) => {
  const profile = props.profile;

  const dispatch = useDispatch();
  const schema = yup.object().shape({
    category: yup.string().required(),
    title: yup.string().required(),
    ISBN: yup
      .string()
      .matches(
        /^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/,
        "Wrong format"
      )
      .required(),
    amount: yup
      .number("Amount must be numberic ")
      .min(1, "Amount must be more than zero")
      .required(),
    author: yup.string().required(),
    publisher: yup.string().required(),
  });

  //initialize react form hook
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...profile },
    resolver: yupResolver(schema),
  });

  //Submit data
  const onSubmit = async (data) => {
    console.log(data);
    const convertDay = new Date();
    const year = convertDay.getFullYear();
    let month = convertDay.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = convertDay.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }
    data.update_on = year + "-" + month + "-" + date;

    dispatch(editBook(data));

    reset();
    setOpen(true);
  };

  //Alert success message
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          select
          label="Category"
          variant="outlined"
          fullWidth
          margin="dense"
          defaultValue={profile.category}
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}>
          <MenuItem value="arts">Arts</MenuItem>
          <MenuItem value="biographies">Biographies</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="history">History</MenuItem>
          <MenuItem value="novel">Novel</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          disabaled
          label="ISBN"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("ISBN")}
          error={!!errors.ISBN}
          helperText={errors.ISBN?.message}
        />

        <TextField
          type="number"
          label="Amount"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("amount")}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />
        <TextField
          label="Author"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("author")}
          error={!!errors.author}
          helperText={errors.author?.message}
        />

        <TextField
          label="Publisher"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("publisher")}
          error={!!errors.publisher}
          helperText={errors.publisher?.message}
        />
        <TextField
          label="Note"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("note")}
          error={!!errors.note}
          helperText={errors.note?.message}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginTop: "16px" }}>
          Create
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          "Edit Book success!"
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditBook;
