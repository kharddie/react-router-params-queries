import axios from "axios"
/*
some action creators are, as you would expect, simple JSON objects with a key of type, 
designating the name or type of the action that is dispatched, 
and other, optional, keys pointing to any payload we may need to update state. 
Other action creators, however, with the help of Thunk, 
as actually functions that can make asynchronous web requests and 
invoke a dispatch function to dispatch additional actions.
*/

//DELETE products
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const RESET_PRODUCT = 'RESET_PRODUCT';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/Reactjs-Weather-App/api/' : '/api';


export function deleteProduct(pid , tokenFromStorage) {
  if (pid === undefined) {
    pid = 0;
  }
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}product/delete.php`,
    //data:JSON.stringify({id:data}),
    data: { id: pid },
    headers: []
  });
  return {
    type: DELETE_PRODUCT,
    payload: request
  };
}

export function deleteProductSuccess(posts) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: posts
  };
}

export function deleteProductFailure(error) {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: error
  };
}




