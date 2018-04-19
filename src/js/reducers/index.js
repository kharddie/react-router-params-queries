import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CategoriesReducer from "./categoriesReducer";
import RequestsReducer from "./requestsReducer"
import UserReducer from './userReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductsReducer, //<-- Posts
  categories: CategoriesReducer,
  requests: RequestsReducer,
  form: formReducer, // <-- redux-form
});

export default rootReducer;


