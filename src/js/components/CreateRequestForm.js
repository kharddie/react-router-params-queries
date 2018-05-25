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
import { isMobile } from "react-device-detect";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCSGUZtwqI8T3N-_qBhy8iJ6AEyrtuTqls");
// Enable or disable logs. Its optional.
//Geocode.enableDebug();

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
  if (values.hasOwnProperty("content")) {
    if (values.content.length < 30) {
      errors.content = 'Tell us a bit more.';
    }
  }

  return errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateRequest = (values, props, dispatch, isMobile, startDate, moment) => {
  values.id = props.user.id;
  values.created = moment(moment(), "YYY MM DD").toISOString();

  if (isMobile) {
    values.due_date = moment(moment(values.Due_dateM), "YYY MM DD  HH:mm:ss").add(1, 'days').toISOString();
  } else {
    values.due_date = moment(moment(startDate), "YYY MM DD  HH:mm:ss").add(1, 'days').toISOString();
  }

  if (moment(moment().format('YYYY MM DD')).isBefore(moment(values.due_date).format('YYYY MM DD'), 'year')) {
    //
  }

  ////get lat long from address
  Geocode.fromAddress(values.address).then(
    response => {
      if (response.status === "OK") {
        const { lat, lng } = response.results[0].geometry.location;
        values.lat = lat;
        values.lng = lng;
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
    },
    error => {
      console.log("address is not valid");
    }
  )

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
    if (!this.props.user) {
      if (this.props.location.href.indexOf("createRequest") > -1) {
        this.props.history.push('/signin');
      }
    }
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
    if (this.props.location.href.indexOf("createRequest") > -1) {
      this.setState({
        divClass: " col-md-8",
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
    let showHeading = this.props.location.href.indexOf("createRequest") > -1 ? "show" : "hide";
    return (
      <div >
        <div className="row justify-content-md-center">
          <div className={"col-sm-12" + this.state.divClass}>
            <div>
              <div className={showHeading} ><h2>Create Request</h2> </div>
            </div>

            <form className={"request-form " + this.state.formWidthBg} onSubmit={handleSubmit((values, dispatch) => { validateAndCreateRequest(values, this.props, dispatch, isMobile, this.state.startDate, moment); })}>
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
              <div className={isMobile ? "show" : "hide"}>
                <Field
                  name="Due_dateM"
                  type="date"
                  component={renderField}
                  label="Due dateM*" />
              </div>
              <div className={'form-group' + !isMobile ? "show" : "hide"} >
                <label className="control-label">Due date*</label>
                <div className={!isMobile ? "show" : "hide"}>
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
  form: 'CreateRequestForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(CreateRequestForm)



