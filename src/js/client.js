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
import Featured from "./pages/Featured";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import configureStore from "./store/configureStore.js";
import { Provider } from "react-redux";

const store = configureStore();
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Featured}></IndexRoute>
        
        <Route path="archives(/:article)" name="archives" component={Archives}></Route>
        <Route path="settings" name="settings" component={Settings}></Route>
      </Route>
    </Router>
    </Provider>,
  app);
