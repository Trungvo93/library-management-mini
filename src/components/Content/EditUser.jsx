import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, MenuItem, Avatar, Grid } from "@mui/material";
import { storage } from "../../firebase/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/usersSlice";
import { Snackbar, Alert } from "@mui/material";
const EditUser = (props) => {
  const profile = props.profile;
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required("Your name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    role: yup.string().required("Role is required"),
    studentCode: yup.string().when("role", {
      is: "student",
      then: () =>
        yup
          .string()
          .matches(
            /^[A-Za-z][A-Za-z0-9_]{5,29}$/,
            "At least 6 characters, no spaces"
          ),
    }),
    schoolCode: yup.string().when("role", {
      is: "student",
      then: () =>
        yup
          .string()
          .matches(
            /^[A-Za-z][A-Za-z0-9_]{2,29}$/,
            "At least 3 characters, no spaces"
          ),
    }),

    birthday: yup.date().required(),
  });

  //initialize react form hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { ...profile },
    resolver: yupResolver(schema),
  });
  const watchRole = watch("role");
  //Upload Image to Firebase
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const handleChangeFile = (e) => {
    setImageFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (data) => {
    if (data.role === "admin" || data.role === "librarian") {
      data.schoolCode = "";
      data.studentCode = "";
    }
    const convertBirthday = new Date(data.birthday);
    const year = convertBirthday.getFullYear();
    let month = convertBirthday.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = convertBirthday.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }
    data.birthday = year + "-" + month + "-" + date;
    if (imageFile !== null) {
      const storageRef = ref(storage, `/library/${v4() + imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",

        //Show progress uploading
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        //Show Error uploading
        (error) => {
          console.log(error);
        },

        //Get link after upload complete
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            data.avatar = url;
            dispatch(editUser(data));
          });
        }
      );
    } else {
      dispatch(editUser(data));
    }
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ marginBottom: "16px" }}
          gap={2}>
          {imagePreview === null ? (
            <Avatar
              alt="avatar"
              src={profile.avatar}
              sx={{ width: 48, height: 48 }}
              {...register("avatar")}
            />
          ) : (
            <Avatar
              alt="avatar"
              src={imagePreview}
              sx={{ width: 48, height: 48 }}
              {...register("avatar")}
            />
          )}

          <Button variant="outlined" component="label" color="secondary">
            Change Avatar
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleChangeFile}
            />
          </Button>
        </Grid>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          disabled
          label="Username"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("username")}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type="date"
          label="Birthday"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("birthday")}
          error={!!errors.birthday}
          helperText={errors.birthday?.message}
        />
        <TextField
          select
          label="Role"
          variant="outlined"
          fullWidth
          margin="dense"
          defaultValue={profile.role}
          {...register("role")}
          error={!!errors.role}
          helperText={errors.role?.message}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="librarian">Librarian</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </TextField>
        {watchRole === "student" ? (
          <>
            <TextField
              label="School Code"
              variant="outlined"
              fullWidth
              margin="dense"
              {...register("schoolCode")}
              error={!!errors.schoolCode}
              helperText={errors.schoolCode?.message}
            />
            <TextField
              label="Student Code"
              variant="outlined"
              fullWidth
              margin="dense"
              {...register("studentCode")}
              error={!!errors.studentCode}
              helperText={errors.studentCode?.message}
            />
          </>
        ) : (
          ""
        )}

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginTop: "16px" }}>
          Save
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Save success!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditUser;
