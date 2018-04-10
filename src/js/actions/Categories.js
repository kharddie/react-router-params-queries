import axios from "axios"

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/Reactjs-Weather-App/api/' : '/api';


export function fetchCategories() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}category/read.php`,
    headers: []
  });

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchCategoriesSuccess(posts) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: posts
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error
  };
}
