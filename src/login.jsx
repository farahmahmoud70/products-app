import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserLogin } from "./services/user";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    userAccount: {
      email: "",
      password: ""
    },
    errors: { err: "" }
  };

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      localStorage.clear();
    }
  };
  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email : "),
    password: Joi.string()
      .required()
      .label("Password : ")
  };

  validate = () => {
    //Joi ===> Validate
    const res = Joi.validate(this.state.userAccount, this.schema, {
      abortEarly: false
    });

    const errors = {};

    //No Erorrs
    if (res.error === null) return;

    //exrtract error information from joi result
    for (const item of res.error.details) {
      errors[item.path] = item.message;
    }

    this.setState({ errors });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    //Crete sub Object
    const obj = {
      [name]: value
    };
    //Crerte sub Schema
    const schema = {
      [name]: this.schema[name]
    };
    //Validate
    const res = Joi.validate(obj, schema, { abortEarly: false });

    const errors = { ...this.state.errors };

    if (res.error) {
      errors[name] = res.error.details[0].message;
    } else {
      delete errors[name];
    }

    this.setState({ errors });
  };

  handleChange = e => {
    let userAccount = { ...this.state.userAccount };
    userAccount[e.target.name] = e.target.value;
    this.validateProperty(e.target);
    this.setState({ userAccount });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const err = this.validate();
    //Errors
    if (err) {
      return;
    }
    let errors = { ...this.state.errors };
    const res = await UserLogin(this.state.userAccount).catch(function(error) {
      if (error.response) {
        errors.err = error.response.data.message;

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    this.setState({ errors });
    if (res !== undefined) {
      this.props.history.push("/home");
    }
  };

  render() {
    const { email, username, password } = this.state.userAccount;
    return (
      <div className="container">
        <form className="login" onSubmit={this.handleSubmit}>
          <h4 className="login__header">I'M A RETURNING CUSTOMER</h4>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input
              className="form-control"
              type="text"
              name="email"
              label="email"
              value={email}
              error={this.state.errors.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && (
              <div className="form-group invalid">
                <label htmlFor="">{this.state.errors.email}</label>
              </div>
            )}
          </div>

          <div className="form-group login__Password">
            {/* <a href="#" className="login__forget-password">
              (Forget Password?)
            </a> */}
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              label="password"
              value={password}
              error={this.state.errors.password}
              onChange={this.handleChange}
            />
            {this.state.errors.password && (
              <div className="form-group invalid">
                <label htmlFor="">{this.state.errors.password}</label>
              </div>
            )}
          </div>

          <div className="login__remember-me">
            <div className="add-product__actions">
              <Link to="/home" className="btn btn--gray">
                Cancel
              </Link>
              <button
                // type="submit"
                className="btn btn--primary"
                // onClick={this.handleSubmit}
              >
                Login
              </button>
            </div>
            {this.state.errors.err && (
              <div className="form-group invalid">
                <label htmlFor="">{this.state.errors.err}</label>
              </div>
            )}
          </div>
          <Link to="/register" className="link login__register-now">
            Register Now
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
