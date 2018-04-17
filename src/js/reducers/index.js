import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CategoriesReducer from "./categoriesReducer";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  products: ProductsReducer, //<-- Posts
  categories: CategoriesReducer,
  form: formReducer, // <-- redux-form
});

export default rootReducer;


