import {
    FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, RESET_CATEGORIES,
    DELETE_CATEGORIES, DELETE_CATEGORIES_SUCCESS, DELETE_CATEGORIES_FAILURE, RESET_DELETED_CATEGORIES,
    UPDATE_CATEGORIES, UPDATE_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_FAILURE, RESET_UPDATED_CATEGORIES,
    CREATE_CATEGORIES, CREATE_CATEGORIES_SUCCESS, CREATE_CATEGORIES_FAILURE, RESET_NEW_CATEGORIES
} from '../actions/Categories';


const INITIAL_STATE = {
    categoriesList: { categories: [], error: null, loading: false },
    deletedCategories: { deletedCategories: {}, error: null, loading: false },
    newCategories: { newCategories: {}, error: null, loading: false },
    updateCategories: { updateCategories: {}, error: null, loading: false }
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case FETCH_CATEGORIES:// start fetching categoriesList and set loading = true
            return { ...state, categoriesList: { categories: [], error: null, loading: true } };
        case FETCH_CATEGORIES_SUCCESS:// return list of posts and make loading = false
            /*
            The below function takes the current "categoriesList" inside "...state" and merges new "categoriesList" and creates a **new** state(json), if the action is "FECTH_POSTS_SUCCESS" case FETCH_POSTS_SUCCESS:
            */
            return { ...state, categoriesList: { categories: action.payload, error: null, loading: false } };
        case FETCH_CATEGORIES_FAILURE:// return error and make loading = false
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, categoriesList: { categories: [], error: error, loading: false } };
        case RESET_CATEGORIES:// reset postList to initial state
            return { ...state, categoriesList: { categories: [], error: null, loading: false } };

        case UPDATE_CATEGORIES:// start fetching posts and set loading = true
            return { ...state, updateCategories: { updateCategories: [], error: null, loading: true } };
        case UPDATE_CATEGORIES_SUCCESS:// return list of posts and make loading = false
            const newStateUPS = Object.assign({}, state);
            newStateUPS.categoriesList.categories.findIndex(data => {
                if (data.id == action.payload.data.data.id) {
                    data.name = action.payload.data.data.name
                    data.description = action.payload.data.data.category_id
                }
            })
            return { ...newStateUPS, updateCategories: { updateCategories: action.payload.data, error: null, loading: false } }
        case UPDATE_CATEGORIES_FAILURE:// return error and make loading = false
            error = action.payload || { error: error, loading: false };//2nd one is network or server down errors
            if (action.payload.error !== undefined && action.payload.data.error !== "true") {
                error = false;
            } else {
                error = true;
            }
            return { ...state, updateCategories: { updateCategories: [], error: error, loading: false } };
        case RESET_UPDATED_CATEGORIES:// reset postList to initial state
            return { ...state, updateCategories: { updateCategories: [], error: null, loading: false } };

        case DELETE_CATEGORIES:
            return { ...state, deletedCategories: { deletedCategories: {}, error: null, loading: true } } //...state.deletedCategories, loading: true 
        case DELETE_CATEGORIES_SUCCESS:
            //delete the product from product list
            const newStateDPS = Object.assign({}, state);
            const indexOfCategoriesToDelete = newStateDPS.categoriesList.categories.findIndex(data => {
                return data.id == action.payload.data
            })
            newStateDPS.categoriesList.categories.splice(indexOfCategoriesToDelete, 1); // remove the deleted product at this position "indexOfCategoriesToDelete"
            return { ...newStateDPS, deletedCategories: { deletedCategories: {}, error: null, loading: false } }
        case DELETE_CATEGORIES_FAILURE:
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, deletedCategories: { deletedCategories: {}, error: error, loading: false } }
        case RESET_DELETED_CATEGORIES: // reset postList to initial state
            return { ...state, deletedCategories: { deletedCategories: {}, error: null, loading: false } }



        case CREATE_CATEGORIES:
            return { ...state, newCategories: { newCategories: {}, loading: true } }
        case CREATE_CATEGORIES_SUCCESS:
            const newStateCPS = Object.assign({}, state);
            newStateCPS.categoriesList.categories.push(action.payload.data);
            // push it in product list object
            return { ...newStateCPS, newCategories: { newCategories: action.payload.data, error: null, loading: false } }
        case CREATE_CATEGORIES_FAILURE:
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, newCategories: { newCategories: {}, error: error, loading: false } }
        case RESET_NEW_CATEGORIES:
            return { ...state, newCategories: { newCategories: {}, error: null, loading: false } }
















        default:
            return state;
    }
}
