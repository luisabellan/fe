import React from "react";
import { axiosWithAuth } from "../../utils_MosharrafMusa/axiosWithAuth";

class SignIn extends React.Component {
  state = {
    credentials: {
      email: "test@email.com",
      password: "password",
    },
  };

  // handle the changes of credential
  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  // login axios, axios with auth is being built in
  login = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/auth/login", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("professor_id", res.data.id);
        this.props.history.push("/students");
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };

  // render the login form, username and password
  render() {
    return (
      <div>
        <h1 className="login-title">Log In</h1>
        <form onSubmit={this.login} className="credential-form">
          <input
            type="email"
            name="email"
            value={this.state.credentials.email}
            onChange={this.handleChange}
            placeholder="Email"
            className="credential-input"
          />

          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder="Password"
            className="credential-input"
          />

          <button className="credential-button">Log In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
