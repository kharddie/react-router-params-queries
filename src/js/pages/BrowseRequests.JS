import { connect } from 'react-redux'
import { fetchRequests, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import BrowseRequests from '../components/BrowseRequests';


const mapStateToProps = (state) => {
  return { 
    requestsList: state.requests.requestsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequests: () => {
      dispatch(fetchRequests()).then((response) => {
            !response.error ? dispatch(fetchRequestsSuccess(response.payload.data)) : dispatch(fetchRequestsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRequests);