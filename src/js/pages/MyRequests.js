import { connect } from 'react-redux'
import { fetchRequests, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import MyRequests from '../components/MyRequest';


const mapStateToProps = (state) => {
  return { 
    requestsList: state.requests.requestsList
  };
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);