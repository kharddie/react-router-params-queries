import { connect } from 'react-redux'
import { fetchProducts, fetchProductsSuccess, fetchProductsFailure } from '../actions/Products';
import Products from '../components/Products';


const mapStateToProps = (state) => {
  return { 
    productList: state.posts.productList
  };
}

//sends our API payload to the reducer, via the store.
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts()).then((response) => {
            !response.error ? dispatch(fetchProductsSuccess(response.payload.data)) : dispatch(fetchProductsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);