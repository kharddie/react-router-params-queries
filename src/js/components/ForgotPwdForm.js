import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { forgotPwdEmail, forgotPwdEmailSuccess, forgotPwdEmailFailure, resetForgotPwdEmail } from '../actions/forgotPwdEmail';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import renderField from './renderField';
import { showInfoMessage } from "../actions/infoMessage.js";


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  return hasErrors && errors;
}


//For any field errors upon submission (i.e. not instant check)
const validateAndForgotPwd = (values, dispatch) => {
  return dispatch(forgotPwdEmail(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload) { //1st onblur
        return;
      }
      let { data, status } = result.payload;
      if (status != 200) {
        dispatch(showInfoMessage(result.payload.error));
      } else {
        if (data.error) {
          dispatch(forgotPwdEmailFailure(data.error));
        } else {
          dispatch(forgotPwdEmailSuccess(data));
        }
      }
    });

};

class ForgotPwdForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }


  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="container">
        <div class="row justify-content-md-center ">
          <div class="col-sm-12 col-md-8">
            <div><h2>Recover password</h2>
            </div>
            <form className="forgot-pwd" onSubmit={handleSubmit(validateAndForgotPwd)}>
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email*" />
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={submitting}>
                Submit
          </button>

            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default reduxForm({
  form: 'ForgotPwdForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(ForgotPwdForm)