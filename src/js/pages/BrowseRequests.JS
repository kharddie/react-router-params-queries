import { connect } from 'react-redux'
import { fetchRequests, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import BrowseRequests from '../components/BrowseRequests';
import { resetNewOffer, fetchOffers, fetchOffersSuccess, fetchOffersFailure } from '../actions/offers';


const mapStateToProps = (state) => {
  return {
    requestsList: state.requests.requestsList,
    displayRequestsDetails: state.requests.displayRequestsDetails,
    newOffer: state.offers.newOffer,
    offersList:state.offers.offersList
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
    resetNewOffer: () => {
      dispatch(resetNewOffer());
    },
    fetchOffers: () => {
      dispatch(fetchOffers(jwtToken)).then((response) => {
        !response.error ? dispatch(fetchOffersSuccess(response.payload.data)) : dispatch(fetchOffersFailure(response.payload.data));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRequests);