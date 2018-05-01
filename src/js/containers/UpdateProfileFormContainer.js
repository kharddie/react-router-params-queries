import UpdateProfileForm from '../components/UpdateProfileForm.js';
import { resetUpdateProfileState } from '../actions/updateProfile';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
   resetMe: () =>{
     dispatch(resetUpdateProfileState());
     dispatch(resetValidateUserFields());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    user: state.user.user,
    updateProfile: state.updateProfile,
    initialValues: {
      email: state.user.user && state.user.user.email,
      name: state.user.user && state.user.user.name,
      user_name: state.user.user && state.user.user.user_name,
      contact_number: state.user.user && state.user.user.contact_number,
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileForm);
