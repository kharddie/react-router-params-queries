/*connect it to the store  
It subscribes our  component to the store, so that it will be alerted when state changes.
Not every component will be connected, or subscribed, to the store.
 container component OR "stateful", components will be connected to the store..
 */
import { connect } from 'react-redux';
import {
  fetchProducts, fetchProductsSuccess, fetchProductsFailure,
  deleteProduct, deleteProductSuccess, deleteProductFailure,
  updateProduct, updateProductSuccess, updateProductFailure,
  createProduct, createProductSuccess, createProductFailure, resetNewProduct,
} from '../actions/Products';

import {
  fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure,
  deleteCategories, deleteCategoriesSuccess, deleteCategoriesFailure,
  updateCategories, updateCategoriesSuccess, updateCategoriesFailure,
  createCategories, createCategoriesSuccess, createCategoriesFailure, resetNewCategories,
} from '../actions/Categories';

import Products from '../components/Products';

/*
The mapStateToProps function has a very important job: 
receive application state from the store whenever state has changed and make data from that data 
available to the component as props.
http://www.thegreatcodeadventure.com/react-redux-tutorial-part-iv-the-index-feature/
*/
const mapStateToProps = (state, ownProps) => {

  let error = null;
  let loading = false;

  //set loading and error
  if (state.categories.categoriesList.error || state.products.productList.error || state.products.deletedProduct.error) {
    error = true;
  }

  if (state.categories.categoriesList.loading === true || state.products.productList.loading === true || state.products.deletedProduct.loading === true) {
    loading = true;
  }


  //products
  let productsDetails = {
    data: state.products.productList.products,
    loading: state.products.productList.loading,
    error: state.products.productList.error
  };
  //deleted products
  let deletedProductDetails = {
    data: state.products.deletedProduct.deletedProduct.data,
    loading: state.products.deletedProduct.loading,
    error: state.products.deletedProduct.error
  };
  //updated products
  let updatedProductDetails = {
    data: state.products.updateProduct.updateProduct.data,
    loading: state.products.updateProduct.loading,
    error: state.products.updateProduct.error
  };
  //new products
  let newProductDetails = {
    data: state.products.newProduct.newProduct,
    loading: state.products.newProduct.loading,
    error: state.products.newProduct.error
  };

  //categories
  let categoriesDetails = {
    data: state.categories.categoriesList.categories,
    loading: state.categories.categoriesList.loading,
    error: state.categories.categoriesList.error
  };
  //deleted categories
  let deletedCategoriesDetails = {
    data: state.categories.deletedCategories.deletedCategories.data,
    loading: state.categories.deletedCategories.loading,
    error: state.categories.deletedCategories.error
  };
  //updated categories
  let updatedCategoriesDetails = {
    data: state.categories.updateCategories.updateCategories.data,
    loading: state.categories.updateCategories.loading,
    error: state.categories.updateCategories.error
  };
  //new category
  let newCategoryDetails = {
    data: state.categories.newCategories.newProduct,
    loading: state.categories.newCategories.loading,
    error: state.categories.newCategories.error
  };

















  let dataToProps = {
    categoriesDetails: categoriesDetails,
    productsDetails: productsDetails,
    deletedProductDetails: deletedProductDetails,
    newProductDetails: newProductDetails,
    updatedProductDetails: updatedProductDetails,
    errorLoading: { error: error, loading: loading },
  }

  return {
    dataToProps: dataToProps
  };
}

//sends our API payload to the reducer, via the store.
const mapDispatchToProps = (dispatch) => {

  //products
  return {
    fetchProducts: () => {
      dispatch(fetchProducts()).then((response) => {
        //clean the payload  fetching
        !response.error ? dispatch(fetchProductsSuccess(response.payload.data.data)) : dispatch(fetchCategoriesFailure(response.payload.data.data));
      });
    },
    deleteProduct: (event) => {
      dispatch(deleteProduct(event)).then((response) => {
        //clean the payload  fetching
        !response.error ? dispatch(deleteProductSuccess(response.payload.data)) : dispatch(deleteProductFailure(response.payload.data));
      });
    },

    updateProduct: (event) => {
      dispatch(updateProduct(event)).then((response) => {
        //clean the payload  fetching
        if (!response.error && response.payload.data.error !== 'true') {
          dispatch(updateProductSuccess(response.payload))
        } else {
          dispatch(updateProductFailure(response.payload))
        }
      });

    },

    createProduct: (event) => {
      dispatch(createProduct(event)).then((response) => {
        //clean the payload  fetching
        !response.error ? dispatch(createProductSuccess(response.payload.data)) : dispatch(createProductFailure(response.payload.data));
      });
    },

    //categories
    fetchCategories: () => {
      dispatch(fetchCategories()).then((response) => {
        //clean the payload  fetching
        !response.error ? dispatch(fetchCategoriesSuccess(response.payload.data.data)) : dispatch(fetchCategoriesFailure(response.payload.data));
      });
    },

    deleteCategories: (event) => {
      dispatch(deleteCategories(event)).then((response) => {
        //clean the payload  fetching
        !response.error ? dispatch(deleteCategoriesSuccess(response.payload.data)) : dispatch(deleteCategoriesFailure(response.payload.data));
      });
    },

    updateCategories: (event) => {
      dispatch(updateCategories(event)).then((response) => {
        //clean the payload  fetching
        if (!response.error && response.payload.data.error !== 'true') {
          dispatch(updateCategoriesSuccess(response.payload))
        } else {
          dispatch(updateCategoriesFailure(response.payload))
        }
      });

    },

    createCategories: (event) => {
      dispatch(createCategories(event)).then((response) => {
        //clean the payload  fetching
        !response.error ? dispatch(createCategoriesSuccess(response.payload.data)) : dispatch(createCategoriesFailure(response.payload.data));
      });
    },

    resetMe: () => {
      dispatch(resetNewProduct());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);