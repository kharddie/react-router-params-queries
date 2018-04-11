import { FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, RESET_CATEGORIES } from '../actions/Categories';


const INITIAL_STATE = {
    categoriesList: { categories: [], error: null, loading: false }
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case FETCH_CATEGORIES:// start fetching categoriesList and set loading = true
            return { ...state, categoriesList: { categories: [], error: null, loading: true } };
        case FETCH_CATEGORIES_SUCCESS:// return list of posts and make loading = false
            return { ...state, categoriesList: { categories: action.payload, error: null, loading: false } };
        case FETCH_CATEGORIES_FAILURE:// return error and make loading = false
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, categoriesList: { categories: [], error: error, loading: false } };
        case RESET_CATEGORIES:// reset postList to initial state
            return { ...state, categoriesList: { categories: [], error: null, loading: false } };

        default:
            return state;
    }
}
