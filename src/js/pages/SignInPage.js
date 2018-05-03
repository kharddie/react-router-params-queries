
import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import renderField from '../components/renderField';
import SignInFormContainer from '../containers/SignInFormContainer.js';

class SignInPage extends React.Component {

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { asyncValidating, handleSubmit, submitting, location, history } = this.props;
    return (

      <div className="container">
        <div class="row sign-in">
          <div class="col sign-in-left-cont">
            <div class="row sign-in-right">
              <div class="col-md-8">
                <h1 class="title-page title-page-margin">
                  Existing customer??</h1>
                <SignInFormContainer location={location} history={history} />
              </div>
            </div>
            <div className="row sign-in-right">
              <div className="col-md-8">
                <div className="row sign-in-links">
                  <div className="col-sm-12 user-find-username">Find my username </div>
                  <div className="col-sm-12 ">
                    <IndexLink class="nav-link user-reset-pwd" to="/forgotPwd" >Reset my password</IndexLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col sign-in-right-cont">
            <div className="row">
              <div className="col-md-8">
                <h1 className="title-page title-page-margin">New customer?</h1>
                <p> Set up a go via account to make travelling onQueensland toll roads easier.</p>
                <button type="button" className="btn btn-primary">Open account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignInPage;



