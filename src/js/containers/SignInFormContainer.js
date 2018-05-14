import SignInForm from '../components/SignInForm';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
   resetMe: () =>{

    }
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    user: state.user,
    infoMessage:state.infoMessage,
    forSignInForm:"forSignInForm",
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);