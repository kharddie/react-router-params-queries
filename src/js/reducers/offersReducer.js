import {
    FETCH_OFFERS, FETCH_OFFERS_SUCCESS, FETCH_OFFERS_FAILURE, RESET_OFFERS,
    FETCH_OFFER, FETCH_OFFER_SUCCESS, FETCH_OFFER_FAILURE, RESET_ACTIVE_OFFER,
    CREATE_OFFER, CREATE_OFFER_SUCCESS, CREATE_OFFER_FAILURE, RESET_NEW_OFFER,
    DELETE_OFFER, DELETE_OFFER_SUCCESS, DELETE_OFFER_FAILURE, RESET_DELETED_OFFER,
    VALIDATE_OFFER_FIELDS, VALIDATE_OFFER_FIELDS_SUCCESS, VALIDATE_OFFER_FIELDS_FAILURE, RESET_OFFER_FIELDS
  } from '../actions/offers';
  
  
  const INITIAL_STATE = {
    offersList: { offers: [], error: null, loading: false },
    newRequest: { offer: null, error: null, loading: false },
    activeRequest: { offer: null, error: null, loading: false },
    deletedRequest: { offer: null, error: null, loading: false }
  
  
  };
  
  export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
  
      case FETCH_OFFERS:// start fetching offers and set loading = true
        return { ...state, offersList: { offers: [], error: null, loading: true } };
      case FETCH_OFFERS_SUCCESS:// return list of offers and make loading = false
        return { ...state, offersList: { offers: action.payload, error: null, loading: false } };
      case FETCH_OFFERS_FAILURE:// return error and make loading = false
        error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
        return { ...state, offersList: { offers: [], error: error, loading: false } };
      case RESET_OFFERS:// reset offerList to initial state
        return { ...state, offersList: { offers: [], error: null, loading: false } };
  
      case FETCH_OFFER:
        return { ...state, activeRequest: { ...state.activeRequest, loading: true } };
      case FETCH_OFFER_SUCCESS:
        return { ...state, activeRequest: { offer: action.payload, error: null, loading: false } };
      case FETCH_OFFER_FAILURE:
        error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
        return { ...state, activeRequest: { offer: null, error: error, loading: false } };
      case RESET_ACTIVE_OFFER:
        return { ...state, activeRequest: { offer: null, error: null, loading: false } };
  
      case CREATE_OFFER:
        return { ...state, newRequest: { ...state.newRequest, loading: true } }
      case CREATE_OFFER_SUCCESS:
        return { ...state, newRequest: { offer: action.payload, error: null, loading: false } }
      case CREATE_OFFER_FAILURE:
        error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
        return { ...state, newRequest: { offer: null, error: error, loading: false } }
      case RESET_NEW_OFFER:
        return { ...state, newRequest: { offer: null, error: null, loading: false } }
  
  
      case DELETE_OFFER:
        return { ...state, deletedRequest: { ...state.deletedRequest, loading: true } }
      case DELETE_OFFER_SUCCESS:
        return { ...state, deletedRequest: { offer: action.payload, error: null, loading: false } }
      case DELETE_OFFER_FAILURE:
        error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
        return { ...state, deletedRequest: { offer: null, error: error, loading: false } }
      case RESET_DELETED_OFFER:
        return { ...state, deletedRequest: { offer: null, error: null, loading: false } }
  
      case VALIDATE_OFFER_FIELDS:
        return { ...state, newRequest: { ...state.newRequest, error: null, loading: true } }
      case VALIDATE_OFFER_FIELDS_SUCCESS:
        return { ...state, newRequest: { ...state.newRequest, error: null, loading: false } }
      case VALIDATE_OFFER_FIELDS_FAILURE:
        let result = action.payload;
        if (!result) {
          error = { message: action.payload.message };
        } else {
          error = { title: result.title, categories: result.categories, description: result.description };
        }
        return { ...state, newRequest: { ...state.newRequest, error: error, loading: false } }
      case RESET_OFFER_FIELDS:
        return { ...state, newRequest: { ...state.newRequest, error: null, loading: null } }
  
  
  
  
  
      default:
        return state;
    }
  }
  