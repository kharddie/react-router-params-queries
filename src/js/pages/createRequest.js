import CreateRequestForm from '../components/CreateRequestForm';
import { resetNewRequest } from '../actions/requests';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewRequest());
    }
  }
}



function mapStateToProps(state, ownProps) {
  return {
    newRequest: state.requests.newRequest,
    user:state.user.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequestForm);
