import CreateOfferForm from '../components/CreateOfferForm.js';
import { resetNewOffer } from '../actions/offers';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewOffer());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    newOffer: state.offers.newOffer,
    user: state.user.user,
    initialValues: {
      email: state.user.user && state.user.user.email,
      name: state.user.user && state.user.user.name,
      user_name: state.user.user && state.user.user.user_name,
      contact_number: state.user.user && state.user.user.contact_number,
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferForm);
