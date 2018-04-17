import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
//import 'font-awesome/css/font-awesome.css';

//import 'font-awesome/less/font-awesome.less';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';


/* import "jquery"; */

import "../css/app.scss";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.js';



console.log("The current working directory is " + process.cwd());


import Archives from "./pages/Archives";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import Profile from './pages/Profile';
import ValidateEmail from './pages/ValidateEmail';
import configureStore from "./store/configureStore.js";
import { Provider } from "react-redux";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const store = configureStore();
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={SignIn}></IndexRoute>
        <Route path="dashboard" name="dashboard" component={Dashboard}></Route> 
        <Route path="signUp" name="signup" component={SignUp}></Route>     
        <Route path="archives(/:article)" name="archives" component={Archives}></Route>
        <Route path="/validateEmail/:token" component={ValidateEmail} />
        <Route path="settings" name="settings" component={Settings}></Route>
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
    </Provider>,
  app);
