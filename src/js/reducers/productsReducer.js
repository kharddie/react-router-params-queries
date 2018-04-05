import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, RESET_PRODUCTS } from '../actions/Products';


const INITIAL_STATE = {
    productList: { products: [], error: null, loading: false }
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case FETCH_PRODUCTS:// start fetching posts and set loading = true
            return { ...state, productList: { products: [], error: null, loading: true } };
        case FETCH_PRODUCTS_SUCCESS:// return list of posts and make loading = false
            return { ...state, productList: { products: action.payload, error: null, loading: false } };
        case FETCH_PRODUCTS_FAILURE:// return error and make loading = false
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, productList: { products: [], error: error, loading: false } };
        case RESET_PRODUCTS:// reset postList to initial state
            return { ...state, productList: { products: [], error: null, loading: false } };

        default:
            return state;
    }
}
