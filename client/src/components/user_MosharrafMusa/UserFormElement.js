import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginBottom: "20px",
  },
});

const FormElement = (props) => {
  const classes = useStyles();
  const { label, name, autoFocus, type, helperText } = props.inputData;
  const { updateCredentials } = props;
  const [inputState, setInputState] = useState("");
  const [errorState, setErrorState] = useState(false);

  const handleChanges = (event) => {
    setInputState(event.target.value);
    updateCredentials(name, event.target.value);
  };

  const handleBlur = (event) => {
    const isValid = validateInput(event.target.value);
    if (isValid && errorState) {
      setErrorState(false);
    } else if (!isValid && !errorState) {
      setErrorState(true);
    }
  };

  const validateInput = (input) => {
    const stringRegEx = "^[a-zA-Z]+$";
    const emailRegEx =
      "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
    if (input === "") {
      return false;
    }
    switch (type) {
      case "string":
        return input.match(stringRegEx);
      case "email":
        return input.match(emailRegEx);
      case "password":
        return input.length > 4;
      default:
        return true;
    }
  };

  return (
    <TextField
      className={classes.root}
      variant="outlined"
      required={true}
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={inputState}
      error={errorState}
      helperText={errorState ? helperText : ""}
      onChange={handleChanges}
      onBlur={handleBlur}
    />
  );
};

export default FormElement;
