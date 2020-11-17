import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import SignUpForm from "./pages/SignUpForm";
import UsersSearch from "./pages/UsersSearch";



class App extends Component {
  
  render() {
      return (
      <Router>
        <Route exact path="/" component={SignUpForm}></Route>
        <Route exact path="/users_search" component={UsersSearch}></Route>
      </Router>
    );
  }
}

export default App;
