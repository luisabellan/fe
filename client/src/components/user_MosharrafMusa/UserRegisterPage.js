import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Form from "./UserForm";

const Register = () => {
  const formData = {
    formName: "Register",
    path: "/api/auth/register",
    historyPath: "/login",
  };
  const inputData = [
    {
      label: "First Name",
      name: "firstName",
      autoFocus: true,
      type: "string",
      helperText: "May only contain characters A-Z",
    },
    {
      label: "Last Name",
      name: "lastName",
      autoFocus: false,
      type: "string",
      helperText: "May only contain characters A-Z",
    },
    {
      label: "Email",
      name: "email",
      autoFocus: false,
      type: "email",
      helperText: "Must be a valid email address",
    },
    {
      label: "Password",
      name: "password",
      autoFocus: false,
      type: "password",
      helperText: "Must be at least 6 characters",
    },
  ];
  const buttonData = {
    text: "Register",
    variant: "contained",
    color: "primary",
  };

  return (
    <Fragment>
      <Form formData={formData} inputData={inputData} buttonData={buttonData} />
      <Link to="/login">Already have an account?</Link>
    </Fragment>
  );
};

export default Register;
