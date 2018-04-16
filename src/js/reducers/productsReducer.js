import {
    FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, RESET_PRODUCTS,
    DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, RESET_DELETED_PRODUCT,
    UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, RESET_UPDATED_PRODUCT,
    CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, RESET_NEW_PRODUCT
} from '../actions/Products';

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
    newProduct: { newProduct: {}, error: null, loading: false },
    updateProduct: { updateProduct: {}, error: null, loading: false }
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

        case UPDATE_PRODUCT:// start fetching posts and set loading = true
            return { ...state, updateProduct: { updateProduct: [], error: null, loading: true } };
        case UPDATE_PRODUCT_SUCCESS:// return list of posts and make loading = false
            const newStateUPS = Object.assign({}, state);
            newStateUPS.productList.products.findIndex(data => {
                if (data.id == action.payload.data.data.id) {
                    data.name = action.payload.data.data.name
                }
            })

            return { ...newStateUPS, updateProduct: { updateProduct: action.payload.data, error: null, loading: false } }





        case UPDATE_PRODUCT_FAILURE:// return error and make loading = false
            error = action.payload || { error: error, loading: false };//2nd one is network or server down errors
            if (action.payload.error !== undefined && action.payload.data.error !== "true") {
                error = false;
            } else {
                error = true;
            }

            return { ...state, updateProduct: { updateProduct: [], error: error, loading: false } };
        case RESET_UPDATED_PRODUCT:// reset postList to initial state
            return { ...state, updateProduct: { updateProduct: [], error: null, loading: false } };



        case DELETE_PRODUCT:
            return { ...state, deletedProduct: { deletedProduct: {}, error: null, loading: true } } //...state.deletedProduct, loading: true 
        case DELETE_PRODUCT_SUCCESS:
            //delete the product from product list
            const newStateDPS = Object.assign({}, state);
            const indexOfProductToDelete = newStateDPS.productList.products.findIndex(data => {
                return data.id == action.payload.data
            })
            newStateDPS.productList.products.splice(indexOfProductToDelete, 1); // remove the deleted product at this position "indexOfProductToDelete"
            return { ...newStateDPS, deletedProduct: { deletedProduct: {}, error: null, loading: false } }
        case DELETE_PRODUCT_FAILURE:
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, deletedProduct: { deletedProduct: {}, error: error, loading: false } }
        case RESET_DELETED_PRODUCT: // reset postList to initial state
            return { ...state, deletedProduct: { deletedProduct: {}, error: null, loading: false } }




        case CREATE_PRODUCT:
            return { ...state, newProduct: { newProduct: {}, loading: true } }
        case CREATE_PRODUCT_SUCCESS:
            const newStateCPS = Object.assign({}, state);
            newStateCPS.productList.products.push(action.payload.data);
            // push it in product list object
            return { ...newStateCPS, newProduct: { newProduct: action.payload.data, error: null, loading: false } }
        case CREATE_PRODUCT_FAILURE:
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, newProduct: { newProduct: {}, error: error, loading: false } }
        case RESET_NEW_PRODUCT:
            return { ...state, newProduct: { newProduct: {}, error: null, loading: false } }

        default:
            return state;
    }
}
