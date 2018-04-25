import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { updateProfile, updateProfileSuccess, updateProfileFailure } from '../actions/updateProfile';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure } from '../actions/validateUserFields';
import renderField from './renderField';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { updateUserProfile } from '../actions/users';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter Email';
    hasErrors = true;
  }

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter Name';
    hasErrors = true;
  }

  if (!values.user_name || values.user_name.trim() === '') {
    errors.user_name = 'Enter user name';
    hasErrors = true;
  }
  return hasErrors && errors;
}

/*
//For instant async server validation
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
      if (status != 200 || data.username || data.Profile) {
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
const validateAndUpdateProfile = (values, dispatch,props) => {
  values.id = props.user.id;
  return dispatch(updateProfile(values, sessionStorage.getItem('jwtToken')))
    .then((result) => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(updateProfileFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that we got user and things are fine by updating the redux` state 
      dispatch(updateProfileSuccess(result.payload.data));
      dispatch(updateUserProfile(result.payload.data)); //update current user's Profile (in user's state)
    });
};



class UpdateProfileForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important: If you are reusing a component that might have some state (like error), you should reset it
    //either here or in componentWillMount
    this.props.resetMe();
  }

  componentWillReceiveProps() {
    const { error, profileUpdated } = this.props.updateProfile;
    if(profileUpdated){
      $('.carousel').carousel(0); 
    }

}


  getMessage() {
    const { error, profileUpdated } = this.props.updateProfile;
    if (error) {
      return <div className="alert alert-danger">
        {error.Profile}
      </div>
    } else if (profileUpdated) {
      return <div className="alert alert-info">
        Profile was updated!
             </div>
    } else {
      return <span />
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div>
        {/*this.getMessage()*/}
        <form onSubmit={handleSubmit(validateAndUpdateProfile.bind(this))}>
          <Field
            name="name"
            type="text"
            component={renderField}
            label="Update Name*" />

          <Field
            name="user_name"
            type="text"
            component={renderField}
            label="Update User name*" />

          <Field
            name="email"
            type="email"
            component={renderField}
            label="Update Email*" />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}>
            Update Profile
          </button>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'UpdateProfileForm',
  validate
})(UpdateProfileForm)