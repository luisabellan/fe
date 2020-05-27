import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { axiosWithAuth } from "../../utils_MosharrafMusa/axiosWithAuth";
import FormElement from "./UserFormElement";

const useStyles = makeStyles({
  root: {
    margin: "100px auto 20px",
    display: "flex",
    flexDirection: "column",
    width: "320px",
    padding: "20px",
    border: "1px solid #CBCBCB",
    borderRadius: "5px",
  },
  button: {
    margin: "0 auto",
    width: "110px",
  },
  label: {
    position: "fixed",
    color: "#CBCBCB",
    fontSize: "12px",
    padding: "0 5px",
    backgroundColor: "#FFF",
    transform: "translate(-160px, 71px)",
  },
});

const Form = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { inputData, buttonData } = props;
  const { formName, path, historyPath } = props.formData;
  const { text, variant, color } = buttonData;
  const [credentials, setCredentials] = useState({});

  const updateCredentials = (key, value) => {
    let newCredentials = { ...credentials };
    newCredentials[key] = value;
    setCredentials(newCredentials);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosWithAuth()
      .post(path, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.id) {
          localStorage.setItem("professor_id", res.data.id);
        }
        history.push(historyPath);
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Fragment>
      <span className={classes.label}>{formName}</span>
      <form className={classes.root} onSubmit={handleSubmit}>
        {inputData.map((inputData) => {
          return (
            <FormElement
              inputData={inputData}
              key={inputData.label}
              updateCredentials={updateCredentials}
            />
          );
        })}
        <Button
          className={classes.button}
          variant={variant}
          color={color}
          type="submit"
        >
          {text}
        </Button>
      </form>
    </Fragment>
  );
};

export default Form;
