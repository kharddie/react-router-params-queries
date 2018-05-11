import axios from 'axios';
import { ROOT_URL } from '../helper/config';

//Offer list
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_FAILURE = 'FETCH_OFFERS_FAILURE';
export const RESET_OFFERS = 'RESET_OFFERS';

//Create new offer
export const CREATE_OFFER = 'CREATE_OFFER';
export const CREATE_OFFER_SUCCESS = 'CREATE_OFFER_SUCCESS';
export const CREATE_OFFER_FAILURE = 'CREATE_OFFER_FAILURE';
export const RESET_NEW_OFFER = 'RESET_NEW_OFFER';

//Validate offer fields like Title, Categries on the server
export const VALIDATE_OFFER_FIELDS = 'VALIDATE_OFFER_FIELDS';
export const VALIDATE_OFFER_FIELDS_SUCCESS = 'VALIDATE_OFFER_FIELDS_SUCCESS';
export const VALIDATE_OFFER_FIELDS_FAILURE = 'VALIDATE_OFFER_FIELDS_FAILURE';
export const RESET_OFFER_FIELDS = 'RESET_OFFER_FIELDS';

//Fetch offer
export const FETCH_OFFER = 'FETCH_OFFER';
export const FETCH_OFFER_SUCCESS = 'FETCH_OFFER_SUCCESS';
export const FETCH_OFFER_FAILURE = 'FETCH_OFFER_FAILURE';
export const RESET_ACTIVE_OFFER = 'RESET_ACTIVE_OFFER';

//Delete offer
export const DELETE_OFFER = 'DELETE_OFFER';
export const DELETE_OFFER_SUCCESS = 'DELETE_OFFER_SUCCESS';
export const DELETE_OFFER_FAILURE = 'DELETE_OFFER_FAILURE';
export const RESET_DELETED_OFFER = 'RESET_DELETED_OFFER';

//accepted offer
export const ACCEPT_OFFER = 'ACCEPT_OFFER';
export const ACCEPT_OFFER_SUCCESS = 'ACCEPT_OFFER_SUCCESS';
export const ACCEPT_FAILURE = 'ACCEPT_FAILURE';
export const RESET_ACCEPTED_OFFER = 'RESET_ACCEPTED_OFFER';


//accepted offer list
export const FETCH_ACCEPTED_OFFER_LIST = 'FETCH_ACCEPTED_OFFER_LIST';
export const FETCH_ACCEPTED_OFFER_LIST_SUCCESS = 'FETCH_ACCEPTED_OFFER_LIST_SUCCESS';
export const FETCH_ACCEPTED_OFFER_LIST_FAILURE = 'FETCH_ACCEPTED_OFFER_LIST_FAILURE';
export const RESET_FETCH_ACCEPTED_OFFER_LIST = 'RESET_FETCH_ACCEPTED_OFFER_LIST';

export function fetchOffers(token, requestId) {
  const offers = axios({
    method: 'get',
    url: `${ROOT_URL}/offers/read.php?rid=${requestId}`,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  return {
    type: FETCH_OFFERS,
    payload: offers
  };
}

export function fetchOffersSuccess(offers) {
  return {
    type: FETCH_OFFERS_SUCCESS,
    payload: offers
  };
}

export function fetchOffersFailure(error) {
  return {
    type: FETCH_OFFERS_FAILURE,
    payload: error
  };
}


export function resetOffers() {
  return {
    type: RESET_OFFERS
  }
};



export function validateOfferFields(props) {
  //note: we cant have /offers/validateFields because it'll match /offers/:id path!
  const offer = axios.offer(`${ROOT_URL}/offers/validate/fields`, props);

  return {
    type: VALIDATE_OFFER_FIELDS,
    payload: offer
  };
}

export function validateOfferFieldsSuccess() {
  return {
    type: VALIDATE_OFFER_FIELDS_SUCCESS
  };
}

export function validateOfferFieldsFailure(error) {
  return {
    type: VALIDATE_OFFER_FIELDS_FAILURE,
    payload: error
  };
}

export function resetOfferFields() {
  return {
    type: RESET_OFFER_FIELDS
  }
};

export function createOffer(props, tokenFromStorage) {
  const offer = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/offers/create.php`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_OFFER,
    payload: offer
  };
}

export function createOfferSuccess(newOffer) {
  return {
    type: CREATE_OFFER_SUCCESS,
    payload: newOffer
  };
}

export function createOfferFailure(error) {
  return {
    type: CREATE_OFFER_FAILURE,
    payload: error
  };
}

export function resetNewOffer() {
  return {
    type: RESET_NEW_OFFER
  }
}
;

export function resetDeletedOffer() {
  return {
    type: RESET_DELETED_OFFER
  }
}
;

export function fetchOffer(id) {
  const offer = axios.get(`${ROOT_URL}/offers/${id}`);

  return {
    type: FETCH_OFFER,
    payload: offer
  };
}


export function fetchOfferSuccess(activeOffer) {
  return {
    type: FETCH_OFFER_SUCCESS,
    payload: activeOffer
  };
}

export function fetchOfferFailure(error) {
  return {
    type: FETCH_OFFER_FAILURE,
    payload: error
  };
}

export function resetActiveOffer() {
  return {
    type: RESET_ACTIVE_OFFER
  }
}

export function deleteOffer(id, tokenFromStorage) {
  const offer = axios({
    method: 'delete',
    url: `${ROOT_URL}/offers/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_OFFER,
    payload: offer
  };
}

export function deleteOfferSuccess(deletedOffer) {
  return {
    type: DELETE_OFFER_SUCCESS,
    payload: deletedOffer
  };
}

export function deleteOfferFailure(response) {
  return {
    type: DELETE_OFFER_FAILURE,
    payload: response
  };
}


export function acceptOffer(offerId, requestId, requestUserId, userId, jwtToken, date) {
  const offer = axios({
    method: 'post',
    data: {
      user_id: userId,
      request_id: requestId,
      offer_id: offerId,
      request_user_Id: requestUserId,
      created: date,
    },
    url: `${ROOT_URL}/offers/accept_offer.php`,
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  });

  return {
    type: ACCEPT_OFFER,
    payload: offer
  };
}

export function acceptOfferSuccess(acceptOffer) {
  return {
    type: ACCEPT_OFFER_SUCCESS,
    payload: acceptOffer
  };
}

export function acceptOfferFailure(response) {
  return {
    type: ACCEPT_OFFER_FAILURE,
    payload: response
  };
}

export function resetAcceptedOffer() {
  return {
    type: RESET_ACCEPTED_OFFER
  };
}


export function fetchAcceptedOfferList(jwtToken) {
  const offer = axios({
    method: 'post',
    data: {},
    url: `${ROOT_URL}/offers/accepted_offer_list.php`,
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  });

  return {
    type: FETCH_ACCEPTED_OFFER_LIST,
    payload: offer
  };
}

export function fetchAcceptedOfferListSuccess(acceptOffer) {
  return {
    type: FETCH_ACCEPTED_OFFER_LIST_SUCCESS,
    payload: acceptOffer
  };
}

export function fetchAcceptedOfferListFailure(response) {
  return {
    type: FETCH_ACCEPTED_OFFER_LIST_FAILURE,
    payload: response
  };
}

export function resetAcceptedOfferList() {
  return {
    type: RESET_FETCH_ACCEPTED_OFFER_LIST
  };
}
