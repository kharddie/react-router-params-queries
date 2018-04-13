import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, RESET_PRODUCTS, DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, RESET_DELETED_PRODUCT, CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, RESET_NEW_PRODUCT } from '../actions/Products';

/* 
reducer that will be able to handle receiving action creator.
Reducers return application state
application state should be treated as immutables
Reducer should return a brand-new object, with copies of any objects it 
needs from the previous state, and never alter the previous state
New state becomes available to any component subscribed to the store*/
const INITIAL_STATE = {
    productList: { products: [], error: null, loading: false },
    deletedProduct: { deletedProduct: {}, error: null, loading: false },
    newProduct: { newProduct: {}, error: null, loading: false }
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



        case DELETE_PRODUCT:
            return { ...state, deletedProduct: { deletedProduct: {}, error: null, loading: true } } //...state.deletedProduct, loading: true 
        case DELETE_PRODUCT_SUCCESS:
            //delete the product from product list
            const newState = Object.assign({}, state);
            const indexOfProductToDelete = newState.productList.products.findIndex(data => {
                return data.id == action.payload.data
            })
            newState.productList.products.splice(indexOfProductToDelete, 1); // remove the deleted product at this position "indexOfProductToDelete"
            return { ...newState, deletedProduct: { deletedProduct: {}, error: null, loading: false } }
        case DELETE_PRODUCT_FAILURE:
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, deletedProduct: { deletedProduct: {}, error: error, loading: false } }
        case RESET_DELETED_PRODUCT: // reset postList to initial state
            return { ...state, deletedProduct: { deletedProduct: {}, error: null, loading: false } }
            case CREATE_PRODUCT:
            return { ...state, newProduct: { newProduct:{}, loading: true } }
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, newProduct: { newProduct: action.payload, error: null, loading: false } }
        case CREATE_PRODUCT_FAILURE:
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, newProduct: { newProduct: {}, error: error, loading: false } }
        case RESET_NEW_PRODUCT:
            return { ...state, newProduct: { newProduct: {}, error: null, loading: false } }

        default:
            return state;
    }
}
