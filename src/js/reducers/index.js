import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CategoriesReducer from "./categoriesReducer"
import ProductsDeleteReducer from './productsDeleteReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: ProductsReducer, //<-- Posts
  categories: CategoriesReducer,
  productDeleteReducer:ProductsDeleteReducer,
  form: formReducer, // <-- redux-form
});

export default rootReducer;
