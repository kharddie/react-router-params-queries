import {
  FETCH_OFFERS, FETCH_OFFERS_SUCCESS, FETCH_OFFERS_FAILURE, RESET_OFFERS,
  FETCH_OFFER, FETCH_OFFER_SUCCESS, FETCH_OFFER_FAILURE, RESET_ACTIVE_OFFER,
  CREATE_OFFER, CREATE_OFFER_SUCCESS, CREATE_OFFER_FAILURE, RESET_NEW_OFFER,
  DELETE_OFFER, DELETE_OFFER_SUCCESS, DELETE_OFFER_FAILURE, RESET_DELETED_OFFER,

  ACCEPT_OFFER, ACCEPT_OFFER_SUCCESS, ACCEPT_OFFER_FAILURE, RESET_ACCEPTED_OFFER,

  VALIDATE_OFFER_FIELDS, VALIDATE_OFFER_FIELDS_SUCCESS, VALIDATE_OFFER_FIELDS_FAILURE, RESET_OFFER_FIELDS
} from '../actions/offers';


const INITIAL_STATE = {
  offersList: { offers: [], error: null, loading: false },
  newOffer: { offer: null, error: null, loading: false },
  activeOffer: { offer: null, error: null, loading: false },
  deletedOffer: { offer: null, error: null, loading: false },
  acceptOffer: { acceptOffer: null, error: null, loading: false, success: false }


};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case FETCH_OFFERS:// start fetching offers and set loading = true
      return { ...state, offersList: { offers: [], error: null, loading: true } };
    case FETCH_OFFERS_SUCCESS:// return list of offers and make loading = false
      return { ...state, offersList: { offers: action.payload.data, error: null, loading: false } };
    case FETCH_OFFERS_FAILURE:// return error and make loading = false
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, offersList: { offers: [], error: error, loading: false } };
    case RESET_OFFERS:// reset offerList to initial state
      return { ...state, offersList: { offers: [], error: null, loading: false } };

    case FETCH_OFFER:
      return { ...state, activeOffer: { ...state.activeOffer, loading: true } };
    case FETCH_OFFER_SUCCESS:
      return { ...state, activeOffer: { offer: action.payload, error: null, loading: false } };
    case FETCH_OFFER_FAILURE:
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, activeOffer: { offer: null, error: error, loading: false } };
    case RESET_ACTIVE_OFFER:
      return { ...state, activeOffer: { offer: null, error: null, loading: false } };

    case CREATE_OFFER:
      return { ...state, newOffer: { ...state.newOffer, loading: true } }
    case CREATE_OFFER_SUCCESS:
      return { ...state, newOffer: { offer: action.payload, error: null, loading: false } }
    case CREATE_OFFER_FAILURE:
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, newOffer: { offer: null, error: error, loading: false } }
    case RESET_NEW_OFFER:
      return { ...state, newOffer: { offer: null, error: null, loading: false } }


    case DELETE_OFFER:
      return { ...state, deletedOffer: { ...state.deletedOffer, loading: true } }
    case DELETE_OFFER_SUCCESS:
      return { ...state, deletedOffer: { offer: action.payload, error: null, loading: false } }
    case DELETE_OFFER_FAILURE:
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, deletedOffer: { offer: null, error: error, loading: false } }
    case RESET_DELETED_OFFER:
      return { ...state, deletedOffer: { offer: null, error: null, loading: false } }

    case VALIDATE_OFFER_FIELDS:
      return { ...state, newOffer: { ...state.newOffer, error: null, loading: true } }
    case VALIDATE_OFFER_FIELDS_SUCCESS:
      return { ...state, newOffer: { ...state.newOffer, error: null, loading: false } }
    case VALIDATE_OFFER_FIELDS_FAILURE:
      let result = action.payload;
      if (!result) {
        error = { message: action.payload.message };
      } else {
        error = { title: result.title, categories: result.categories, description: result.description };
      }
      return { ...state, newOffer: { ...state.newOffer, error: error, loading: false } }
    case RESET_OFFER_FIELDS:
      return { ...state, newOffer: { ...state.newOffer, error: null, loading: null } }


    case ACCEPT_OFFER:
      return { ...state, acceptOffer: { acceptOffer: [], error: null, loading: true, success: false } }
    case ACCEPT_OFFER_SUCCESS:
      let success = false
      if (action.payload.data.id !== '' && action.payload.error !== "true") {
        success = true;
      } else {
        success = false;
      }

      const newState = Object.assign({}, state);
      newState.offersList.offers.map(data => {
          if (parseInt(data.offer_id) === parseInt(action.payload.data.offer_id)) {
               data.isOfferAccepted = true;
          }

      })


      return { ...newState, acceptOffer: { acceptOffer: action.payload, error: null, loading: false, success: success } }
    case ACCEPT_OFFER_FAILURE:
      return { ...state, acceptOffer: { acceptOffer: null, error: error, loading: false, success: false } }
    case RESET_ACCEPTED_OFFER:
      return { ...state, acceptOffer: { acceptOffer: null, error: null, loading: false, success: false } }


    default:
      return state;
  }
}
