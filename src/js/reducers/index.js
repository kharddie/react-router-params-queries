import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CategoriesReducer from "./categoriesReducer";
import RequestsReducer from "./requestsReducer";
import UserReducer from './userReducer';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import ResendEmailReducer from './reducer_resendEmail';
import UpdateEmailReducer from './reducer_updateEmail';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductsReducer, //<-- Posts
  categories: CategoriesReducer,
  requests: RequestsReducer,
  form: formReducer, // <-- redux-form
  validateFields: ValidateUserFieldsReducer,
  resendEmail: ResendEmailReducer,
  updateEmail: UpdateEmailReducer
});

export default rootReducer;


