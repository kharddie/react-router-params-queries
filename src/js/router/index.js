import React from "react";
import { BrowserRouter as Router, Route, Link, hashHistory, Switch } from "react-router-dom";
import Archives from "../pages/Archives";
import Featured from "../pages/Featured";
import Layout from "../pages/Layout";
import Settings from "../pages/Settings";

const RouteComponent = () => (
    <Router history={hashHistory}>
        <Switch>
            <Route path="/" component={Layout}></Route>
            <Route component={Featured}></Route>
            <Route path="archives(/:article)" name="archives" component={Archives}></Route>
            <Route path="settings" name="settings" component={Settings}></Route>
        </Switch>

    </Router>
);



export default RouteComponent;