import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CategoriesReducer from "./categoriesReducer";
import RequestsReducer from "./requestsReducer";
import OffersReducer from "./offersReducer";
import UserReducer from './userReducer';
import CommentsReducer from './commentsReducer';
import UpdateProfileReducer from './reducerUpdateProfile';
import { reducer as formReducer } from 'redux-form';
import InfoMessageReducer from './infoMessageReducer';

import ForgotPwdReducer from './reducerForgotPwd';

const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductsReducer, //<-- Posts
  categories: CategoriesReducer,
  requests: RequestsReducer,
  offers: OffersReducer,
  comments: CommentsReducer,
  form: formReducer, // <-- redux-form
  updateProfile: UpdateProfileReducer,
  infoMessage: InfoMessageReducer,
  forgotPwd:ForgotPwdReducer
});

export default rootReducer;


