import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import categoriesReducer from "./categoriesReducer"
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: ProductsReducer, //<-- Posts
  categories: categoriesReducer,
  form: formReducer, // <-- redux-form
});

export default rootReducer;
