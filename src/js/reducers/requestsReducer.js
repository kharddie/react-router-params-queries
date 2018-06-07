import {
  FETCH_REQUESTS, FETCH_REQUESTS_SUCCESS, FETCH_REQUESTS_FAILURE, RESET_REQUESTS,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE, RESET_ACTIVE_REQUEST,
  CREATE_REQUEST, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAILURE, RESET_NEW_REQUEST,
  DELETE_REQUEST, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE, RESET_DELETED_REQUEST,
  UPDATE_REQUEST, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_FAILURE, RESET_UPDATED_REQUEST,
  VALIDATE_REQUEST_FIELDS, VALIDATE_REQUEST_FIELDS_SUCCESS, VALIDATE_REQUEST_FIELDS_FAILURE, RESET_REQUEST_FIELDS
} from '../actions/requests';

const INITIAL_STATE = {
  requestsList: { requests: [], error: null, loading: false, message: null },
  newRequest: { request: null, error: null, loading: false, message: null },
  activeRequest: { request: null, error: null, loading: false, message: null },
  deletedRequest: { request: null, error: null, loading: false, message: null },
  resetRequest: { requests: [], error: null, loading: false, message: null },
  updateRequest: { requests: {}, error: null, loading: false, message: null }


};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case FETCH_REQUESTS:// start fetching requests and set loading = true
      return { ...state, requestsList: { requests: [], error: null, loading: true, message: null } };
    case FETCH_REQUESTS_SUCCESS:// return list of requests and make loading = false
      return { ...state, requestsList: { requests: action.payload.data, error: action.payload.error, loading: false, message: action.payload.message } };
    case FETCH_REQUESTS_FAILURE:// return error and make loading = false
      return { ...state, requestsList: { requests: [], error: "error", loading: false, message: action.payload.message } };
    case RESET_REQUESTS:// reset requestList to initial state
      return { ...state, requestsList: { requests: [], error: null, loading: false, message: null } };

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
      return { ...state, newRequest: { ...state.newRequest, loading: true, message: null } }
    case CREATE_REQUEST_SUCCESS:
      return { ...state, newRequest: { request: action.payload, error: null, loading: false, message: null } }
    case CREATE_REQUEST_FAILURE:
      return { ...state, newRequest: { request: null, error: action.payload.error, loading: false, message: action.payload.message } }
    case RESET_NEW_REQUEST:
      return { ...state, newRequest: { request: null, error: null, loading: false, message: null } }



    case DELETE_REQUEST:
      return { ...state, deletedRequest: { ...state.deletedRequest, loading: true, message: null, error: null, } }
    case DELETE_REQUEST_SUCCESS:
      /*
        const newStateUPR = Object.assign({}, state);
        newStateUPR.requestsList.requests.some(function (el, i) {
          if (parseInt(el.id) == parseInt(action.payload.data)) {
            newStateUPR.requestsList.requests.splice(i, 1);
          }
        });
        //newStateUPR.requestsList.requests.splice(0, 1);
        */
      return { ...state, deletedRequest: { request: action.payload, error: null, loading: false, message: action.payload.message } }
    case DELETE_REQUEST_FAILURE:
      error = action.payload || { message: action.payload.message };
      return { ...state, deletedRequest: { request: null, error: error, loading: false, message: null } }
    case RESET_DELETED_REQUEST:
      return { ...state, deletedRequest: { request: null, error: null, loading: false, message: null } }




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

    case UPDATE_REQUEST:
      return { ...state, updateRequest: { request: [], error: null, loading: true, message: action.payload.message } };
    case UPDATE_REQUEST_SUCCESS:
      const newStateUPS = Object.assign({}, state);
      const index = newStateUPS.requestsList.requests.findIndex(data => parseInt(data.id) === parseInt(action.payload.data.id));
      newStateUPS.requestsList.requests.splice(index, 1);
      newStateUPS.requestsList.requests.push(action.payload.data);
      return { ...newStateUPS, updateRequest: { request: action.payload.data, error: null, loading: false, message: action.payload.message } }
    case UPDATE_REQUEST_FAILURE:
      error = action.payload || { error: error, loading: false };
      if (action.payload.error !== undefined && action.payload.data.error !== "true") {
        error = false;
      } else {
        error = true;
      }
      return { ...state, updateRequest: { request: [], error: error, loading: false } };
    case RESET_UPDATED_REQUEST:
      return { ...state, updateRequest: { request: [], error: null, loading: false, message: null } };

    default:
      return state;
  }
}
