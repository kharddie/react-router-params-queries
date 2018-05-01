import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CategoriesReducer from "./categoriesReducer";
import RequestsReducer from "./requestsReducer";
import OffersReducer from "./offersReducer";
import UserReducer from './userReducer';
import CommentsReducer from './commentsReducer';
import UpdateProfileReducer from './reducerUpdateProfile';
import AppInfoDisplayReducer from './AppInfoDisplayReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductsReducer, //<-- Posts
  categories: CategoriesReducer,
  requests: RequestsReducer,
  offers: OffersReducer,
  comments: CommentsReducer,
  appInfoDisplay: AppInfoDisplayReducer,
  form: formReducer, // <-- redux-form
  updateProfile: UpdateProfileReducer
});

export default rootReducer;


