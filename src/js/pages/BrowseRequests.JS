import { connect } from 'react-redux'
import { fetchRequests, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import BrowseRequests from '../components/BrowseRequests';
import { resetNewOffer } from '../actions/offers';


const mapStateToProps = (state) => {
  return {
    requestsList: state.requests.requestsList,
    displayRequestsDetails: state.requests.displayRequestsDetails,
    newOffer: state.offers.newOffer
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRequests);