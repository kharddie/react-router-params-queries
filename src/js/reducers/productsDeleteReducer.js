import { DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, RESET_PRODUCT } from '../actions/Products';



/* 
reducer that will be able to handle receiving action creator.
Reducers return application state
application state should be treated as immutables
Reducer should return a brand-new object, with copies of any objects it 
needs from the previous state, and never alter the previous state
New state becomes available to any component subscribed to the store*/
const INITIAL_STATE = {
    deleteProduct: { deleteProduct: [], error: null, loading: false }
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case DELETE_PRODUCT:// start fetching posts and set loading = true
            return { ...state, deleteProduct: { deleteProduct: [], error: null, loading: true } };
        case DELETE_PRODUCT_SUCCESS:// return list of posts and make loading = false
            return { ...state, deleteProduct: { deleteProduct: action.payload, error: null, loading: false } };
        case DELETE_PRODUCT_FAILURE:// return error and make loading = false
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, deleteProduct: { deleteProduct: [], error: error, loading: false } };
        case RESET_PRODUCT:// reset postList to initial state
            return { ...state, deleteProduct: { deleteProduct: [], error: null, loading: false } };

        default:
            return state;
    }
}
