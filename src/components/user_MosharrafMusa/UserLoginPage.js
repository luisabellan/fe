import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Form from "./UserForm";

const Login = () => {
  const formData = {
    formName: "Login",
    path: "/api/auth/login",
    historyPath: "/students",
  };
  const inputData = [
    {
      label: "Email",
      name: "email",
      autoFocus: true,
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
    text: "Login",
    variant: "contained",
    color: "primary",
  };

  return (
    <Fragment>
      <Form formData={formData} inputData={inputData} buttonData={buttonData} />
      <Link to="/register">Create an account</Link>
    </Fragment>
  );
};

export default Login;
