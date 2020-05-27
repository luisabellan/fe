import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// import axios with auth
import { axiosWithAuth } from "../../utils_MosharrafMusa/axiosWithAuth";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "18rem",
    justifyContent: "center",
    margin: "0 auto",
  },
  input: {
    marginBottom: "10px",
  },
});

const AddReminder = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [send_date, setSendDate] = useState("");

  // handle name changes
  const handleName = (e) => {
    setName(e.target.value);
  };

  // handle description changes
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // handle date changes
  const handleSendDate = (e) => {
    setSendDate(e.target.value);
  };

  // handle submit to add
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("professor_id"));
    axiosWithAuth()
      .post("/api/reminders/", {
        name: name,
        description: description,
        send_date: send_date,
        professor_Id: parseInt(localStorage.getItem("professor_id")),
      })
      .then(props.update())
      .catch((err) => console.log(err));

    setName("");
    setDescription("");
    setSendDate("");
  };

  return (
    <div className="add-reminder">
      {/* <h3 className="title">Add Reminder</h3> */}

      <form onSubmit={handleSubmit} className={`add-container ${classes.root}`}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          placeholder="Student Name"
          className={`add-input ${classes.input}`}
        />

        <input
          type="text"
          name="send_date"
          value={send_date}
          onChange={handleSendDate}
          placeholder="Reminder Date"
          className={`add-input ${classes.input}`}
        />

        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
          placeholder="Reminder Text"
          className={`add-input ${classes.input}`}
        />

        <button className="add-button">Add Reminder</button>
      </form>
    </div>
  );
};

export default AddReminder;
