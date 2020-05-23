import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import PrivateRoute from "./utils_MosharrafMusa/PrivateRoute";

import Login from "./components/user_MosharrafMusa/UserLoginPage";
import Register from "./components/user_MosharrafMusa/UserRegisterPage";
import StudentsPage from "./components/student_MosharrafMusa/StudentsPage";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={`App ${classes.root}`}>
      <h2>Welcome To Better Professor App</h2>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <PrivateRoute path="/students" component={StudentsPage} />
    </div>
  );
}

export default App;
