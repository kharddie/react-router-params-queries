
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

      <div>
        <div class="row sign-in">
          <div class="col-sm-12 col-md-6 ">
            <div class="row sign-in-left">
              <div class="col-md-11 col-lg-8">
                <h1 class="title-page title-page-margin">
                  Existing customer?</h1>
                <SignInFormContainer location={location} history={history} />
              </div>
            </div>
            <div className="row sign-in-left">
              <div className="col-md-11 col-lg-8">
                <div className="row ">
                  <div className="col-sm-12">
                    <div className="row ">
                      <div className="col-sm-12">
                        <div className="sign-in-links"></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 ">
                    <IndexLink class="nav-link user-reset-pwd" to="/forgotPwd" >Reset my password</IndexLink>
                  </div>
                  <div className="col-sm-12">
                    <div className="row ">
                      <div className="col-sm-12">
                        <div className="sign-in-links-b"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 ">
            <div className="row sign-in-right">
              <div className="col-md-11 col-lg-8 sign-in-right-cont">
                <h1 className="title-page title-page-margin">New customer?</h1>
                <p> Set up aan account to get free quotes and offer to assist with your skills.</p>
                <p> Gain new or use existing skills.</p>
                
                <Link class="btn btn-primary btn-block" to="signUp">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignInPage;



