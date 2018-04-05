import axios from "axios"
/*
some action creators are, as you would expect, simple JSON objects with a key of type, 
designating the name or type of the action that is dispatched, 
and other, optional, keys pointing to any payload we may need to update state. 
Other action creators, however, with the help of Thunk, 
as actually functions that can make asynchronous web requests and 
invoke a dispatch function to dispatch additional actions.
*/

//FETCH products
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/Reactjs-Weather-App/api/' : '/api';


export function fetchProducts() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}product/read.php`,
    headers: []
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchProductsSuccess(posts) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: posts
  };
}

export function fetchProductsFailure(error) {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  };
}
