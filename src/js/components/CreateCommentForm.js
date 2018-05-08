import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import RenderDatePickerField from './RenderDatePickerField';

import { createComment, createCommentSuccess, createCommentFailure } from '../actions/comments';

import moment from 'moment'
import Moment from 'react-moment';

//Client side validation
function validate(values) {
  const errors = {};

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
const validateAndCreateComment = (values, dispatch, props) => {
  values.request_id = props.requestId;
  values.user_id = props.user.id;
  values.created = moment(moment(), "YYY,MM,DD").toISOString();
  return dispatch(createComment(values, sessionStorage.getItem('jwtToken')))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createComment(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createCommentSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      dispatch(reset('CreateCommentForm'));
      props.fetchComments(props.requestId);
    });

}

class CreateCommentForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    divClass: "",
    formWidthBg: ""
  }

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { handleSubmit, submitting, newRequest, user } = this.props;
    return (
      <div className='container'>
        <div className="row justify-content-md-center">
          <div className="col-sm-12">
            <div class="form-container-width-btn-inside">
              <form className="comment-form" onSubmit={handleSubmit(validateAndCreateComment)}>
                <Field
                  name="content"
                  component={renderTextArea}
                  label="" />
                <div class="row text-right">
                  <div class="col-sm-12 col-md-4"></div>
                  <div class="col-sm-12 col-md-4"></div>
                  <div class="col-sm-12 col-md-4">
                    <div class="row ">
                      <div class="col">
                        <button type="submit" className="btn btn btn-outline-secondary" disabled={submitting}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'CreateCommentForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form

})(CreateCommentForm)



