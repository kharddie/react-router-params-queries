import SignUpForm from '../components/SignUpForm.js';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { resetAppInfoDisplay } from '../actions/appInfoDisplay';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetValidateUserFields());
    },
    resetAppInfoDisplay: () => {
      dispatch(resetAppInfoDisplay());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    validateFields: state.validateFields,
    history: ownProps.history,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);