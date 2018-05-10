import { connect } from 'react-redux'
import { fetchRequests, resetRequest, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import BrowseRequests from '../components/BrowseRequests';
import { resetNewOffer, fetchOffers, fetchOffersSuccess, fetchOffersFailure, resetOffers } from '../actions/offers';
import { fetchComments, fetchCommentsSuccess, fetchCommentsFailure, resetComments } from '../actions/comments';
import { acceptOffer, acceptOfferSuccess, acceptOfferFailure } from '../actions/offers';
import { showInfoMessage } from "../actions/infoMessage.js";
import moment from 'moment';
import Moment from 'react-moment';

const mapStateToProps = (state, ownProps) => {
  return {
    requestsList: state.requests.requestsList,
    resetRequestxx: state.requests.resetRequest,
    displayRequestsDetails: state.requests.displayRequestsDetails,
    newOffer: state.offers.newOffer,
    offersList: state.offers.offersList,
    commentsList: state.comments.commentsList,
    user: state.user.user,
    acceptedOffer: state.offers.acceptOffer,
    initialValues: {
      email: state.user.user && state.user.user.email,
      name: state.user.user && state.user.user.name,
      user_name: state.user.user && state.user.user.user_name,
      contact_number: state.user.user && state.user.user.contact_number,
    }
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let jwtToken = sessionStorage.getItem('jwtToken');
  let userParamId = !ownProps.params.id ? null : ownProps.params.id;
  let date = moment(moment(), "YYY,MM,DD").toISOString();
  return {
    fetchRequests: () => {
      // dispatch(resetRequest());
      dispatch(fetchRequests(jwtToken, userParamId)).then((response) => {
        !response.error ? dispatch(fetchRequestsSuccess(response.payload.data)) : dispatch(fetchRequestsFailure(response.payload.data));
      });
    },
    resetRequest: () => {
      dispatch(resetRequest());
    },
    resetOffers: () => {
      dispatch(resetOffers());
    },
    resetNewOffer: () => {
      dispatch(resetNewOffer());
    },
    fetchOffers: (requestId) => {
      dispatch(fetchOffers(jwtToken, requestId)).then((response) => {
        !response.error ? dispatch(fetchOffersSuccess(response.payload.data)) : dispatch(fetchOffersFailure(response.payload.data));
      });
    },
    fetchComments: (requestId) => {
      dispatch(fetchComments(jwtToken, requestId)).then((response) => {
        !response.error ? dispatch(fetchCommentsSuccess(response.payload.data)) : dispatch(fetchCommentsFailure(response.payload.data));
      });
    },
    resetComments: () => {
      dispatch(resetComments());
    },

    acceptOffer: (offerId, requestId, requestUserId, userId) => {
      return dispatch(acceptOffer(offerId, requestId, requestUserId, userId, jwtToken,date))
        .then(result => {
          if (result.payload && result.payload.status !== 200) {
            dispatch(acceptOfferFailure(result.payload.response.data));
            throw new SubmissionError(result.payload.response.data);
          }
          dispatch(acceptOfferSuccess(result.payload.data)); 
          dispatch(showInfoMessage(result.payload.data));
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRequests);