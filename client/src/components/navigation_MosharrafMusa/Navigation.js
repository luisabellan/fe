import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: "600px",
    margin: "0 auto",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
});

function Navigation() {
  const classes = useStyle();
  const handleSignout = () => {
    localStorage.clear();
  };

  return (
    <header className={`header ${classes.root}`}>
      <Link className={classes.link} to="/students">
        Students List
      </Link>
      <Link className={classes.link} to="/reminders">
        Reminder
      </Link>
      <Link className={classes.link} to="/" onClick={handleSignout}>
        Sign out
      </Link>
    </header>
  );
}

export default Navigation;
