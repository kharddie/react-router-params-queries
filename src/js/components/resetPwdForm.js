import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from '../components/renderField';
import { getParameterByName } from '../helper/index'
import { forgotPwdReset, forgotPwdResetSuccess, forgotPwdResetFailure, resetForgotPwdReset } from '../actions/forgotPwdEmail';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }
  return hasErrors && errors;
}




const validateAndResetPwd = (values, dispatch) => {

  let token = getParameterByName("token");
  if (token === '' || !token) {
    let error = {
      message: "No token provided.Contact admin",
      data: {},
      error: error
    }
    dispatch(forgotPwdResetFailure(error));
  } else {
    values.token = getParameterByName("token");
    return dispatch(forgotPwdReset(values))
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
            dispatch(forgotPwdResetFailure(data.error));
          } else {
            dispatch(forgotPwdResetSuccess(data));
          }
        }
      });
  }
};


class SignUpForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {

    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/');
    }
  }

  render() {
    //debugger;
    const { asyncValidating, handleSubmit, submitting, asyncValidate, validate } = this.props;
    return (
      <div className='container'>
        <div class="row justify-content-md-center ">
          <div class="col-sm-12 col-md-8">
            <div><h2>Reset password</h2>
            </div>
            <form className="reset-pwd" onSubmit={handleSubmit(validateAndResetPwd)}>

              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password*" />
              <Field
                name="confirmPassword"
                type="password"
                component={renderField}
                label="Confirm Password*" />
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={submitting}>
                  Submit
            </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form

})(SignUpForm)








