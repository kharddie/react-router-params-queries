import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from '../components/renderField';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetValidateUserFields } from '../actions/validateUserFields';
import { signUpUser, signUpUserSuccess, signUpUserFailure, resetToken, } from '../actions/users';
import { showInfoMessage, resetShowInfoMessage } from '../actions/infoMessage'


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
    hasErrors = true;
  }
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
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



// //For instant async server validation
/*
const asyncValidate = (values, dispatch) => {
  return dispatch(validateUserFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let { data, status } = result.payload.response;

      //if status is not 200 or any one of the fields exist, then there is a field error
      if (status != 200 || data.username || data.email) {
        //let other components know of error by updating the redux` state
        dispatch(validateUserFieldsFailure(data));
        throw data;
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};
*/



//For any field errors upon submission (i.e. not instant check)
const validateAndSignUpUser = (values, dispatch) => {
  return dispatch(signUpUser(values))
    .then((result) => {

      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(resetToken());
        dispatch(signUpUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
        dispatch(showInfoMessage(result.payload.data));
        if (props.showModalCreateRequest) {
          props.showModalCreateRequest();
        }
      }
      //sessionStorage.setItem('jwtToken', result.payload.data.token);
      dispatch(resetToken());
      dispatch(signUpUserSuccess(result.payload.data));
      dispatch(showInfoMessage(result.payload.data));
    });
};

class SignUpForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    divClass: " col-md-7",
    showHeading: true,
  }

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.callingFromHome) {
      this.setState({
        divClass: " col-md-12",
      })
    }
    if (this.props.showHeading) {
      this.setState({
        showHeading: false,
      })
    }
    if (nextProps.user.status === 'signup' && !nextProps.user.error && nextProps.user.success) {
      // this.props.history.push('/');
    }
  }

  render() {
    //debugger;
    const { asyncValidating, handleSubmit, submitting, asyncValidate, validate } = this.props;
    return (

      <div class="row justify-content-md-center ">
        <div class={"col-sm-12" + this.state.divClass}>
          <div className={this.state.showHeading ? "show" : "hide"} ><h2>Sign up</h2></div>
          <form class="sign-up" onSubmit={handleSubmit(validateAndSignUpUser)}>
            <Field
              name="name"
              type="text"
              component={renderField}
              label="Full Name*" />
            <Field
              name="username"
              type="text"
              component={renderField}
              label="Username*" />
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email*" />
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


    )
  }
}

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  //asyncValidate
})(SignUpForm)








