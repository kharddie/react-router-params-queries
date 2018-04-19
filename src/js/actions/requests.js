import axios from 'axios';

//Request list
export const FETCH_REQUESTS = 'FETCH_REQUESTS';
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS';
export const FETCH_REQUESTS_FAILURE = 'FETCH_REQUESTS_FAILURE';
export const RESET_REQUESTS = 'RESET_REQUESTS';

//Create new request
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';
export const CREATE_REQUEST_FAILURE = 'CREATE_REQUEST_FAILURE';
export const RESET_NEW_REQUEST = 'RESET_NEW_REQUEST';

//Validate request fields like Title, Categries on the server
export const VALIDATE_REQUEST_FIELDS = 'VALIDATE_REQUEST_FIELDS';
export const VALIDATE_REQUEST_FIELDS_SUCCESS = 'VALIDATE_REQUEST_FIELDS_SUCCESS';
export const VALIDATE_REQUEST_FIELDS_FAILURE = 'VALIDATE_REQUEST_FIELDS_FAILURE';
export const RESET_REQUEST_FIELDS = 'RESET_REQUEST_FIELDS';

//Fetch request
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
export const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';
export const RESET_ACTIVE_REQUEST = 'RESET_ACTIVE_REQUEST';

//Delete request
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_REQUEST_SUCCESS = 'DELETE_REQUEST_SUCCESS';
export const DELETE_REQUEST_FAILURE = 'DELETE_REQUEST_FAILURE';
export const RESET_DELETED_REQUEST = 'RESET_DELETED_REQUEST';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/react-router-params-queries-api/' : '/api';

export function fetchRequests() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/requests/read.php`,
    headers: []
  });

  return {
    type: FETCH_REQUESTS,
    payload: request
  };
}

export function fetchRequestsSuccess(requests) {
  return {
    type: FETCH_REQUESTS_SUCCESS,
    payload: requests
  };
}

export function fetchRequestsFailure(error) {
  return {
    type: FETCH_REQUESTS_FAILURE,
    payload: error
  };
}

export function validateRequestFields(props) {
  //note: we cant have /requests/validateFields because it'll match /requests/:id path!
  const request = axios.request(`${ROOT_URL}/requests/validate/fields`, props);

  return {
    type: VALIDATE_REQUEST_FIELDS,
    payload: request
  };
}

export function validateRequestFieldsSuccess() {
  return {
    type: VALIDATE_REQUEST_FIELDS_SUCCESS
  };
}

export function validateRequestFieldsFailure(error) {
  return {
    type: VALIDATE_REQUEST_FIELDS_FAILURE,
    payload: error
  };
}

export function resetRequestFields() {
  return {
    type: RESET_REQUEST_FIELDS
  }
}
;


export function createRequest(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/requests/create.php`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_REQUEST,
    payload: request
  };
}

export function createRequestSuccess(newRequest) {
  return {
    type: CREATE_REQUEST_SUCCESS,
    payload: newRequest
  };
}

export function createRequestFailure(error) {
  return {
    type: CREATE_REQUEST_FAILURE,
    payload: error
  };
}

export function resetNewRequest() {
  return {
    type: RESET_NEW_REQUEST
  }
}
;

export function resetDeletedRequest() {
  return {
    type: RESET_DELETED_REQUEST
  }
}
;

export function fetchRequest(id) {
  const request = axios.get(`${ROOT_URL}/requests/${id}`);

  return {
    type: FETCH_REQUEST,
    payload: request
  };
}


export function fetchRequestSuccess(activeRequest) {
  return {
    type: FETCH_REQUEST_SUCCESS,
    payload: activeRequest
  };
}

export function fetchRequestFailure(error) {
  return {
    type: FETCH_REQUEST_FAILURE,
    payload: error
  };
}

export function resetActiveRequest() {
  return {
    type: RESET_ACTIVE_REQUEST
  }
}


export function deleteRequest(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/requests/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_REQUEST,
    payload: request
  };
}

export function deleteRequestSuccess(deletedRequest) {
  return {
    type: DELETE_REQUEST_SUCCESS,
    payload: deletedRequest
  };
}

export function deleteRequestFailure(response) {
  return {
    type: DELETE_REQUEST_FAILURE,
    payload: response
  };
}