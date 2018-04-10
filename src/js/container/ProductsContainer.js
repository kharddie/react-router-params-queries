/*connect it to the store  
It subscribes our  component to the store, so that it will be alerted when state changes.
Not every component will be connected, or subscribed, to the store.
 container component OR "stateful", components will be connected to the store..
 */
import { connect } from 'react-redux';
import { fetchProducts, fetchProductsSuccess, fetchProductsFailure } from '../actions/Products';
import { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure } from '../actions/Categories';

import { deleteProduct, deleteProductSuccess, deleteProductFailure } from '../actions/ProductDelete';


import Products from '../components/Products';

/*
The mapStateToProps function has a very important job: 
receive application state from the store whenever state has changed and make data from that data 
available to the component as props.
http://www.thegreatcodeadventure.com/react-redux-tutorial-part-iv-the-index-feature/
*/
const mapStateToProps = (state) => {
  let categoriesProductsHolder ={
    data: [],
    loading: loading,
    error:error
  };
  let categoriesProducts = [];
  let products = [];
  let error = null;
  let loading = false;

  if (state.posts.productList.products.length > 0 && state.categories.categoriesList.categories.length > 0) {
    loading = state.categories.categoriesList.loading;
    error = state.categories.categoriesList.error;
    state.categories.categoriesList.categories.map(function (data, index) {
    
      state.posts.productList.products.map(function (data2, index2) {
        if (data2.category_id == data.id) {
          products.push({
            prodId: data2.id,
            prodCategoryId: data2.category_id,
            prodName: data2.name,
            prodprice: data2.price,
            prodDescription: data2.description,
          });
        }
      })
      categoriesProducts.push({
        catId: data.id,
        catName: data.name,
        catDescription: data.description,
        products: products
      })
      products = [];
    })
    categoriesProductsHolder = {
      data: categoriesProducts,
      loading: loading,
      error:error
    };
    categoriesProducts = [];
    categoriesProductsHolder;
  }


  return {
    categoriesProductsData: categoriesProductsHolder,
  };
}

//sends our API payload to the reducer, via the store.
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts()).then((response) => {
        //clean the payload  fetching
        if ("records" in response.payload.data) {
          let data = response.payload.data.records;
          !response.error ? dispatch(fetchProductsSuccess(data)) : dispatch(fetchCategoriesFailure(data));
        } else {
          !response.error ? dispatch(fetchProductsSuccess(response.payload.data)) : dispatch(fetchCategoriesFailure(response.payload.data));
        }
      });
    },
    fetchCategories: () => {
      dispatch(fetchCategories()).then((response) => {
        //clean the payload  fetching
        if ("records" in response.payload.data) {
          let data = response.payload.data.records;
          !response.error ? dispatch(fetchCategoriesSuccess(data)) : dispatch(fetchCategoriesFailure(data));
        } else {
          !response.error ? dispatch(fetchCategoriesSuccess(response.payload.data)) : dispatch(fetchCategoriesFailure(response.payload.data));

        }
      });
    },
    deleteProduct: (event) => {
      dispatch(deleteProduct(event)).then((response) => {
        //clean the payload  fetching
        if ("records" in response.payload.data) {
          let data = response.payload.data.records;
          !response.error ? dispatch(deleteProductSuccess(data)) : dispatch(deleteProductFailure(data));
        } else {
          !response.error ? dispatch(deleteProductSuccess(response.payload.data)) : dispatch(deleteProductFailure(response.payload.data));

        }
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);