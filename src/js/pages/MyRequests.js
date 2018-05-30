import { connect } from 'react-redux'
import MyRequests from '../components/MyRequests';


const mapStateToProps = (state) => {
  return { 
    requestsList: state.requests.requestsList
  };
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);