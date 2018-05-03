import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory , routes } from "react-router";
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


import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import Profile from './pages/Profile';
import CreateRequest from './pages/CreateRequest';
import ForgotPwd from './pages/ForgotPwd';

import BrowseRequests from './pages/BrowseRequests';
import MyRequests from './pages/MyRequests';


import ValidateEmail from './pages/ValidateEmail';
import configureStore from "./store/configureStore.js";
import { Provider } from "react-redux";
import Home from "./pages/Home";

//import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const store = configureStore();
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/signIn" name="SignIn" component={SignInPage}/>
        <Route path="/dashboard" name="dashboard" component={Dashboard}/>
        <Route path="/signUp" name="signup" component={SignUp}/>
        <Route path="/aboutUs(/:aboutUs)" name="aboutUs" component={AboutUs}/>
        <Route path="/validateEmail/:token" component={ValidateEmail} />
        <Route path="settings" name="settings" component={Settings}/>
        <Route path="/createRequest" name="CreateRequest" component={CreateRequest}/>
        <Route path="/forgotPwd" name="ForgotPwd" component={ForgotPwd}/>
        <Route path="/browseRequests" name="BrowseRequests" component={BrowseRequests}/>
        <Route path="/myRequests/:id" name="MyRequests" component={BrowseRequests}/>
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
    </Provider>,
  app);
