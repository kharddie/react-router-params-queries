
import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from '../components/renderField';
import { signInUser, signInUserSuccess, signInUserFailure, resetUserFields } from '../actions/users';
import { showInfoMessage, resetShowInfoMessage } from '../actions/infoMessage';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  return hasErrors && errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndSignInUser = (values, state, props, dispatch) => {
  return dispatch(signInUser(values))
    .then((result) => {
      if (result.payload.status !== 200) {
        return;
      }
      if (!result.payload.data.error) { //success
        sessionStorage.setItem('jwtToken', result.payload.data.token);
        dispatch(signInUserSuccess(result.payload.data));
        if (props.showModalCreateRequest) {
          props.showModalCreateRequest();
        }
      }
      if (result.payload.data.error) { //failed
        dispatch(signInUserFailure(result.payload.data));
        dispatch(showInfoMessage(result.payload.data));
      }

    });
};

class SignInForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      if (!nextProps.origin && this.props.origin === "forSignInForm") {
        this.props.history.push('/');
      } else if (nextProps.origin === "signInModalClose") {
        this.props.modalBackdropClicked()
      } else if (nextProps.origin === "signInModalDontClose") {
        nextProps.showModalWhichPos();
      }
    }

    //error
    //Throw error if it was not already thrown (check this.props.user.error to see if alert was already shown)
    //If u dont check this.props.user.error, u may throw error multiple times due to redux-form's validation errors
    if (nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
      //alert(nextProps.user.error);
    }
  }

  render() {
    const { asyncValidating, handleSubmit, submitting } = this.props;
    return (

      <div>
        <div class="row">
          <div class="col-md-12">
            <form onSubmit={handleSubmit((values, dispatch) => { validateAndSignInUser(values, this, this.props, dispatch); })}>
              <Field
                name="username"
                type="text"
                component={renderField}
                label="Username*" />
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password*" />
              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-primary btn-with-spinner btn-block"
                  disabled={submitting}>
                  <span className={!this.props.user.loading ? "show" : "hide"} > Sign In</span>
                  <span className={this.props.user.loading ? "show" : "hide"}  ><FontAwesomeIcon size="lg" className="fa-spin spinner" icon={faSpinner} /></span>
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
  form: 'SignInForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(SignInForm)



