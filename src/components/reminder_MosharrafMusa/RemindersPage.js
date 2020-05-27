import React from "react";
import { withStyles } from "@material-ui/core/styles";

// import axios with auth
import { axiosWithAuth } from "../../utils_MosharrafMusa/axiosWithAuth";

import AddReminder from "./AddReminder";
import EditReminder from "./EditReminder";

import Navigation from "../../components/navigation_MosharrafMusa/Navigation";

const styles = {
  root: {
    width: "43rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  reminder: {
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "#fafafa",
    width: "18rem",
    paddingBottom: "20px",
    margin: "0 auto 20px",
  },
};

class RemindersPage extends React.Component {
  state = {
    reminders: [],
    name: "",
    description: "",
    send_date: "",
    id: localStorage.getItem("professor_id"),
    edit: false,
    count: null,
  };

  componentDidMount() {
    console.log("hello");
    console.log(this.state.reminders);
    axiosWithAuth()
      .get(`/api/users/${this.state.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          reminders: res.data.reminders,
          count: res.data.reminders.length,
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
            reminders: res.data.reminders,
            count: res.data.reminders.length,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // // update reminders with counts
  updateReminders = () => {
    this.setState((state) => {
      return { count: state.count + 1 };
    });
  };

  // // remove reminder by id
  removeReminder = (id) => {
    axiosWithAuth()
      .delete(`/api/reminders/${id}`)
      .then(
        this.updateReminders((state) => {
          return { count: state.count - 1 };
        })
      )
      .catch((err) => console.log(err));
  };

  // // edit reminder with edit to true
  editReminder = (name, description, send_date, id) => {
    this.setState({ name: name });
    this.setState({ description: description });
    this.setState({ send_date: send_date });
    this.setState({ id: id });
    this.setState({ edit: true });
  };

  // // cancel edit by change the state to false
  cancelEdit = () => {
    this.setState({ edit: false });
  };

  // render reminders with features from above
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navigation />

        <h1 className="reminder-title">My Reminders</h1>
        {this.state.edit === true ? (
          <EditReminder
            name={this.state.name}
            description={this.state.description}
            send_date={this.state.send_date}
            id={this.state.id}
            update={this.updateReminders}
            cancelEdit={this.cancelEdit}
          />
        ) : (
          <AddReminder update={this.updateReminders} />
        )}
        <br></br>
        <div className={`reminders ${classes.root}`}>
          {this.state.reminders.map((reminder) => (
            <div key={reminder.id} className={`reminder ${classes.reminder}`}>
              <div className="reminder-info">
                <h3 className="info">{reminder.name}</h3>
                <p className="info">Reminder Date: {reminder.send_date}</p>
                <p className="info">
                  {" "}
                  Reminder : <em>{reminder.description}</em>
                </p>

                <button
                  onClick={() =>
                    this.editReminder(
                      reminder.name,
                      reminder.description,
                      reminder.send_date,
                      reminder.id
                    )
                  }
                >
                  Edit
                </button>

                <button onClick={() => this.removeReminder(reminder.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RemindersPage);
