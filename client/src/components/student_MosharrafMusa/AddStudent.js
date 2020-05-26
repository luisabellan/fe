import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// import axios with auth
import { axiosWithAuth } from "../../utils_MosharrafMusa/axiosWithAuth";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "18rempx",
    margin: "0 auto",
  },
  input: {
    marginBottom: "10px",
  },
  button: {
    text: "Add Student",
    varient: "contained",
    color: "primary",
    width: "7rem",
  },
});

const AddStudent = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // handle name changes
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  // handle name changes
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  // handle email changes
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // handle submit to add
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("professor_id"));
    axiosWithAuth()
      .post("/api/students/", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        professor_Id: parseInt(localStorage.getItem("professor_id")),
      })
      .then(props.update())
      .catch((err) => console.log(err));

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className="add-student">
      {/* <h3 className="title">Add Student</h3> */}

      <form onSubmit={handleSubmit} className={`add-container ${classes.root}`}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstName}
          placeholder="First Name"
          className={`add-input ${classes.input}`}
        />

        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastName}
          placeholder="Last Name"
          className={`add-input ${classes.input}`}
        />

        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email"
          className={`add-input ${classes.input}`}
        />
        <button className="add-button">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
