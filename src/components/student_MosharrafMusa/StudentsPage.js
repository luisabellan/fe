import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// import axios with auth
import { axiosWithAuth } from "../../utils_MosharrafMusa/axiosWithAuth";

// import add student components
import AddStudent from "./AddStudent";

import Navigation from "../navigation_MosharrafMusa/Navigation";

const styles = {
  root: {
    width: "42rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  student: {
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "#fafafa",
    width: "18rem",
    paddingBottom: "20px",
    margin: "0 auto 20px",
  },
  button: {
    margin: "0 auto",
    width: "8rem",
    varient: "conatined",
    color: "primary",
  },
};

class StudentsPage extends React.Component {
  state = {
    students: [],
    firstName: "",
    lastName: "",
    email: "",
    id: localStorage.getItem("professor_id"),
    edit: false,
    count: null,
  };

  componentDidMount() {
    console.log("hello");
    console.log(this.state.students);
    axiosWithAuth()
      .get(`/api/users/${this.state.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          students: res.data.students,
          count: res.data.students.length,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      const profID = localStorage.getItem("professor_id");
      axiosWithAuth()
        .get(`/api/users/${profID}`)
        .then((res) => {
          console.log(res.data);
          this.setState({
            students: res.data.students,
            count: res.data.students.length,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // // update students with counts
  updateStudents = () => {
    this.setState((state) => {
      return { count: state.count + 1 };
    });
  };

  // // remove student by id
  removeStudent = (id) => {
    axiosWithAuth()
      .delete(`/api/students/${id}`)
      .then(
        this.updateStudents((state) => {
          return { count: state.count - 1 };
        })
      )
      .catch((err) => console.log(err));
  };

  // render students with features from above
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navigation />

        <h1 className="student-title">Students List</h1>
        <AddStudent update={this.updateStudents} />
        <br></br>
        <div className={`students ${classes.root}`}>
          {this.state.students.map((student) => (
            <div key={student.id} className={`student ${classes.student}`}>
              <div className="student-info">
                <h2 className="info">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="info">Email: {student.email}</p>
                <Link to="/myproject">
                  <button>View Project</button>
                </Link>
                <br></br>
                <button onClick={() => this.removeStudent(student.id)}>
                  Delete Student
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// const StudentsPage = "Hello";
// console.log(StudentsPage);

export default withStyles(styles)(StudentsPage);
