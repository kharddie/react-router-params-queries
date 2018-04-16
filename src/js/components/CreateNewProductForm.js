import React, { Component, PropTypes } from "react";

import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError, touched } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validateProductFields, validateProductFieldsSuccess, validateProductFieldsFailure } from '../actions/Products';
import { createProduct, createProductSuccess, createProductFailure, resetNewProduct } from '../actions/Products';


//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch, props) => {
  props.hideModal();
  console.log(values);
  return dispatch(createProduct(values, sessionStorage.getItem('jwtToken')))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createProductFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createProductSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      //props.reloadProducts();
    });
}


//Client side validation
const validate = values => {
  const errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a Product name';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Chose product category';
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter some content';
  }

  return errors;
}





class CreateNewProductForm extends React.Component {
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
      console.log(nextProps.props.dataToProps.newProductDetails.data);
      //nextProps.props.fetchCategories();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // if (nextProps.newPost.post && !nextProps.newPost.error) {
    //  this.context.router.push('/');
    // }

    if (nextProps.props.dataToProps.newProductDetails.data.data !== undefined) {
      this.props.fetchCategories();
      console.log(nextProps.props.dataToProps.newProductDetails.data.data)
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

    const { categoriesDetails, newProductDetails } = this.props.props.dataToProps;

    //Get categories for select
    const catOptions = categoriesDetails.data.map((data, index, currentElement) => {
      return (<option key={index} value={data.id}>{data.name}</option>)
    })


    return (
      <div>
        <div className="row">
          <div className="col-12">
            {this.renderError(newProductDetails)}
            <form onSubmit={handleSubmit(validateAndCreatePost)}>
              <div>
                <label>Select Categories</label>
                <div>
                  <Field name="category_id" component="select">
                    <option />
                    {catOptions}
                  </Field>
                </div>
              </div>






              <Field
                name="name"
                type="text"
                component={renderField}
                label="Product Name*" />

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
  form: 'CreateNewProductForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(CreateNewProductForm)