import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControl } from "./FormControl";

export const Forms = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    designation: "",
    gender: "",
    birthDate: "",
    checkboxes: [],
    volume: 0,
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("first Name is Required"),
    lastName: yup.string().required("last name is required"),
    designation: yup.string().required("Designation is required"),
  });

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const dropdown = [
    {
      label: "Software Developer",
      value: "SD",
    },
    {
      label: "Business Analyst",
      value: "BA",
    },
  ];

  const radioOptions = [
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const checkboxOptions = [
    {
      label: "Option1",
      value: "1",
    },
    {
      label: "Option2",
      value: "2",
    },
    {
      label: "Option3",
      value: "3",
    },
  ];

  const onSubmit = (values) => {
    alert(JSON.stringify(values));
    console.log(values);
  };

  return (
    <Paper className="w-2/5">
      <Typography className="m-4" variant="h6">
        Sample Form
      </Typography>

      <form
        className="grid grid-cols-2 gap-4 m-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          compType="input"
          name="firstName"
          label="First Name"
          control={control}
          variant="standard"
        />
        <FormControl
          compType={`input`}
          name="lastName"
          label="Last Name"
          control={control}
          variant="standard"
        />
        <FormControl
          compType={`date`}
          name="birthDate"
          label="BirthDate"
          control={control}
          variant="standard"
        />

        <FormControl
          compType={`dropdown`}
          name="designation"
          label="designation"
          control={control}
          options={dropdown}
          variant="standard"
        />
        <div className="col-span-2">
          <FormControl
            compType={`radio`}
            name="gender"
            label="Gender"
            control={control}
            options={radioOptions}
          />
        </div>

        <div className="col-span-2">
          <FormControl
            compType={`checkbox`}
            name="checkboxes"
            label="Checkboxes"
            control={control}
            options={checkboxOptions}
            setValue={setValue}
          />
        </div>

        <div className="col-span-2">
          <FormControl
            compType={`slider`}
            name="volume"
            label="volume"
            control={control}
          />
        </div>
        <Button variant="contained" type="submit">
          submit
        </Button>
      </form>
    </Paper>
  );
};
