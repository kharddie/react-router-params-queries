import ForgotPwdForm from '../components/ForgotPwdForm.js';
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
    forgotPwd:state.forgotPwd
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwdForm);
