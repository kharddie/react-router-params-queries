import React, { Component, PropTypes } from "react";

import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError, touched } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validateProductFields, validateProductFieldsSuccess, validateProductFieldsFailure } from '../actions/Products';
import { createCategories, createCategoriesSuccess, createCategoriesFailure, resetNewCategory } from '../actions/Categories';


//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch, props) => {
  props.hideModal();
  props.props.createCategories(values);
}


//Client side validation
const validate = values => {
  const errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a Product name';
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter some content';
  }

  return errors;
}





class CreateNewCategoriesForm extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT

  }

  componentWillReceiveProps = nextProps => {
    // if (nextProps.newPost.post && !nextProps.newPost.error) {
    //  this.context.router.push('/');
    // }

    if (nextProps.props.dataToProps.newProductDetails.data !== undefined) {
      //nextProps.props.fetchCategories();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // if (nextProps.newPost.post && !nextProps.newPost.error) {
    //  this.context.router.push('/');
    // }

    if (nextProps.props.dataToProps.newProductDetails.data.data !== undefined) {
      this.props.fetchCategories();
    }

  }

  renderError(newProductDetails) {
    if (newProductDetails && newProductDetails.error && newProductDetails.error.message) {
      return (
        <div className="alert alert-danger">
          {newProductDetails ? newProductDetails.error.message : ''}
        </div>
      );
    } else {
      return <span></span>
    }
  }




  render() {
    const { handleSubmit, hideModal, pristine, reset, submitting } = this.props;

    const { categoriesDetails, newCategoriesDetails } = this.props.props.dataToProps;




    return (
      <div>
        <div className="row">
          <div className="col-12">
            {this.renderError(newCategoriesDetails)}
            <form onSubmit={handleSubmit(validateAndCreatePost)}>
              <div>
                <label>Select Categories</label>
              </div>


              <Field
                name="name"
                type="text"
                component={renderField}
                label="Category Name*" />

              <Field
                name="description"
                component={renderTextArea}
                label="Description*" />








              <div class="form-group">
                <button
                  className="btn btn-secondary btn-lg btn-block"
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}>
                  Reset
                 </button>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  disabled={pristine || submitting}>
                  Create product
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
  form: 'CreateNewCategoriesForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(CreateNewCategoriesForm)