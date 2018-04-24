import UpdateEmailForm from '../components/UpdateEmailForm.js';
import { resetUpdateEmailState } from '../actions/updateEmail';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
   resetMe: () =>{
     dispatch(resetUpdateEmailState());
     dispatch(resetValidateUserFields());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    user: state.user.user,
    updateEmail: state.updateEmail,
    initialValues: {
      email: state.user.user && state.user.user.email,
      name: state.user.user && state.user.user.name,
      user_name: state.user.user && state.user.user.user_name,
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmailForm);
