import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserRegister } from "./services/user";
import Joi from "joi-browser";

class Register extends Component {
  state = {
    newUserAccount: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      reEnteredPassword: ""
    },
    errors: {
      err: ""
    },
    backEndErrors: []
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email : "),
    username: Joi.string()
      .required()
      .label("Username : "),
    firstName: Joi.string()
      .required()
      .required()
      .min(3)
      .max(10)
      .label("FirstName : "),
    lastName: Joi.string()
      .required()
      .required()
      .min(3)
      .max(10)
      .label("LastName : "),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .label("Password : "),

    reEnteredPassword: Joi.string()
      .required()
      .label("Confrom Password :")
    // .valid(Joi.ref("password"))
    // .options({
    //   language: {
    //     any: {
    //       allowOnly: "!!Passwords do not match"
    //     }
    //   }
    // })
  };

  validate = () => {
    //Joi ===> Validate
    const res = Joi.validate(this.state.newUserAccount, this.schema, {
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
    //clone
    let newUserAccount = { ...this.state.newUserAccount };
    //edit dynamic value
    newUserAccount[e.target.name] = e.target.value;
    this.validateProperty(e.target);
    //set state and update state
    this.setState({ newUserAccount });
    console.log(this.state.newUserAccount);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const err = this.validate();
    //Errors
    if (err) {
      return;
    }
    let backEndErrors = [...this.state.backEndErrors];
    //let errors = { ...this.state.errors };
    const res = await UserRegister(this.state.newUserAccount).catch(function(
      error
    ) {
      if (error.response) {
        backEndErrors = error.response.data.details;

        //errors = error.response.data.errmsg;

        // console.log(backEndErrors);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      }
    });
    this.setState({ backEndErrors });
    if (res !== undefined) {
      this.props.history.push("/login");
    }
  };

  render() {
    const {
      email,
      username,
      firstName,
      lastName,
      password,
      reEnteredPassword
    } = this.state.newUserAccount;
    const backEndErrors = this.state.backEndErrors;

    return (
      <div className="container">
        <form className="login" onSubmit={this.handleSubmit}>
          <h4 className="login__header">Register An Account</h4>
          <div className="form-group">
            <label htmlFor="">E-mail Address</label>
            <input
              className="form-control"
              type="text"
              name="email"
              label="email"
              value={email}
              onChange={this.handleChange}
              error={this.state.errors.email}
            />
            {this.state.errors.email && (
              <div className="form-group invalid">
                <label htmlFor="">{this.state.errors.email}</label>
              </div>
            )}

            {backEndErrors.map(
              err =>
                err.param === "email" && (
                  <div className="form-group invalid">
                    <label htmlFor="">{[err.msg]}</label>
                  </div>
                )
            )}
          </div>
          <div className="form-group">
            <label htmlFor="">UserName</label>
            <input
              className="form-control"
              type="text"
              name="username"
              label="username"
              value={username}
              onChange={this.handleChange}
              error={this.state.errors.username}
            />
            {this.state.errors.username && (
              <div className="form-group invalid">
                <label htmlFor="">{this.state.errors.username}</label>
              </div>
            )}
            {backEndErrors.map(
              err =>
                err.param === "username" && (
                  <div className="form-group invalid">
                    <label htmlFor="">{[err.msg]}</label>
                  </div>
                )
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="">First Name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                label="firstName"
                value={firstName}
                onChange={this.handleChange}
                error={this.state.errors.firstName}
              />
              {this.state.errors.firstName && (
                <div className="form-group invalid">
                  <label htmlFor="">{this.state.errors.firstName}</label>
                </div>
              )}
              {backEndErrors.map(
                err =>
                  err.param === "firstName" && (
                    <div className="form-group invalid">
                      <label htmlFor="">{[err.msg]}</label>
                    </div>
                  )
              )}
            </div>
            <div className="form-group">
              <label htmlFor="">Last Name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                label="lastName"
                value={lastName}
                onChange={this.handleChange}
                error={this.state.errors.lastName}
              />
              {this.state.errors.lastName && (
                <div className="form-group invalid">
                  <label htmlFor="">{this.state.errors.lastName}</label>
                </div>
              )}
              {backEndErrors.map(
                err =>
                  err.param === "lastName" && (
                    <div className="form-group invalid">
                      <label htmlFor="">{[err.msg]}</label>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                className="form-control"
                type="text"
                name="password"
                label="password"
                value={password}
                onChange={this.handleChange}
                error={this.state.errors.password}
              />
              {this.state.errors.password && (
                <div className="form-group invalid">
                  <label htmlFor="">{this.state.errors.password}</label>
                </div>
              )}
              {backEndErrors.map(
                err =>
                  err.param === "password" && (
                    <div className="form-group invalid">
                      <label htmlFor="">{[err.msg]}</label>
                    </div>
                  )
              )}
            </div>
            <div className="form-group">
              <label htmlFor="">Re-enter Password</label>
              <input
                className="form-control"
                type="text"
                name="reEnteredPassword"
                label="reEnteredPassword"
                value={reEnteredPassword}
                onChange={this.handleChange}
                error={this.state.errors.reEnteredPassword}
              />
              {this.state.errors.reEnteredPassword && (
                <div className="form-group invalid">
                  <label htmlFor="">
                    {this.state.errors.reEnteredPassword}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="login__remember-me">
            <div className="add-product__actions">
              <Link to="/home" className="btn btn--gray">
                Cancel
              </Link>
              {/* <input type="submit" value="Register" /> */}
              {/* to="/login" */}
              <button className="btn btn--primary">Register</button>
            </div>
            {/* {this.state.errors.err && (
              <div className="form-group invalid">
                <label htmlFor="">{this.state.errors.err}</label>
              </div>
            )} */}
          </div>
          <Link to="/login" className="link login__register-now">
            You are already a member?
          </Link>
          {/* <a href="#" className="login__register-now">
            You are alredy a member?
          </a> */}
        </form>
      </div>
    );
  }
}

export default Register;
