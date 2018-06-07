import CreateRequestForm from '../components/CreateRequestForm.js';
import { resetNewRequest } from '../actions/requests';
import { connect } from 'react-redux';
import moment from 'moment'



const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewRequest());
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(moment())
  let initialValues = null;
  if (state.requests.requestsList.requests.length > 0 && ownProps.params.hasOwnProperty("requestId")) {
    let listFiltered = state.requests.requestsList.requests.filter(list => parseInt(list.id) === parseInt(ownProps.params.requestId));
    initialValues = {
      requestId: listFiltered && parseInt(listFiltered[0].id),
      id: parseInt(listFiltered[0].user_id),
      title: listFiltered[0].title,
      address: listFiltered[0].address,
      date: moment(moment(listFiltered[0].due_date), "YYY MM DD  HH:mm:ss").subtract(1, 'days'),
      Due_dateM: moment(moment(listFiltered[0].due_date), "YYY MM DD  HH:mm:ss").subtract(1, 'days'),
      content: listFiltered[0].title
    }
  }


  return {
    newRequest: state.requests.newRequest,
    user: state.user.user,
    requestsList: state.requests.requestsList,
    initialValues: initialValues

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequestForm);
