import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
const EditUser = (props) => {
  const profile = props.profile;
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    console.log(data);
    setSubmitting(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
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
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="dense"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" disabled={submitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
