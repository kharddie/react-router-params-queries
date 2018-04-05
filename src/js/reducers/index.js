import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: ProductsReducer, //<-- Posts
  form: formReducer, // <-- redux-form
});

export default rootReducer;
