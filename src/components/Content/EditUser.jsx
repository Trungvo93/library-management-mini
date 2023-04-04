import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Select, MenuItem } from "@mui/material";
const EditUser = (props) => {
  const profile = props.profile;
  const schema = yup.object().shape({
    name: yup.string().required("Your name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    role: yup.string().required("Role is required"),
    // studentCode: yup
    //   .string()
    //   .matches(
    //     /^[A-Za-z][A-Za-z0-9_]{5,29}$/,
    //     "At least 6 characters, no spaces"
    //   ),

    schoolCode: yup.string().when("role", {
      is: (val) => val === "student",
      then: yup.string().required("asdad"),
      // .matches(
      //   /^[A-Za-z][A-Za-z0-9_]{2,29}$/,
      //   "At least 3 characters, no spaces"
      // ),
      otherwise: yup.string(),
    }),

    // schoolCode: yup
    //   .string()
    //   .matches(
    //     /^[A-Za-z][A-Za-z0-9_]{5,29}$/,
    //     "At least 6 characters, no spaces"
    //   ),
    birthday: yup.date().required(),
  });
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
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <TextField
            label="School Code"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register("schoolCode")}
            error={!!errors.schoolCode}
            helperText={errors.schoolCode?.message}
          />
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
    </div>
  );
};

export default EditUser;
