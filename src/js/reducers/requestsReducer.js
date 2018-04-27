import {
  FETCH_REQUESTS, FETCH_REQUESTS_SUCCESS, FETCH_REQUESTS_FAILURE, RESET_REQUESTS,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE, RESET_ACTIVE_REQUEST,
  CREATE_REQUEST, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAILURE, RESET_NEW_REQUEST,
  DELETE_REQUEST, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE, RESET_DELETED_REQUEST,
  VALIDATE_REQUEST_FIELDS, VALIDATE_REQUEST_FIELDS_SUCCESS, VALIDATE_REQUEST_FIELDS_FAILURE, RESET_REQUEST_FIELDS
} from '../actions/requests';


const INITIAL_STATE = {
  requestsList: { requests: [], error: null, loading: false },
  newRequest: { request: null, error: null, loading: false },
  activeRequest: { request: null, error: null, loading: false },
  deletedRequest: { request: null, error: null, loading: false }


};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case FETCH_REQUESTS:// start fetching requests and set loading = true
      return { ...state, requestsList: { requests: [], error: null, loading: true } };
    case FETCH_REQUESTS_SUCCESS:// return list of requests and make loading = false
      return { ...state, requestsList: { requests: action.payload, error: null, loading: false } };
    case FETCH_REQUESTS_FAILURE:// return error and make loading = false
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, requestsList: { requests: [], error: error, loading: false } };
    case RESET_REQUESTS:// reset requestList to initial state
      return { ...state, requestsList: { requests: [], error: null, loading: false } };

    case FETCH_REQUEST:
      return { ...state, activeRequest: { ...state.activeRequest, loading: true } };
    case FETCH_REQUEST_SUCCESS:
      return { ...state, activeRequest: { request: action.payload, error: null, loading: false } };
    case FETCH_REQUEST_FAILURE:
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, activeRequest: { request: null, error: error, loading: false } };
    case RESET_ACTIVE_REQUEST:
      return { ...state, activeRequest: { request: null, error: null, loading: false } };

    case CREATE_REQUEST:
      return { ...state, newRequest: { ...state.newRequest, loading: true } }
    case CREATE_REQUEST_SUCCESS:
      return { ...state, newRequest: { request: action.payload, error: null, loading: false } }
    case CREATE_REQUEST_FAILURE:
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, newRequest: { request: null, error: error, loading: false } }
    case RESET_NEW_REQUEST:
      return { ...state, newRequest: { request: null, error: null, loading: false } }


    case DELETE_REQUEST:
      return { ...state, deletedRequest: { ...state.deletedRequest, loading: true } }
    case DELETE_REQUEST_SUCCESS:
      return { ...state, deletedRequest: { request: action.payload, error: null, loading: false } }
    case DELETE_REQUEST_FAILURE:
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, deletedRequest: { request: null, error: error, loading: false } }
    case RESET_DELETED_REQUEST:
      return { ...state, deletedRequest: { request: null, error: null, loading: false } }

    case VALIDATE_REQUEST_FIELDS:
      return { ...state, newRequest: { ...state.newRequest, error: null, loading: true } }
    case VALIDATE_REQUEST_FIELDS_SUCCESS:
      return { ...state, newRequest: { ...state.newRequest, error: null, loading: false } }
    case VALIDATE_REQUEST_FIELDS_FAILURE:
      let result = action.payload;
      if (!result) {
        error = { message: action.payload.message };
      } else {
        error = { title: result.title, categories: result.categories, description: result.description };
      }
      return { ...state, newRequest: { ...state.newRequest, error: error, loading: false } }
    case RESET_REQUEST_FIELDS:
      return { ...state, newRequest: { ...state.newRequest, error: null, loading: null } }





    default:
      return state;
  }
}
