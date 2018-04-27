import { connect } from 'react-redux'
import { fetchRequests, fetchRequestsSuccess, fetchRequestsFailure} from '../actions/requests';
import BrowseRequests from '../components/BrowseRequests';


const mapStateToProps = (state) => {
  return {
    requestsList: state.requests.requestsList,
    displayRequestsDetails:state.requests.displayRequestsDetails
  };
}

const mapDispatchToProps = (dispatch) => {
  let jwtToken = sessionStorage.getItem('jwtToken');
  return {
    fetchRequests: () => {
      dispatch(fetchRequests(jwtToken)).then((response) => {
        !response.error ? dispatch(fetchRequestsSuccess(response.payload.data)) : dispatch(fetchRequestsFailure(response.payload.data));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRequests);