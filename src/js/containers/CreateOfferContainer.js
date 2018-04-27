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
    user: state.user.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferForm);
