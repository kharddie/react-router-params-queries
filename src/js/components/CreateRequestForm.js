import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validateRequestFields, validateRequestFieldsSuccess, validateRequestFieldsFailure } from '../actions/requests';
import { createRequest, createRequestSuccess, createRequestFailure, resetNewRequest } from '../actions/requests';
import moment from 'moment'
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.address || values.address.trim() === '') {
    errors.address = 'Enter address';
  }
  if (!values.date || values.date === '') {
    errors.date = 'Enter due date';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
  //check if user id exists
  return dispatch(validateRequestFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let { data, status } = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (response.payload.status != 200 || data.title || data.categories || data.description) {
        //let other components know of error by updating the redux` state
        dispatch(validateRequestFieldsFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validateRequestFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateRequest = (values, dispatch, props) => {
  values.id = props.user.id;
  values.due_date = moment(moment(values.date), "YYY,MM,DD").toISOString();
  values.created = moment(moment(), "YYY,MM,DD").toISOString();
  return dispatch(createRequest(values, sessionStorage.getItem('jwtToken')))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createRequestFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createRequestSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      dispatch(reset('CreateRequestForm'));
    });

}

class CreateRequestForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    divClass: "",
    formWidthBg: "",
    startDate: moment()
  }

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
    if (this.props.location.href.indexOf("createRequest") > -1) {
      this.setState({
        divClass: " col-md-6",
        formWidthBg: "form-width-bg"
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newRequest.request && !nextProps.newRequest.error) {
      this.props.history.push('/browseRequests');
      this.props.resetMe();
    }
  }

  handleChange = (momentDate) => {
    //const date = momentDate ? momentDate.format('DD-MM-YYYY') : undefined;
    this.setState({
      startDate: momentDate
    });
  }

  render() {
    const { handleSubmit, submitting, newRequest, user } = this.props;
    return (
      <div className='container'>
        <div class="row justify-content-md-center">
          <div class={"col-sm-12" + this.state.divClass}>
            <div><h2>Create Request</h2>
            </div>

            <form className={"request-form " + this.state.formWidthBg} onSubmit={handleSubmit(validateAndCreateRequest)}>
              <Field
                name="id"
                type="hidden"
                className="form-width-bg"
                component={renderField}
                value='222'
                label="" />
              <Field
                name="title"
                type="text"
                component={renderField}
                label="Request title*" />
              <Field
                name="address"
                type="text"
                component={renderField}
                label="Address*" />
              <div className='form-group'>
                <label className="control-label">Due date*</label>
                <div>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    name="date"
                    dateFormat="DD-MM-YYYY"
                    required={true}
                    id="date"
                    className="form-control"
                  />
                </div>
              </div>
              <Field
                name="content"
                component={renderTextArea}
                label="Describe your Request in more detail*" />
              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}>
                  Submit
            </button>
                <Link
                  to="/"
                  className="btn btn btn-secondary"> Cancel
            </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'CreateRequestForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(CreateRequestForm)



