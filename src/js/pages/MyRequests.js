import { connect } from 'react-redux'
import { fetchRequests, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import MyRequests from '../components/MyRequest';


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

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);