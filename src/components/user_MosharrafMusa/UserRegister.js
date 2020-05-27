import React from "react";
import { axiosWithAuth } from "../../utils_MosharrafMusa/axiosWithAuth";

class SignUp extends React.Component {
  state = {
    credentials: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
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

  // signup axios, axios with auth is being built in
  signup = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/auth/register", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/signin");
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };

  // render the signup form, username and password
  render() {
    return (
      <div>
        <h1 className="signup-title">Sign Up</h1>

        <form onSubmit={this.signup} className="credential-form">
          <input
            type="text"
            name="firstName"
            value={this.state.credentials.firstName}
            onChange={this.handleChange}
            placeholder="First Name"
            className="credential-input"
          />

          <input
            type="text"
            name="lastName"
            value={this.state.credentials.lastName}
            onChange={this.handleChange}
            placeholder="Last Name"
            className="credential-input"
          />

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

          <button className="credential-button">Sign up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
