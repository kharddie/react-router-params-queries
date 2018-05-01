import { connect } from 'react-redux'
import { fetchRequests, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import BrowseRequests from '../components/BrowseRequests';
import { resetNewOffer, fetchOffers, fetchOffersSuccess, fetchOffersFailure, resetOffers } from '../actions/offers';
import { fetchComments, fetchCommentsSuccess, fetchCommentsFailure, resetComments } from '../actions/comments';

const mapStateToProps = (state) => {
  return {
    requestsList: state.requests.requestsList,
    displayRequestsDetails: state.requests.displayRequestsDetails,
    newOffer: state.offers.newOffer,
    offersList: state.offers.offersList,
    commentsList: state.comments.commentsList,
    initialValues: {
      email: state.user.user && state.user.user.email,
      name: state.user.user && state.user.user.name,
      user_name: state.user.user && state.user.user.user_name,
      contact_number: state.user.user && state.user.user.contact_number,
    }
  };


}

const mapDispatchToProps = (dispatch) => {
  let jwtToken = sessionStorage.getItem('jwtToken');
  return {
    fetchRequests: () => {
      dispatch(fetchRequests(jwtToken)).then((response) => {
        !response.error ? dispatch(fetchRequestsSuccess(response.payload.data)) : dispatch(fetchRequestsFailure(response.payload.data));
      });
    },
    resetOffers: () => {
      dispatch(resetOffers());
    },
    resetNewOffer: () =>{
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRequests);