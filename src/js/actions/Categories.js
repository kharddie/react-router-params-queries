import axios from "axios"

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';

//DELETE categories
export const DELETE_CATEGORIES = 'DELETE_CATEGORIES';
export const DELETE_CATEGORIES_SUCCESS = 'DELETE_CATEGORIES_SUCCESS';
export const DELETE_CATEGORIES_FAILURE = 'DELETE_CATEGORIES_FAILURE';
export const RESET_DELETED_CATEGORIES = 'RESET_DELETED_CATEGORIES';

//create categories
export const CREATE_CATEGORIES = 'CREATE_CATEGORIES';
export const CREATE_CATEGORIES_SUCCESS = 'CREATE_CATEGORIES_SUCCESS';
export const CREATE_CATEGORIES_FAILURE = 'CREATE_CATEGORIES_FAILURE';
export const RESET_NEW_CATEGORIES = 'RESET_NEW_CATEGORIES';

//update categories
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_CATEGORIES_SUCCESS = 'UPDATE_CATEGORIES_SUCCESS';
export const UPDATE_CATEGORIES_FAILURE = 'UPDATE_CATEGORIES_FAILURE';
export const RESET_UPDATED_CATEGORIES = 'RESET_UPDATED_CATEGORIES';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/react-router-params-queries-api/' : '/api';


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


export function deleteCategories(pid , tokenFromStorage) {
  if (pid === undefined) {
    pid = 0;
  }
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}product/delete.php`,
    //data:JSON.stringify({id:data}),
    data: { id: pid },
    headers: []
  });
  return {
    type: DELETE_CATEGORIES,
    payload: request
  };
}

export function deleteCategoriesSuccess(posts) {
  return {
    type: DELETE_CATEGORIES_SUCCESS,
    payload: posts
  };
}

export function deleteCategoriesFailure(error) {
  return {
    type: DELETE_CATEGORIES_FAILURE,
    payload: error
  };
}

export function resetDeletedCategories() {
  return {
    type: RESET_DELETED_CATEGORIES
  }
}

// CREATE
export function createCategories(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/category/create.php`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_CATEGORIES,
    payload: request
  };
}

export function createCategoriesSuccess(newCategories) {
  return {
    type: CREATE_CATEGORIES_SUCCESS,
    payload: newCategories
  };
}

export function createCategoriesFailure(error) {
  return {
    type: CREATE_CATEGORIES_FAILURE,
    payload: error
  };
}

export function resetNewCategories() {
  return {
    type: RESET_NEW_CATEGORIES
  }
}



// UPDATE
export function updateCategories(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/category/update.php`,  
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_CATEGORIES,
    payload: request
  };
}

export function updateCategoriesSuccess(updateCategories) {
  return {
    type: UPDATE_CATEGORIES_SUCCESS,
    payload: updateCategories
  };
}

export function updateCategoriesFailure(payload) {
  return {
    type: UPDATE_CATEGORIES_FAILURE,
    payload: payload
  };
}

export function resetUpdatedCategories() {
  return {
    type: RESET_UPDATED_CATEGORIES
  }
}

