import React, { Component } from "react";
import "../App.scss";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  //validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  //validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });
  return valid;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      address: null,
      formErrors: {
        fullName: "",
        email: "",
        address: "",
      },
      users: [
        { 
          fullName: "Safaa", 
          email: "safaa@gmail.com", 
          address: "address 123 rabat" 
        },
        {
          fullName: "User1",
          email: 'user1@gmail.com',
          address: 'address 234 maroc'
        },
        {
          fullName: "User2",
          email: 'user2@gmail.com',
          address: 'address kénitra'
        },
        {
          fullName: "User3",
          email: 'user3@gmail.com',
          address: 'address casa'
        }
      ]
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "fullName":
        formErrors.fullName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "address":
        formErrors.address =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  
    if (formValid(this.state)) {
      /*console.log(`
          --SUBMITTING--`);
      */
     this.state.users.push({
      fullName: this.state.fullName,
      email: this.state.email,
      address: this.state.address
    });

    //set data with localstorage
    localStorage.setItem('myData', JSON.stringify(this.state.users));
    //set data with sessionStorage
    sessionStorage.setItem('mySessionStorage',JSON.stringify(this.state.users));

    //redirect to user search
    this.props.history.push('/users_search');          
      
    } else {
      console.error("Form invalide");
    }

  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="login-form">
          <h2>Sign up</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div>
              <label>Fullname :</label>
              <input
                className={formErrors.fullName.length > 0 ? "error" : null}
                type="text"
                placeholder="fullname"
                name="fullName"
                noValidate
                autoComplete="off"
                onChange={this.handleChange}
              />
              {formErrors.fullName.length > 0 && (
                <span className="errorMessage">{formErrors.fullName}</span>
              )}
            </div>
            <div>
              <label>Email :</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                type="email"
                placeholder="email"
                name="email"
                autoComplete="off"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div>
              <label>Address :</label>
              <input
                className={formErrors.address.length > 0 ? "error" : null}
                type="text"
                placeholder="address"
                name="address"
                autoComplete="off"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
