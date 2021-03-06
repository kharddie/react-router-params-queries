import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { updateProfile, updateProfileSuccess, updateProfileFailure } from '../actions/updateProfile';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure } from '../actions/validateUserFields';
import renderField from './renderField';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { updateUserProfile } from '../actions/users';
import RenderPhoneNumber from './RenderPhoneNumber';


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

  if (!values.address || values.address.trim() === '') {
    errors.address = 'Enter address';
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
const validateAndUpdateProfile = (values, state, props, dispatch) => {
 // if (state.state.phoneValid) {
    values.id = props.user.id;
    values.contact_number = state.state.phoneNumber;
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
  //}
};



class UpdateProfileForm extends Component {

  state = {
    phoneNumber: '+61 00 000 000',
    phoneError: "",
    phoneValid: false
  }

  componentWillUnmount() {
    //Important: If you are reusing a component that might have some state (like error), you should reset it
    //either here or in componentWillMount
    this.props.resetMe();
  }

  componentDidMount() {
    // here add this line to initialize the form
    //if (!this.props.initialized)
    //  this.props.initialize(this.props.initialValues);
  }

  componentDidUpdate() {

    // this.props.initialize(this.props.initialValues);
  }

  componentWillReceiveProps(nextProps) {
    const { error, profileUpdated } = this.props.updateProfile;
    if (profileUpdated) {
      $('.carousel').carousel(0);
    }

    if (nextProps.user) {
      this.setState({
        phoneNumber: nextProps.user.contact_number
      })
    }

  }

  phoneOnChangeHandler = (data) => {
    this.setState({
      phoneNumber: data.intlPhoneNumber,
      phoneError: data.friendlyMessage,
      phoneValid: data.valid
    })
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
    const lookup = (callback) => {
      loadJSONP('http://ipinfo.io', 'sendBack');
      window.sendBack = (resp) => {
        const countryCode = (resp && resp.country) ? resp.country : '';
        callback(countryCode);
      }
    };

    return (
      <div>
        {/*this.getMessage()*/}
        <form onSubmit={handleSubmit((values, dispatch) => { validateAndUpdateProfile(values, this, this.props, dispatch); })}>
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

{/*
          <RenderPhoneNumber
            name="contact_number"
            type="text"
            phoneNumber={this.state.phoneNumber}
            label="Update contact number*"
            lookup={lookup}
            phoneValid={this.state.phoneValid}
            phoneError={this.state.phoneError}
            phoneOnChangeHandler={this.phoneOnChangeHandler} />
*/}
            <Field
                                name="contact_number"
                                component={renderField}
                                label="Please provide phone number" />


          <Field
            name="email"
            type="email"
            component={renderField}
            label="Update Email*" />

          <Field
            name="address"
            type="text"
            component={renderField}
            label="Update address*" />

          <div className="form-footer">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={submitting}>
              Update Profile
          </button>
          </div>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'UpdateProfileForm',
  validate,
  enableReinitialize: true
})(UpdateProfileForm)