import React from "react";
import Joi from "joi-browser";

import Form from "../components/common/Form";
// import Bootstrap from "bootstrap/dist/css/bootstrap.css";

class Login extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .alphanum()
      .min(5)
      .required()
      .label("Username"),
    //label is to capitalize username
    password: Joi.string()
      .min(5)
      .max(15)
      .required()
      .label("Password")
  };

  doSubmit = () => {
    //call the server. this part changes from one form to another. it is not reusable
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="p-5">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
